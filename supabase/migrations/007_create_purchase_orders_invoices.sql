-- VendorBridge Migration 007: Purchase Orders + Invoices Tables
-- Generated from MSD v1.0

-- ─────────────────────────────────────────────
-- purchase_orders
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS purchase_orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  po_number       TEXT UNIQUE NOT NULL,
  quotation_id    UUID UNIQUE NOT NULL REFERENCES quotations(id) ON DELETE CASCADE,
  status          po_status DEFAULT 'generated',
  pdf_url         TEXT,
  generated_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_po_number ON purchase_orders(po_number);
CREATE INDEX IF NOT EXISTS idx_po_status ON purchase_orders(status);
CREATE INDEX IF NOT EXISTS idx_po_quotation ON purchase_orders(quotation_id);

-- ─────────────────────────────────────────────
-- invoices
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS invoices (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number  TEXT UNIQUE NOT NULL,
  po_id           UUID UNIQUE NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
  subtotal        NUMERIC(12,2),
  tax             NUMERIC(12,2),
  total           NUMERIC(12,2),
  status          invoice_status DEFAULT 'draft',
  pdf_url         TEXT,
  generated_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_invoice_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_invoice_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoice_po ON invoices(po_id);

-- ── Constraints ──
ALTER TABLE invoices
  ADD CONSTRAINT chk_invoice_subtotal CHECK (subtotal IS NULL OR subtotal >= 0);

ALTER TABLE invoices
  ADD CONSTRAINT chk_invoice_tax CHECK (tax IS NULL OR tax >= 0);

ALTER TABLE invoices
  ADD CONSTRAINT chk_invoice_total CHECK (total IS NULL OR total >= 0);
