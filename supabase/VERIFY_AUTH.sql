-- ═══════════════════════════════════════════════════════════════
-- VendorBridge — AUTH VERIFICATION SQL
-- Run this AFTER running FIX_AUTH_NOW.sql
-- ═══════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────
-- TEST 1: Check all objects exist
-- ─────────────────────────────────────────────
SELECT '1. ENUM' as test,
  CASE WHEN EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role')
    THEN 'PASS — user_role exists'
    ELSE 'FAIL — user_role MISSING'
  END as result;

SELECT '2. TABLE' as test,
  CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'profiles' AND schemaname = 'public')
    THEN 'PASS — profiles exists'
    ELSE 'FAIL — profiles MISSING'
  END as result;

SELECT '3. FUNCTION' as test,
  CASE WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_new_user')
    THEN 'PASS — handle_new_user exists'
    ELSE 'FAIL — handle_new_user MISSING'
  END as result;

SELECT '4. TRIGGER' as test,
  CASE WHEN EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created')
    THEN 'PASS — on_auth_user_created exists'
    ELSE 'FAIL — on_auth_user_created MISSING'
  END as result;

SELECT '5. RLS INSERT' as test,
  CASE WHEN EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND cmd = 'INSERT')
    THEN 'PASS — INSERT policy exists'
    ELSE 'FAIL — NO INSERT policy'
  END as result;

-- ─────────────────────────────────────────────
-- TEST 2: Check profiles table columns
-- ─────────────────────────────────────────────
SELECT '6. COLUMNS' as test,
  column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'profiles' AND table_schema = 'public'
ORDER BY ordinal_position;

-- ─────────────────────────────────────────────
-- TEST 3: Check RLS policies on profiles
-- ─────────────────────────────────────────────
SELECT '7. POLICIES' as test,
  policyname, cmd, roles::text
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY cmd;

-- ─────────────────────────────────────────────
-- TEST 4: Check trigger function source code
-- ─────────────────────────────────────────────
SELECT '8. FUNCTION SOURCE' as test,
  prosrc
FROM pg_proc
WHERE proname = 'handle_new_user';

-- ─────────────────────────────────────────────
-- TEST 5: Test manual profile insert
-- ─────────────────────────────────────────────
-- This tests that RLS doesn't block inserts
DO $$
BEGIN
  DELETE FROM public.profiles WHERE id = '00000000-0000-0000-0000-000000000099';
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES ('00000000-0000-0000-0000-000000000099', 'Verify Test', 'verify-test@example.com', 'vendor');
  RAISE NOTICE 'TEST 9: PASS — manual insert works';
  DELETE FROM public.profiles WHERE id = '00000000-0000-0000-0000-000000000099';
  RAISE NOTICE 'TEST 10: PASS — test row cleaned up';
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'TEST 9: FAIL — %', SQLERRM;
END
$$;

-- ─────────────────────────────────────────────
-- TEST 6: List existing auth users
-- ─────────────────────────────────────────────
SELECT '11. AUTH USERS' as test, id, email, created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 5;

-- ─────────────────────────────────────────────
-- TEST 7: List existing profiles
-- ─────────────────────────────────────────────
SELECT '12. PROFILES' as test, id, full_name, email, role, created_at
FROM public.profiles
ORDER BY created_at DESC
LIMIT 5;
