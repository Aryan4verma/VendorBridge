-- VendorBridge Migration 010: Storage Buckets
-- Generated from MSD v1.0

-- ─────────────────────────────────────────────
-- Storage Buckets
-- ─────────────────────────────────────────────

-- rfq-attachments: RFQ supporting documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'rfq-attachments',
  'rfq-attachments',
  false,
  10485760,  -- 10MB
  ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
)
ON CONFLICT (id) DO NOTHING;

-- purchase-orders: Generated PO PDFs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'purchase-orders',
  'purchase-orders',
  false,
  5242880,  -- 5MB
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- invoices: Invoice PDFs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'invoices',
  'invoices',
  false,
  5242880,  -- 5MB
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- avatars: Profile images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  2097152,  -- 2MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────
-- Storage Policies
-- ─────────────────────────────────────────────

-- rfq-attachments: Authenticated users can upload, owner can read
CREATE POLICY "Authenticated users can upload RFQ attachments"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'rfq-attachments');

CREATE POLICY "Users can read RFQ attachments"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'rfq-attachments');

-- purchase-orders: System can upload, authenticated can read
CREATE POLICY "Authenticated can upload POs"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'purchase-orders');

CREATE POLICY "Users can read POs"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'purchase-orders');

-- invoices: System can upload, authenticated can read
CREATE POLICY "Authenticated can upload invoices"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'invoices');

CREATE POLICY "Users can read invoices"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'invoices');

-- avatars: Users can upload their own, anyone can read (public bucket)
CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Anyone can read avatars"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can delete own avatar"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatars');
