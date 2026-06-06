-- VendorBridge Migration 006: Approvals Table
-- Generated from MSD v1.0

CREATE TABLE IF NOT EXISTS approvals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_id    UUID UNIQUE NOT NULL REFERENCES quotations(id) ON DELETE CASCADE,
  approver_id     UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status          approval_status DEFAULT 'pending',
  remarks         TEXT,
  approved_at     TIMESTAMP WITH TIME ZONE,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_approval_status ON approvals(status);
CREATE INDEX IF NOT EXISTS idx_approval_quotation ON approvals(quotation_id);
CREATE INDEX IF NOT EXISTS idx_approval_approver ON approvals(approver_id);
