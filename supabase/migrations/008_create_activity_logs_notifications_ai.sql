-- VendorBridge Migration 008: Activity Logs + Notifications + AI Recommendations
-- Generated from MSD v1.0

-- ─────────────────────────────────────────────
-- activity_logs
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activity_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action      TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id   UUID,
  metadata    JSONB,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_entity ON activity_logs(entity_type);
CREATE INDEX IF NOT EXISTS idx_activity_date ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_entity_id ON activity_logs(entity_id);

-- ─────────────────────────────────────────────
-- notifications
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  message     TEXT NOT NULL,
  is_read     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;

-- ─────────────────────────────────────────────
-- ai_recommendations
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_recommendations (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rfq_id                  UUID NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
  recommended_vendor_id   UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  confidence_score        NUMERIC(5,2),
  reasoning               TEXT,
  created_at              TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_ai_rec_rfq ON ai_recommendations(rfq_id);
CREATE INDEX IF NOT EXISTS idx_ai_rec_vendor ON ai_recommendations(recommended_vendor_id);

-- ── Constraints ──
ALTER TABLE ai_recommendations
  ADD CONSTRAINT chk_ai_confidence CHECK (confidence_score >= 0 AND confidence_score <= 100);
