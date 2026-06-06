-- ═══════════════════════════════════════════════════════════════
-- VendorBridge — REMOVE BROKEN TRIGGER + FIX RLS
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. Remove the broken trigger and function entirely
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- 2. Ensure user_role enum exists
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin','procurement','manager','vendor');
  END IF;
END $$;

-- 3. Ensure profiles table exists
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

-- 4. DISABLE RLS on profiles (no trigger = no RLS issues)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- 5. Done
DO $$ BEGIN
  RAISE NOTICE 'DONE. Trigger removed. RLS disabled on profiles.';
  RAISE NOTICE 'Profile creation is now handled by the app.';
END $$;
