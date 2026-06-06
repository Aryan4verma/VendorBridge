-- VendorBridge Migration 005: Quotations Table
-- Generated from MSD v1.0

CREATE TABLE IF NOT EXISTS quotations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rfq_id          UUID NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
  vendor_id       UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  price           NUMERIC(12,2) NOT NULL,
  delivery_days   INTEGER NOT NULL,
  notes           TEXT,
  status          quotation_status DEFAULT 'submitted',
  submitted_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_quote_rfq ON quotations(rfq_id);
CREATE INDEX IF NOT EXISTS idx_quote_vendor ON quotations(vendor_id);
CREATE INDEX IF NOT EXISTS idx_quote_price ON quotations(price);
CREATE INDEX IF NOT EXISTS idx_quote_status ON quotations(status);

-- ── Constraints ──
ALTER TABLE quotations
  ADD CONSTRAINT chk_quotation_price CHECK (price > 0);

ALTER TABLE quotations
  ADD CONSTRAINT chk_quotation_delivery CHECK (delivery_days > 0);

-- One quotation per vendor per RFQ
ALTER TABLE quotations
  ADD CONSTRAINT uq_quotation_rfq_vendor UNIQUE (rfq_id, vendor_id);

-- ── Auto-update updated_at ──
CREATE TRIGGER set_quotations_updated_at
  BEFORE UPDATE ON quotations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
