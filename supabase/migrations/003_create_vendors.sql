-- VendorBridge Migration 003: Vendors Table
-- Generated from MSD v1.0

CREATE TABLE IF NOT EXISTS vendors (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name    TEXT NOT NULL,
  vendor_code     TEXT UNIQUE NOT NULL,
  gst_number      TEXT,
  category        TEXT NOT NULL,
  contact_person  TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  address         TEXT,
  rating          NUMERIC(2,1) DEFAULT 5.0,
  status          vendor_status DEFAULT 'active',
  created_by      UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_vendor_category ON vendors(category);
CREATE INDEX IF NOT EXISTS idx_vendor_status ON vendors(status);
CREATE INDEX IF NOT EXISTS idx_vendor_code ON vendors(vendor_code);
CREATE INDEX IF NOT EXISTS idx_vendor_created_by ON vendors(created_by);

-- ── Constraints ──
ALTER TABLE vendors
  ADD CONSTRAINT chk_vendor_rating CHECK (rating >= 0 AND rating <= 5);

-- ── Auto-update updated_at ──
CREATE TRIGGER set_vendors_updated_at
  BEFORE UPDATE ON vendors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
