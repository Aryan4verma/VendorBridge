-- VendorBridge Migration 001: Enum Types
-- Generated from MSD v1.0

-- ─────────────────────────────────────────────
-- user_role
-- ─────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM (
      'admin',
      'procurement',
      'manager',
      'vendor'
    );
  END IF;
END
$$;

-- ─────────────────────────────────────────────
-- vendor_status
-- ─────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'vendor_status') THEN
    CREATE TYPE vendor_status AS ENUM (
      'active',
      'inactive',
      'blacklisted'
    );
  END IF;
END
$$;

-- ─────────────────────────────────────────────
-- rfq_status
-- ─────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'rfq_status') THEN
    CREATE TYPE rfq_status AS ENUM (
      'draft',
      'open',
      'closed',
      'awarded'
    );
  END IF;
END
$$;

-- ─────────────────────────────────────────────
-- quotation_status
-- ─────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'quotation_status') THEN
    CREATE TYPE quotation_status AS ENUM (
      'submitted',
      'shortlisted',
      'selected',
      'rejected'
    );
  END IF;
END
$$;

-- ─────────────────────────────────────────────
-- approval_status
-- ─────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'approval_status') THEN
    CREATE TYPE approval_status AS ENUM (
      'pending',
      'approved',
      'rejected'
    );
  END IF;
END
$$;

-- ─────────────────────────────────────────────
-- po_status
-- ─────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'po_status') THEN
    CREATE TYPE po_status AS ENUM (
      'generated',
      'sent',
      'completed'
    );
  END IF;
END
$$;

-- ─────────────────────────────────────────────
-- invoice_status
-- ─────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'invoice_status') THEN
    CREATE TYPE invoice_status AS ENUM (
      'draft',
      'generated',
      'sent',
      'paid'
    );
  END IF;
END
$$;
