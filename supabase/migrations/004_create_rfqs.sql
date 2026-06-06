-- VendorBridge Migration 004: RFQs + RFQ Vendors Tables
-- Generated from MSD v1.0

-- ─────────────────────────────────────────────
-- rfqs
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rfqs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  description     TEXT,
  quantity        INTEGER NOT NULL,
  deadline        DATE NOT NULL,
  status          rfq_status DEFAULT 'draft',
  attachment_url  TEXT,
  created_by      UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_rfq_status ON rfqs(status);
CREATE INDEX IF NOT EXISTS idx_rfq_deadline ON rfqs(deadline);
CREATE INDEX IF NOT EXISTS idx_rfq_created_by ON rfqs(created_by);

-- ── Constraints ──
ALTER TABLE rfqs
  ADD CONSTRAINT chk_rfq_quantity CHECK (quantity > 0);

-- ── Auto-update updated_at ──
CREATE TRIGGER set_rfqs_updated_at
  BEFORE UPDATE ON rfqs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ─────────────────────────────────────────────
-- rfq_vendors (many-to-many)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rfq_vendors (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rfq_id      UUID NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
  vendor_id   UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  invited_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(rfq_id, vendor_id)
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_rfq_vendor_rfq ON rfq_vendors(rfq_id);
CREATE INDEX IF NOT EXISTS idx_rfq_vendor_vendor ON rfq_vendors(vendor_id);
