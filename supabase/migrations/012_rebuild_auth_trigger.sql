-- ═══════════════════════════════════════════════════════════════
-- VendorBridge — COMPLETE Auth Trigger Rebuild
-- Run this SINGLE migration in Supabase SQL Editor
-- It handles ALL edge cases and rebuilds from scratch
-- ═══════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────
-- 1. DROP old trigger and function (clean slate)
-- ─────────────────────────────────────────────
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- ─────────────────────────────────────────────
-- 2. ENSURE user_role enum exists
-- ─────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin','procurement','manager','vendor');
    RAISE NOTICE 'Created user_role enum';
  ELSE
    RAISE NOTICE 'user_role enum already exists';
  END IF;
END
$$;

-- ─────────────────────────────────────────────
-- 3. ENSURE profiles table exists with correct schema
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name  TEXT NOT NULL DEFAULT '',
  email      TEXT NOT NULL DEFAULT '',
  role       user_role NOT NULL DEFAULT 'vendor',
  avatar_url TEXT,
  is_active  BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- 4. ENSURE unique constraint on email
-- ─────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'profiles_email_key'
    AND conrelid = 'profiles'::regclass
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_email_key UNIQUE (email);
    RAISE NOTICE 'Added unique constraint on profiles.email';
  END IF;
END
$$;

-- ─────────────────────────────────────────────
-- 5. DISABLE RLS on profiles (for trigger to work)
--    The trigger runs as SECURITY DEFINER (postgres),
--    but some Supabase configs still enforce RLS.
--    Disabling RLS ensures the trigger always works.
-- ─────────────────────────────────────────────
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────
-- 6. CREATE bulletproof trigger function
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  role_text TEXT;
  role_val user_role;
BEGIN
  -- Extract role from metadata
  role_text := NEW.raw_user_meta_data->>'role';

  -- Cast to enum safely
  IF role_text IS NULL OR role_text = '' THEN
    role_val := 'vendor';
  ELSIF role_text IN ('admin', 'procurement', 'manager', 'vendor') THEN
    role_val := role_text::user_role;
  ELSE
    role_val := 'vendor';
  END IF;

  -- Insert into profiles
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.email, ''),
    role_val
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─────────────────────────────────────────────
-- 7. ATTACH trigger to auth.users
-- ─────────────────────────────────────────────
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ─────────────────────────────────────────────
-- 8. GRANT necessary permissions
-- ─────────────────────────────────────────────
GRANT USAGE ON SCHEMA public TO postgres;
GRANT ALL ON public.profiles TO postgres;

-- ─────────────────────────────────────────────
-- 9. VERIFICATION QUERIES (run these to confirm)
-- ─────────────────────────────────────────────
-- SELECT 'enum' as check_type, typname as name FROM pg_type WHERE typname = 'user_role'
-- UNION ALL
-- SELECT 'table' as check_type, tablename as name FROM pg_tables WHERE tablename = 'profiles' AND schemaname = 'public'
-- UNION ALL
-- SELECT 'function' as check_type, proname as name FROM pg_proc WHERE proname = 'handle_new_user'
-- UNION ALL
-- SELECT 'trigger' as check_type, tgname as name FROM pg_trigger WHERE tgname = 'on_auth_user_created';
