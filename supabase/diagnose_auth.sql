-- ═══════════════════════════════════════════════════════════════
-- VendorBridge — Auth Trigger Diagnostic Script
-- Run this in Supabase SQL Editor to verify database state
-- ═══════════════════════════════════════════════════════════════

-- 1. Check if user_role enum exists
SELECT 'ENUM CHECK' as step, typname, typtype
FROM pg_type
WHERE typname = 'user_role';

-- 2. Check if profiles table exists and its columns
SELECT 'TABLE CHECK' as step, column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'profiles' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Check if handle_new_user function exists
SELECT 'FUNCTION CHECK' as step, proname, prosrc
FROM pg_proc
WHERE proname = 'handle_new_user';

-- 4. Check if trigger exists on auth.users
SELECT 'TRIGGER CHECK' as step, tgname, tgtype, tgenabled
FROM pg_trigger
WHERE tgname = 'on_auth_user_created';

-- 5. Check RLS policies on profiles
SELECT 'RLS CHECK' as step, schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'profiles';

-- 6. Check if RLS is enabled on profiles
SELECT 'RLS ENABLED' as step, relname, relrowsecurity
FROM pg_class
WHERE relname = 'profiles';

-- 7. Quick test: manually insert a test profile
-- (This tests if the insert itself works)
-- Uncomment to test:
-- INSERT INTO public.profiles (id, full_name, email, role)
-- VALUES ('00000000-0000-0000-0000-000000000000', 'Test User', 'test-diag@example.com', 'vendor');
