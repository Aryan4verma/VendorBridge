-- VendorBridge Migration 009: Row Level Security Policies
-- Generated from MSD v1.0

-- ── Enable RLS on all tables ──
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE rfqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE rfq_vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════
-- PROFILES
-- ═══════════════════════════════════════════════

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can update any profile
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ═══════════════════════════════════════════════
-- VENDORS
-- ═══════════════════════════════════════════════

-- Admins and procurement officers can view all vendors
CREATE POLICY "Procurement can view vendors"
  ON vendors FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'procurement')
    )
  );

-- Vendors can view their own record
CREATE POLICY "Vendors can view own record"
  ON vendors FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'vendor'
      AND vendors.created_by = auth.uid()
    )
  );

-- Admins and procurement can insert vendors
CREATE POLICY "Procurement can create vendors"
  ON vendors FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'procurement')
    )
  );

-- Admins and procurement can update vendors
CREATE POLICY "Procurement can update vendors"
  ON vendors FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'procurement')
    )
  );

-- Admins can delete vendors
CREATE POLICY "Admins can delete vendors"
  ON vendors FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ═══════════════════════════════════════════════
-- RFQS
-- ═══════════════════════════════════════════════

-- Procurement officers can view all RFQs
CREATE POLICY "Procurement can view RFQs"
  ON rfqs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'procurement'
    )
  );

-- Vendors can view RFQs they are assigned to
CREATE POLICY "Vendors can view assigned RFQs"
  ON rfqs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM rfq_vendors
      WHERE rfq_vendors.rfq_id = rfqs.id
      AND rfq_vendors.vendor_id IN (
        SELECT id FROM vendors WHERE created_by = auth.uid()
      )
    )
  );

-- Procurement officers can create RFQs
CREATE POLICY "Procurement can create RFQs"
  ON rfqs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'procurement'
    )
  );

-- Procurement officers can update RFQs
CREATE POLICY "Procurement can update RFQs"
  ON rfqs FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'procurement'
    )
  );

-- ═══════════════════════════════════════════════
-- RFQ_VENDORS
-- ═══════════════════════════════════════════════

-- Procurement officers can view all RFQ-vendor assignments
CREATE POLICY "Procurement can view RFQ vendors"
  ON rfq_vendors FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'procurement'
    )
  );

-- Vendors can view their own assignments
CREATE POLICY "Vendors can view own assignments"
  ON rfq_vendors FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM vendors WHERE id = rfq_vendors.vendor_id AND created_by = auth.uid()
    )
  );

-- Procurement officers can manage assignments
CREATE POLICY "Procurement can manage RFQ vendors"
  ON rfq_vendors FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'procurement'
    )
  );

-- ═══════════════════════════════════════════════
-- QUOTATIONS
-- ═══════════════════════════════════════════════

-- Procurement officers can view all quotations
CREATE POLICY "Procurement can view quotations"
  ON quotations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'procurement'
    )
  );

-- Vendors can view their own quotations
CREATE POLICY "Vendors can view own quotations"
  ON quotations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM vendors WHERE id = quotations.vendor_id AND created_by = auth.uid()
    )
  );

-- Vendors can submit quotations
CREATE POLICY "Vendors can submit quotations"
  ON quotations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM vendors WHERE id = vendor_id AND created_by = auth.uid()
    )
  );

-- Vendors can update their own quotations
CREATE POLICY "Vendors can update own quotations"
  ON quotations FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM vendors WHERE id = quotations.vendor_id AND created_by = auth.uid()
    )
  );

-- ═══════════════════════════════════════════════
-- APPROVALS
-- ═══════════════════════════════════════════════

-- Managers can view all approvals
CREATE POLICY "Managers can view approvals"
  ON approvals FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'manager'
    )
  );

-- Procurement can view approvals for their quotations
CREATE POLICY "Procurement can view approvals"
  ON approvals FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'procurement'
    )
  );

-- Managers can update approval status
CREATE POLICY "Managers can update approvals"
  ON approvals FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'manager'
    )
  );

-- System can create approvals (via function)
CREATE POLICY "System can create approvals"
  ON approvals FOR INSERT
  WITH CHECK (true);

-- ═══════════════════════════════════════════════
-- PURCHASE ORDERS
-- ═══════════════════════════════════════════════

-- Procurement officers can view all POs
CREATE POLICY "Procurement can view purchase orders"
  ON purchase_orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'procurement'
    )
  );

-- Vendors can view POs from their quotations
CREATE POLICY "Vendors can view own POs"
  ON purchase_orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM quotations q
      JOIN vendors v ON v.id = q.vendor_id
      WHERE q.id = purchase_orders.quotation_id
      AND v.created_by = auth.uid()
    )
  );

-- System can create POs
CREATE POLICY "System can create purchase orders"
  ON purchase_orders FOR INSERT
  WITH CHECK (true);

-- ═══════════════════════════════════════════════
-- INVOICES
-- ═══════════════════════════════════════════════

-- Procurement officers can view all invoices
CREATE POLICY "Procurement can view invoices"
  ON invoices FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'procurement'
    )
  );

-- Vendors can view invoices from their POs
CREATE POLICY "Vendors can view own invoices"
  ON invoices FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM purchase_orders po
      JOIN quotations q ON q.id = po.quotation_id
      JOIN vendors v ON v.id = q.vendor_id
      WHERE po.id = invoices.po_id
      AND v.created_by = auth.uid()
    )
  );

-- System can create invoices
CREATE POLICY "System can create invoices"
  ON invoices FOR INSERT
  WITH CHECK (true);

-- ═══════════════════════════════════════════════
-- ACTIVITY LOGS
-- ═══════════════════════════════════════════════

-- Admins can view all activity logs
CREATE POLICY "Admins can view all activity logs"
  ON activity_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Procurement can view activity logs
CREATE POLICY "Procurement can view activity logs"
  ON activity_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'procurement'
    )
  );

-- Managers can view activity logs
CREATE POLICY "Managers can view activity logs"
  ON activity_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'manager'
    )
  );

-- System can insert activity logs
CREATE POLICY "System can insert activity logs"
  ON activity_logs FOR INSERT
  WITH CHECK (true);

-- ═══════════════════════════════════════════════
-- NOTIFICATIONS
-- ═══════════════════════════════════════════════

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- System can create notifications
CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

-- ═══════════════════════════════════════════════
-- AI RECOMMENDATIONS
-- ═══════════════════════════════════════════════

-- Procurement and managers can view AI recommendations
CREATE POLICY "Procurement can view AI recommendations"
  ON ai_recommendations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('procurement', 'manager')
    )
  );

-- System can create AI recommendations
CREATE POLICY "System can create AI recommendations"
  ON ai_recommendations FOR INSERT
  WITH CHECK (true);
