-- ═══════════════════════════════════════════════════════════════
-- VendorBridge — Auth Trigger Fix (Run AFTER diagnostics)
-- This migration replaces the trigger with a more resilient version
-- ═══════════════════════════════════════════════════════════════

-- STEP A: Ensure user_role enum exists (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin','procurement','manager','vendor');
  END IF;
END
$$;

-- STEP B: Ensure profiles table exists (idempotent)
CREATE TABLE IF NOT EXISTS profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name  TEXT NOT NULL DEFAULT '',
  email      TEXT NOT NULL DEFAULT '',
  role       user_role NOT NULL DEFAULT 'vendor',
  avatar_url TEXT,
  is_active  BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP C: Ensure unique constraint on email
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_email_key' AND conrelid = 'profiles'::regclass
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_email_key UNIQUE (email);
  END IF;
END
$$;

-- STEP D: Replace trigger function with resilient version
-- Uses TEXT for role insertion, then casts safely
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role_val user_role;
  user_full_name TEXT;
  user_email TEXT;
BEGIN
  -- Extract values safely
  user_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', '');
  user_email := COALESCE(NEW.email, '');

  -- Cast role safely: try casting, fall back to 'vendor'
  BEGIN
    user_role_val := COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'vendor');
  EXCEPTION WHEN invalid_text_representation THEN
    user_role_val := 'vendor';
  END;

  -- Insert profile
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (NEW.id, user_full_name, user_email, user_role_val);

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log the error but don't block user creation
  RAISE WARNING 'handle_new_user failed for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- STEP E: Ensure trigger is attached
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- STEP F: Add INSERT policy for profiles (belt and suspenders)
-- Even though SECURITY DEFINER should bypass RLS, some Supabase
-- configurations may enforce it. This allows the trigger to work.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Allow trigger insert' AND tablename = 'profiles'
  ) THEN
    CREATE POLICY "Allow trigger insert"
      ON profiles FOR INSERT
      WITH CHECK (true);
  END IF;
END
$$;

-- STEP G: Verify (run after applying)
-- SELECT proname FROM pg_proc WHERE proname = 'handle_new_user';
-- SELECT tgname FROM pg_trigger WHERE tgname = 'on_auth_user_created';
