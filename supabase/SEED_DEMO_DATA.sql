-- VendorBridge Demo Data Seed
-- Run this in Supabase SQL Editor after DISABLE_RLS_DEMO.sql

-- ═══════════════════════════════════════════════
-- DROP FK ON PROFILES (demo only - profiles.id refs auth.users)
-- ═══════════════════════════════════════════════
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- ═══════════════════════════════════════════════
-- PROFILES (4 users)
-- ═══════════════════════════════════════════════
INSERT INTO profiles (id, full_name, email, role, is_active, created_at, updated_at) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Rahul Kumar', 'rahul@vendorbridge.com', 'procurement', true, '2025-01-15T00:00:00Z', '2025-01-15T00:00:00Z'),
  ('a0000000-0000-0000-0000-000000000002', 'Amit Verma', 'amit@vendorbridge.com', 'manager', true, '2025-01-10T00:00:00Z', '2025-01-10T00:00:00Z'),
  ('a0000000-0000-0000-0000-000000000003', 'Priya Singh', 'priya@vendorbridge.com', 'admin', true, '2025-01-05T00:00:00Z', '2025-01-05T00:00:00Z'),
  ('a0000000-0000-0000-0000-000000000004', 'Neha Agarwal', 'neha@vendorbridge.com', 'vendor', true, '2025-01-20T00:00:00Z', '2025-01-20T00:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════
-- VENDORS (25 vendors)
-- ═══════════════════════════════════════════════
INSERT INTO vendors (id, company_name, vendor_code, gst_number, category, contact_person, email, phone, address, rating, status, created_by, created_at, updated_at) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'TechSource Solutions', 'VND-001', '27AABCT1001F1Z5', 'IT Hardware', 'Rajesh Mehta', 'rajesh@techsource.com', '+91 98765 43210', 'Mumbai, Maharashtra', 4.5, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-01-20T00:00:00Z', '2025-01-20T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000002', 'Apex Industrial Supplies', 'VND-002', '29AABAI2002F1Z3', 'Industrial Equipment', 'Suresh Patel', 'suresh@apexindustrial.com', '+91 87654 32109', 'Bangalore, Karnataka', 4.2, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-02-05T00:00:00Z', '2025-02-05T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000003', 'Global Office Systems', 'VND-003', '06AABGO3003F1Z1', 'Office Supplies', 'Anita Sharma', 'anita@globaloffice.com', '+91 76543 21098', 'Delhi, NCR', 4.0, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-02-15T00:00:00Z', '2025-02-15T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000004', 'Prime Manufacturing', 'VND-004', '33AABPM4004F1Z9', 'Manufacturing', 'Vikram Singh', 'vikram@primemanufacturing.com', '+91 65432 10987', 'Chennai, Tamil Nadu', 3.8, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-03-01T00:00:00Z', '2025-03-01T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000005', 'Nexus Procurement', 'VND-005', '09AABNP5005F1Z7', 'Procurement Services', 'Ananya Reddy', 'ananya@nexusprocurement.com', '+91 54321 09876', 'Hyderabad, Telangana', 4.7, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-03-10T00:00:00Z', '2025-03-10T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000006', 'CloudFirst Technologies', 'VND-006', '27AABCFT6006F1Z5', 'Cloud Services', 'Karan Joshi', 'karan@cloudfirst.com', '+91 98711 22334', 'Pune, Maharashtra', 4.6, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-01-25T00:00:00Z', '2025-01-25T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000007', 'SecureNet India', 'VND-007', '29AABSN7007F1Z3', 'Cybersecurity', 'Meera Nair', 'meera@securenet.in', '+91 87622 33445', 'Bangalore, Karnataka', 4.3, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-02-10T00:00:00Z', '2025-02-10T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000008', 'DataStream Analytics', 'VND-008', '06AABDA8008F1Z1', 'Data Analytics', 'Arjun Gupta', 'arjun@datastream.com', '+91 76533 44556', 'Gurgaon, Haryana', 4.1, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-03-05T00:00:00Z', '2025-03-05T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000009', 'FurnishPro India', 'VND-009', '33AABFP9009F1Z9', 'Office Furniture', 'Deepa Menon', 'deepa@furnishpro.in', '+91 65444 55667', 'Chennai, Tamil Nadu', 3.9, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-01-30T00:00:00Z', '2025-01-30T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000010', 'NetWave Systems', 'VND-010', '09AABNW0010F1Z7', 'Networking', 'Rohan Verma', 'rohan@netwave.com', '+91 54355 66778', 'Hyderabad, Telangana', 4.4, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-02-20T00:00:00Z', '2025-02-20T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000011', 'InnoSoft Solutions', 'VND-011', '27AABIS0011F1Z5', 'Software', 'Pooja Deshmukh', 'pooja@innosoft.com', '+91 98766 77889', 'Mumbai, Maharashtra', 4.8, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-03-15T00:00:00Z', '2025-03-15T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000012', 'PowerGrid Solutions', 'VND-012', '29AABPG0012F1Z3', 'Electrical', 'Sanjay Kulkarni', 'sanjay@powergrid.com', '+91 87677 88990', 'Bangalore, Karnataka', 3.7, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-01-22T00:00:00Z', '2025-01-22T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000013', 'LogiTrack Services', 'VND-013', '06AABLT0013F1Z1', 'Logistics', 'Kavita Rao', 'kavita@logitrack.com', '+91 76588 99001', 'Delhi, NCR', 4.0, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-02-28T00:00:00Z', '2025-02-28T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000014', 'GreenEnergy Corp', 'VND-014', '33AABGE0014F1Z9', 'Renewable Energy', 'Arun Nambiar', 'arun@greenenergy.in', '+91 65499 00112', 'Coimbatore, Tamil Nadu', 4.2, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-03-08T00:00:00Z', '2025-03-08T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000015', 'MediSupply India', 'VND-015', '09AABMS0015F1Z7', 'Medical Supplies', 'Sunita Pillai', 'sunita@medisupply.com', '+91 54300 11223', 'Lucknow, UP', 3.6, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-01-18T00:00:00Z', '2025-01-18T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000016', 'SwiftPrint Solutions', 'VND-016', '27AABSP0016F1Z5', 'Printing & Stationery', 'Manish Tiwari', 'manish@swiftprint.com', '+91 98711 22335', 'Nagpur, Maharashtra', 3.5, 'inactive', 'a0000000-0000-0000-0000-000000000001', '2025-02-12T00:00:00Z', '2025-02-12T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000017', 'RoboTech Industries', 'VND-017', '29AABRT0017F1Z3', 'Automation', 'Shraddha Kulkarni', 'shraddha@robotech.com', '+91 87622 33446', 'Pune, Maharashtra', 4.1, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-03-20T00:00:00Z', '2025-03-20T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000018', 'CleanSweep Services', 'VND-018', '06AABCS0018F1Z1', 'Facility Management', 'Rahul Saxena', 'rahul@cleansweep.com', '+91 76533 44557', 'Noida, UP', 3.4, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-01-28T00:00:00Z', '2025-01-28T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000019', 'AlphaSecurity Labs', 'VND-019', '33AABAS0019F1Z9', 'Cybersecurity', 'Vishal Chauhan', 'vishal@alphasecurity.in', '+91 65444 55668', 'Chennai, Tamil Nadu', 4.6, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-02-08T00:00:00Z', '2025-02-08T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000020', 'DataVault Storage', 'VND-020', '09AABDV0020F1Z7', 'Data Storage', 'Neha Kapoor', 'nehа@datavault.com', '+91 54355 66779', 'Hyderabad, Telangana', 4.3, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-03-12T00:00:00Z', '2025-03-12T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000021', 'MegaBuild Construction', 'VND-021', '27AABMB0021F1Z5', 'Construction', 'Aakash Jain', 'aakash@megabuild.com', '+91 98766 77890', 'Ahmedabad, Gujarat', 3.8, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-01-23T00:00:00Z', '2025-01-23T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000022', 'PrecisionParts India', 'VND-022', '29AABPP0022F1Z3', 'Manufacturing', 'Gaurav Mishra', 'gaurav@precisionparts.com', '+91 87677 88991', 'Jamshedpur, Jharkhand', 4.0, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-02-18T00:00:00Z', '2025-02-18T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000023', 'CloudNest Hosting', 'VND-023', '06AABCN0023F1Z1', 'Cloud Services', 'Tanvi Desai', 'tanvi@cloudnest.com', '+91 76588 99002', 'Mumbai, Maharashtra', 4.5, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-03-02T00:00:00Z', '2025-03-02T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000024', 'TerraGreen Energy', 'VND-024', '33AABTG0024F1Z9', 'Renewable Energy', 'Prakash Reddy', 'prakash@terragreen.in', '+91 65499 00113', 'Bangalore, Karnataka', 3.9, 'active', 'a0000000-0000-0000-0000-000000000001', '2025-01-26T00:00:00Z', '2025-01-26T00:00:00Z'),
  ('b0000000-0000-0000-0000-000000000025', 'InfoGuard Security', 'VND-025', '09AABIG0025F1Z7', 'Cybersecurity', 'Aditi Banerjee', 'aditi@infoguard.com', '+91 54300 11224', 'Kolkata, West Bengal', 4.4, 'blacklisted', 'a0000000-0000-0000-0000-000000000001', '2025-02-02T00:00:00Z', '2025-02-02T00:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════
-- RFQS (15 RFQs)
-- ═══════════════════════════════════════════════
INSERT INTO rfqs (id, title, description, quantity, deadline, status, created_by, created_at, updated_at) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'Laptops Procurement Q2 2025', 'Procure 100 laptops with i7 processor, 16GB RAM, 512GB SSD for engineering team. Must include 3-year warranty.', 100, '2025-06-30', 'open', 'a0000000-0000-0000-0000-000000000001', '2025-01-15T10:00:00Z', '2025-01-15T10:00:00Z'),
  ('c0000000-0000-0000-0000-000000000002', 'Office Furniture Expansion', 'Purchase 50 ergonomic office chairs and 30 standing desks for new office floor setup.', 80, '2025-07-15', 'open', 'a0000000-0000-0000-0000-000000000001', '2025-02-01T11:00:00Z', '2025-02-01T11:00:00Z'),
  ('c0000000-0000-0000-0000-000000000003', 'Cloud Infrastructure Upgrade', 'Annual cloud subscription for AWS services including EC2, S3, RDS, and CloudFront for 500+ users.', 1, '2025-05-30', 'awarded', 'a0000000-0000-0000-0000-000000000001', '2025-01-20T09:00:00Z', '2025-01-20T09:00:00Z'),
  ('c0000000-0000-0000-0000-000000000004', 'Network Equipment Purchase', 'Enterprise-grade switches, routers, and access points for 3 office locations. Include installation support.', 150, '2025-06-20', 'open', 'a0000000-0000-0000-0000-000000000001', '2025-02-10T14:00:00Z', '2025-02-10T14:00:00Z'),
  ('c0000000-0000-0000-0000-000000000005', 'Security Software Renewal', 'Renew enterprise antivirus and endpoint protection for 500 workstations. Must include 24/7 support.', 500, '2025-05-15', 'closed', 'a0000000-0000-0000-0000-000000000001', '2025-01-25T08:00:00Z', '2025-01-25T08:00:00Z'),
  ('c0000000-0000-0000-0000-000000000006', 'Industrial Machinery Parts', 'Procure replacement parts for CNC machines including spindles, bearings, and cutting tools.', 200, '2025-07-01', 'draft', 'a0000000-0000-0000-0000-000000000001', '2025-03-01T10:00:00Z', '2025-03-01T10:00:00Z'),
  ('c0000000-0000-0000-0000-000000000007', 'Data Center UPS Systems', 'Install 3-phase UPS systems for new data center. Minimum 100kVA capacity with battery backup.', 6, '2025-08-15', 'open', 'a0000000-0000-0000-0000-000000000001', '2025-02-15T11:30:00Z', '2025-02-15T11:30:00Z'),
  ('c0000000-0000-0000-0000-000000000008', 'Employee Training Platform', 'Annual license for enterprise learning management system. Must support 1000+ users with SCORM compliance.', 1, '2025-06-10', 'open', 'a0000000-0000-0000-0000-000000000001', '2025-03-05T09:00:00Z', '2025-03-05T09:00:00Z'),
  ('c0000000-0000-0000-0000-000000000009', 'Solar Panel Installation', 'Install 200kW solar panel system on office rooftop. Include inverters, mounting, and grid connectivity.', 1, '2025-09-30', 'draft', 'a0000000-0000-0000-0000-000000000001', '2025-03-10T14:00:00Z', '2025-03-10T14:00:00Z'),
  ('c0000000-0000-0000-0000-000000000010', 'Print & Stationery Bulk Order', 'Annual bulk order for office stationery including paper, toners, folders, and printing supplies.', 5000, '2025-05-20', 'awarded', 'a0000000-0000-0000-0000-000000000001', '2025-01-10T10:00:00Z', '2025-01-10T10:00:00Z'),
  ('c0000000-0000-0000-0000-000000000011', 'Fire Safety Equipment', 'Install fire suppression systems and extinguishers across 3 floors. Must comply with NBC standards.', 50, '2025-07-20', 'open', 'a0000000-0000-0000-0000-000000000001', '2025-02-20T10:00:00Z', '2025-02-20T10:00:00Z'),
  ('c0000000-0000-0000-0000-000000000012', 'CCTV Surveillance System', 'Install 100+ IP cameras with NVR and monitoring software for 2 office campuses.', 120, '2025-08-01', 'open', 'a0000000-0000-0000-0000-000000000001', '2025-03-01T11:00:00Z', '2025-03-01T11:00:00Z'),
  ('c0000000-0000-0000-0000-000000000013', 'Warehouse Racking System', 'Install heavy-duty pallet racking for 10,000 sq ft warehouse. Include safety accessories.', 40, '2025-08-10', 'draft', 'a0000000-0000-0000-0000-000000000001', '2025-03-08T09:00:00Z', '2025-03-08T09:00:00Z'),
  ('c0000000-0000-0000-0000-000000000014', 'Biometric Access Control', 'Deploy biometric access control system for 5 entry points with attendance integration.', 5, '2025-07-25', 'closed', 'a0000000-0000-0000-0000-000000000001', '2025-01-28T08:30:00Z', '2025-01-28T08:30:00Z'),
  ('c0000000-0000-0000-0000-000000000015', 'ERP Software Implementation', 'Implement enterprise resource planning system for finance, HR, and supply chain modules.', 1, '2025-10-30', 'open', 'a0000000-0000-0000-0000-000000000001', '2025-03-15T10:00:00Z', '2025-03-15T10:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════
-- QUOTATIONS (40 quotations)
-- ═══════════════════════════════════════════════
INSERT INTO quotations (id, rfq_id, vendor_id, price, delivery_days, notes, status, submitted_at, updated_at) VALUES
  -- RFQ 1: Laptops (4 quotes)
  ('d0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 8500000, 14, 'Includes 3-year warranty and on-site support.', 'submitted', '2025-02-01T10:00:00Z', '2025-02-01T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002', 7800000, 21, 'Standard warranty, extended available at extra cost.', 'submitted', '2025-02-03T11:00:00Z', '2025-02-03T11:00:00Z'),
  ('d0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000006', 8200000, 10, 'Fastest delivery, premium support included.', 'selected', '2025-02-02T09:00:00Z', '2025-02-02T09:00:00Z'),
  ('d0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000011', 8900000, 12, 'Premium build quality, includes accidental damage.', 'rejected', '2025-02-04T14:00:00Z', '2025-02-04T14:00:00Z'),
  -- RFQ 2: Office Furniture (3 quotes)
  ('d0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000009', 375000, 7, 'Ergonomic chairs with 5-year warranty.', 'submitted', '2025-02-15T10:00:00Z', '2025-02-15T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000003', 420000, 10, 'Premium chairs with lumbar support.', 'submitted', '2025-02-17T11:00:00Z', '2025-02-17T11:00:00Z'),
  ('d0000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 350000, 14, 'Budget-friendly option with standard warranty.', 'shortlisted', '2025-02-16T09:00:00Z', '2025-02-16T09:00:00Z'),
  -- RFQ 3: Cloud Infrastructure (3 quotes)
  ('d0000000-0000-0000-0000-000000000008', 'c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000006', 2400000, 30, 'Full AWS migration with 24/7 support.', 'selected', '2025-02-10T10:00:00Z', '2025-02-10T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000009', 'c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000023', 2100000, 45, 'Competitive pricing, phased migration.', 'submitted', '2025-02-12T11:00:00Z', '2025-02-12T11:00:00Z'),
  ('d0000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000020', 2800000, 20, 'Premium tier with dedicated support team.', 'rejected', '2025-02-11T09:00:00Z', '2025-02-11T09:00:00Z'),
  -- RFQ 4: Network Equipment (3 quotes)
  ('d0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000010', 1800000, 21, 'Cisco equipment with installation.', 'submitted', '2025-02-20T10:00:00Z', '2025-02-20T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 1650000, 28, 'Mixed vendor solution for cost optimization.', 'submitted', '2025-02-22T11:00:00Z', '2025-02-22T11:00:00Z'),
  ('d0000000-0000-0000-0000-000000000013', 'c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000007', 1950000, 14, 'Enterprise-grade with SLA guarantee.', 'shortlisted', '2025-02-21T09:00:00Z', '2025-02-21T09:00:00Z'),
  -- RFQ 5: Security Software (3 quotes)
  ('d0000000-0000-0000-0000-000000000014', 'c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000007', 1200000, 7, 'Enterprise endpoint protection suite.', 'selected', '2025-02-05T10:00:00Z', '2025-02-05T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000015', 'c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000019', 1350000, 10, 'Advanced threat detection included.', 'submitted', '2025-02-06T11:00:00Z', '2025-02-06T11:00:00Z'),
  ('d0000000-0000-0000-0000-000000000016', 'c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000025', 980000, 14, 'Budget option with basic protection.', 'rejected', '2025-02-07T09:00:00Z', '2025-02-07T09:00:00Z'),
  -- RFQ 7: UPS Systems (3 quotes)
  ('d0000000-0000-0000-0000-000000000017', 'c0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000012', 3600000, 30, '3x 100kVA UPS with battery banks.', 'submitted', '2025-02-25T10:00:00Z', '2025-02-25T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000018', 'c0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000014', 3200000, 45, 'Green energy efficient UPS systems.', 'submitted', '2025-02-27T11:00:00Z', '2025-02-27T11:00:00Z'),
  ('d0000000-0000-0000-0000-000000000019', 'c0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000002', 3900000, 21, 'Premium with 10-year warranty.', 'shortlisted', '2025-02-26T09:00:00Z', '2025-02-26T09:00:00Z'),
  -- RFQ 8: Training Platform (2 quotes)
  ('d0000000-0000-0000-0000-000000000020', 'c0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000011', 800000, 15, 'Custom LMS with SCORM support.', 'submitted', '2025-03-10T10:00:00Z', '2025-03-10T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000021', 'c0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000008', 650000, 21, 'SaaS-based with analytics dashboard.', 'submitted', '2025-03-12T11:00:00Z', '2025-03-12T11:00:00Z'),
  -- RFQ 10: Stationery (3 quotes)
  ('d0000000-0000-0000-0000-000000000022', 'c0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000003', 180000, 5, 'Bulk stationery with free delivery.', 'selected', '2025-01-18T10:00:00Z', '2025-01-18T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000023', 'c0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000016', 165000, 7, 'Eco-friendly stationery options.', 'submitted', '2025-01-19T11:00:00Z', '2025-01-19T11:00:00Z'),
  ('d0000000-0000-0000-0000-000000000024', 'c0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000015', 195000, 3, 'Express delivery with premium quality.', 'rejected', '2025-01-17T09:00:00Z', '2025-01-17T09:00:00Z'),
  -- RFQ 11: Fire Safety (2 quotes)
  ('d0000000-0000-0000-0000-000000000025', 'c0000000-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000018', 450000, 14, 'NBC compliant fire safety system.', 'submitted', '2025-03-01T10:00:00Z', '2025-03-01T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000026', 'c0000000-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000002', 520000, 10, 'Premium with annual maintenance.', 'shortlisted', '2025-03-02T11:00:00Z', '2025-03-02T11:00:00Z'),
  -- RFQ 12: CCTV (3 quotes)
  ('d0000000-0000-0000-0000-000000000027', 'c0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000007', 2800000, 21, 'Hikvision cameras with NVR.', 'submitted', '2025-03-05T10:00:00Z', '2025-03-05T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000028', 'c0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000019', 3100000, 14, 'Dahua cameras with AI analytics.', 'submitted', '2025-03-07T11:00:00Z', '2025-03-07T11:00:00Z'),
  ('d0000000-0000-0000-0000-000000000029', 'c0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000001', 2600000, 28, 'Mixed brand solution for cost optimization.', 'shortlisted', '2025-03-06T09:00:00Z', '2025-03-06T09:00:00Z'),
  -- RFQ 14: Biometric (2 quotes)
  ('d0000000-0000-0000-0000-000000000030', 'c0000000-0000-0000-0000-000000000014', 'b0000000-0000-0000-0000-000000000019', 750000, 14, 'ZKTeco biometric with attendance.', 'selected', '2025-02-08T10:00:00Z', '2025-02-08T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000031', 'c0000000-0000-0000-0000-000000000014', 'b0000000-0000-0000-0000-000000000007', 850000, 10, 'Hikvision biometric with face recognition.', 'submitted', '2025-02-09T11:00:00Z', '2025-02-09T11:00:00Z'),
  -- RFQ 15: ERP (3 quotes)
  ('d0000000-0000-0000-0000-000000000032', 'c0000000-0000-0000-0000-000000000015', 'b0000000-0000-0000-0000-000000000011', 5500000, 90, 'SAP Business One implementation.', 'submitted', '2025-03-20T10:00:00Z', '2025-03-20T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000033', 'c0000000-0000-0000-0000-000000000015', 'b0000000-0000-0000-0000-000000000008', 4200000, 120, 'Custom ERP with full source code.', 'submitted', '2025-03-22T11:00:00Z', '2025-03-22T11:00:00Z'),
  ('d0000000-0000-0000-0000-000000000034', 'c0000000-0000-0000-0000-000000000015', 'b0000000-0000-0000-0000-000000000006', 6800000, 60, 'Oracle NetSuite with premium support.', 'shortlisted', '2025-03-21T09:00:00Z', '2025-03-21T09:00:00Z'),
  -- Extra quotations for various RFQs
  ('d0000000-0000-0000-0000-000000000035', 'c0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000004', 2400000, 14, 'CNC parts with precision guarantee.', 'submitted', '2025-03-15T10:00:00Z', '2025-03-15T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000036', 'c0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000022', 2100000, 21, 'OEM parts with quality certification.', 'submitted', '2025-03-16T11:00:00Z', '2025-03-16T11:00:00Z'),
  ('d0000000-0000-0000-0000-000000000037', 'c0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000014', 8500000, 60, '200kW rooftop solar with grid tie.', 'submitted', '2025-03-15T10:00:00Z', '2025-03-15T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000038', 'c0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000024', 7800000, 75, 'Monocrystalline panels with 25-year warranty.', 'shortlisted', '2025-03-17T11:00:00Z', '2025-03-17T11:00:00Z'),
  ('d0000000-0000-0000-0000-000000000039', 'c0000000-0000-0000-0000-000000000013', 'b0000000-0000-0000-0000-000000000002', 1200000, 30, 'Heavy-duty pallet racking system.', 'submitted', '2025-03-12T10:00:00Z', '2025-03-12T10:00:00Z'),
  ('d0000000-0000-0000-0000-000000000040', 'c0000000-0000-0000-0000-000000000013', 'b0000000-0000-0000-0000-000000000009', 1050000, 45, 'Modular racking with installation.', 'submitted', '2025-03-13T11:00:00Z', '2025-03-13T11:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════
-- APPROVALS (10 approvals)
-- ═══════════════════════════════════════════════
INSERT INTO approvals (id, quotation_id, approver_id, status, remarks, approved_at, created_at) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 'approved', 'Best value with fast delivery. Approved for procurement.', '2025-02-15T16:00:00Z', '2025-02-14T10:00:00Z'),
  ('e0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000002', 'approved', 'CloudFirst has proven track record. Approved.', '2025-02-20T14:00:00Z', '2025-02-18T10:00:00Z'),
  ('e0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000002', 'approved', 'Security is critical. SecureNet offers best protection.', '2025-02-10T15:00:00Z', '2025-02-08T10:00:00Z'),
  ('e0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000022', 'a0000000-0000-0000-0000-000000000002', 'approved', 'Good pricing for bulk order. Approved.', '2025-01-22T16:00:00Z', '2025-01-20T10:00:00Z'),
  ('e0000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000030', 'a0000000-0000-0000-0000-000000000002', 'approved', 'AlphaSecurity biometric meets all requirements.', '2025-02-12T14:00:00Z', '2025-02-10T10:00:00Z'),
  ('e0000000-0000-0000-0000-000000000006', 'd0000000-0000-0000-0000-000000000016', 'a0000000-0000-0000-0000-000000000002', 'rejected', 'InfoGuard is blacklisted. Find alternative vendor.', '2025-02-10T12:00:00Z', '2025-02-08T10:00:00Z'),
  ('e0000000-0000-0000-0000-000000000007', 'd0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', 'pending', NULL, NULL, '2025-02-20T10:00:00Z'),
  ('e0000000-0000-0000-0000-000000000008', 'd0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000002', 'pending', NULL, NULL, '2025-03-01T10:00:00Z'),
  ('e0000000-0000-0000-0000-000000000009', 'd0000000-0000-0000-0000-000000000020', 'a0000000-0000-0000-0000-000000000002', 'pending', NULL, NULL, '2025-03-15T10:00:00Z'),
  ('e0000000-0000-0000-0000-000000000010', 'd0000000-0000-0000-0000-000000000032', 'a0000000-0000-0000-0000-000000000002', 'pending', NULL, NULL, '2025-03-25T10:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════
-- PURCHASE ORDERS (8 POs)
-- ═══════════════════════════════════════════════
INSERT INTO purchase_orders (id, po_number, quotation_id, status, generated_at) VALUES
  ('f0000000-0000-0000-0000-000000000001', 'PO-2502-0001', 'd0000000-0000-0000-0000-000000000003', 'completed', '2025-02-16T10:00:00Z'),
  ('f0000000-0000-0000-0000-000000000002', 'PO-2502-0002', 'd0000000-0000-0000-0000-000000000008', 'sent', '2025-02-21T10:00:00Z'),
  ('f0000000-0000-0000-0000-000000000003', 'PO-2502-0003', 'd0000000-0000-0000-0000-000000000014', 'completed', '2025-02-11T10:00:00Z'),
  ('f0000000-0000-0000-0000-000000000004', 'PO-2501-0004', 'd0000000-0000-0000-0000-000000000022', 'completed', '2025-01-23T10:00:00Z'),
  ('f0000000-0000-0000-0000-000000000005', 'PO-2502-0005', 'd0000000-0000-0000-0000-000000000030', 'sent', '2025-02-13T10:00:00Z'),
  ('f0000000-0000-0000-0000-000000000006', 'PO-2503-0006', 'd0000000-0000-0000-0000-000000000025', 'generated', '2025-03-05T10:00:00Z'),
  ('f0000000-0000-0000-0000-000000000007', 'PO-2503-0007', 'd0000000-0000-0000-0000-000000000027', 'generated', '2025-03-10T10:00:00Z'),
  ('f0000000-0000-0000-0000-000000000008', 'PO-2503-0008', 'd0000000-0000-0000-0000-000000000005', 'generated', '2025-03-15T10:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════
-- INVOICES (6 invoices)
-- ═══════════════════════════════════════════════
INSERT INTO invoices (id, invoice_number, po_id, subtotal, tax, total, status, generated_at) VALUES
  ('aa000000-0000-0000-0000-000000000001', 'INV-2502-0001', 'f0000000-0000-0000-0000-000000000001', 8200000, 1476000, 9676000, 'paid', '2025-02-20T10:00:00Z'),
  ('aa000000-0000-0000-0000-000000000002', 'INV-2502-0002', 'f0000000-0000-0000-0000-000000000003', 1200000, 216000, 1416000, 'paid', '2025-02-15T10:00:00Z'),
  ('aa000000-0000-0000-0000-000000000003', 'INV-2501-0003', 'f0000000-0000-0000-0000-000000000004', 180000, 32400, 212400, 'paid', '2025-01-28T10:00:00Z'),
  ('aa000000-0000-0000-0000-000000000004', 'INV-2502-0004', 'f0000000-0000-0000-0000-000000000002', 2400000, 432000, 2832000, 'sent', '2025-02-28T10:00:00Z'),
  ('aa000000-0000-0000-0000-000000000005', 'INV-2502-0005', 'f0000000-0000-0000-0000-000000000005', 750000, 135000, 885000, 'sent', '2025-02-20T10:00:00Z'),
  ('aa000000-0000-0000-0000-000000000006', 'INV-2503-0006', 'f0000000-0000-0000-0000-000000000006', 450000, 81000, 531000, 'draft', '2025-03-10T10:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════
-- AI RECOMMENDATIONS (5 recommendations)
-- ═══════════════════════════════════════════════
INSERT INTO ai_recommendations (id, rfq_id, recommended_vendor_id, confidence_score, reasoning, created_at) VALUES
  ('bb000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000006', 0.89, 'CloudFirst offers the best balance of price (₹82L), fastest delivery (10 days), and high vendor rating (4.6). Premium support included at no extra cost.', '2025-02-05T10:00:00Z'),
  ('bb000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000006', 0.92, 'CloudFirst is the clear winner with full AWS expertise, competitive pricing (₹24L), and proven migration track record.', '2025-02-15T10:00:00Z'),
  ('bb000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000007', 0.87, 'SecureNet provides enterprise-grade security with fast 7-day deployment. Best value for 500-workstation deployment.', '2025-02-06T10:00:00Z'),
  ('bb000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000003', 0.85, 'Global Office offers bulk pricing advantage with fastest 5-day delivery. Eco-friendly options align with company sustainability goals.', '2025-01-15T10:00:00Z'),
  ('bb000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000014', 'b0000000-0000-0000-0000-000000000019', 0.91, 'AlphaSecurity biometric system meets all requirements with face recognition technology. Best ROI for 5-entry-point deployment.', '2025-02-10T10:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════
-- ACTIVITY LOGS (30 entries)
-- ═══════════════════════════════════════════════
INSERT INTO activity_logs (id, user_id, action, entity_type, entity_id, metadata, created_at) VALUES
  ('cc000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'vendor_added', 'vendor', 'b0000000-0000-0000-0000-000000000001', '{"company_name":"TechSource Solutions"}', '2025-01-20T10:00:00Z'),
  ('cc000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'vendor_added', 'vendor', 'b0000000-0000-0000-0000-000000000002', '{"company_name":"Apex Industrial Supplies"}', '2025-02-05T11:00:00Z'),
  ('cc000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'rfq_created', 'rfq', 'c0000000-0000-0000-0000-000000000001', '{"title":"Laptops Procurement Q2 2025"}', '2025-01-15T10:00:00Z'),
  ('cc000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'rfq_created', 'rfq', 'c0000000-0000-0000-0000-000000000002', '{"title":"Office Furniture Expansion"}', '2025-02-01T11:00:00Z'),
  ('cc000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'rfq_published', 'rfq', 'c0000000-0000-0000-0000-000000000001', '{"title":"Laptops Procurement Q2 2025"}', '2025-01-16T09:00:00Z'),
  ('cc000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000001', 'quotation_submitted', 'quotation', 'd0000000-0000-0000-0000-000000000001', '{"rfq_title":"Laptops Q2","price":8500000}', '2025-02-01T10:00:00Z'),
  ('cc000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000002', 'quotation_submitted', 'quotation', 'd0000000-0000-0000-0000-000000000002', '{"rfq_title":"Laptops Q2","price":7800000}', '2025-02-03T11:00:00Z'),
  ('cc000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000006', 'quotation_submitted', 'quotation', 'd0000000-0000-0000-0000-000000000003', '{"rfq_title":"Laptops Q2","price":8200000}', '2025-02-02T09:00:00Z'),
  ('cc000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000002', 'approval_completed', 'approval', 'e0000000-0000-0000-0000-000000000001', '{"status":"approved","rfq":"Laptops Q2"}', '2025-02-15T16:00:00Z'),
  ('cc000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000001', 'po_generated', 'purchase_order', 'f0000000-0000-0000-0000-000000000001', '{"po_number":"PO-2502-0001","amount":8200000}', '2025-02-16T10:00:00Z'),
  ('cc000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000001', 'invoice_generated', 'invoice', 'aa000000-0000-0000-0000-000000000001', '{"invoice_number":"INV-2502-0001","total":9676000}', '2025-02-20T10:00:00Z'),
  ('cc000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000001', 'vendor_added', 'vendor', 'b0000000-0000-0000-0000-000000000006', '{"company_name":"CloudFirst Technologies"}', '2025-01-25T10:00:00Z'),
  ('cc000000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000001', 'rfq_created', 'rfq', 'c0000000-0000-0000-0000-000000000004', '{"title":"Network Equipment Purchase"}', '2025-02-10T14:00:00Z'),
  ('cc000000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000001', 'rfq_created', 'rfq', 'c0000000-0000-0000-0000-000000000005', '{"title":"Security Software Renewal"}', '2025-01-25T08:00:00Z'),
  ('cc000000-0000-0000-0000-000000000015', 'b0000000-0000-0000-0000-000000000007', 'quotation_submitted', 'quotation', 'd0000000-0000-0000-0000-000000000014', '{"rfq_title":"Security Software","price":1200000}', '2025-02-05T10:00:00Z'),
  ('cc000000-0000-0000-0000-000000000016', 'a0000000-0000-0000-0000-000000000002', 'approval_completed', 'approval', 'e0000000-0000-0000-0000-000000000003', '{"status":"approved","rfq":"Security Software"}', '2025-02-10T15:00:00Z'),
  ('cc000000-0000-0000-0000-000000000017', 'a0000000-0000-0000-0000-000000000001', 'po_generated', 'purchase_order', 'f0000000-0000-0000-0000-000000000003', '{"po_number":"PO-2502-0003","amount":1200000}', '2025-02-11T10:00:00Z'),
  ('cc000000-0000-0000-0000-000000000018', 'a0000000-0000-0000-0000-000000000001', 'rfq_created', 'rfq', 'c0000000-0000-0000-0000-000000000007', '{"title":"Data Center UPS Systems"}', '2025-02-15T11:30:00Z'),
  ('cc000000-0000-0000-0000-000000000019', 'b0000000-0000-0000-0000-000000000012', 'quotation_submitted', 'quotation', 'd0000000-0000-0000-0000-000000000017', '{"rfq_title":"UPS Systems","price":3600000}', '2025-02-25T10:00:00Z'),
  ('cc000000-0000-0000-0000-000000000020', 'a0000000-0000-0000-0000-000000000001', 'vendor_added', 'vendor', 'b0000000-0000-0000-0000-000000000011', '{"company_name":"InnoSoft Solutions"}', '2025-03-15T10:00:00Z'),
  ('cc000000-0000-0000-0000-000000000021', 'a0000000-0000-0000-0000-000000000001', 'rfq_created', 'rfq', 'c0000000-0000-0000-0000-000000000015', '{"title":"ERP Software Implementation"}', '2025-03-15T10:00:00Z'),
  ('cc000000-0000-0000-0000-000000000022', 'a0000000-0000-0000-0000-000000000002', 'approval_completed', 'approval', 'e0000000-0000-0000-0000-000000000005', '{"status":"approved","rfq":"Biometric Access"}', '2025-02-12T14:00:00Z'),
  ('cc000000-0000-0000-0000-000000000023', 'a0000000-0000-0000-0000-000000000001', 'po_generated', 'purchase_order', 'f0000000-0000-0000-0000-000000000005', '{"po_number":"PO-2502-0005","amount":750000}', '2025-02-13T10:00:00Z'),
  ('cc000000-0000-0000-0000-000000000024', 'b0000000-0000-0000-0000-000000000003', 'quotation_submitted', 'quotation', 'd0000000-0000-0000-0000-000000000006', '{"rfq_title":"Office Furniture","price":420000}', '2025-02-17T11:00:00Z'),
  ('cc000000-0000-0000-0000-000000000025', 'a0000000-0000-0000-0000-000000000001', 'rfq_created', 'rfq', 'c0000000-0000-0000-0000-000000000011', '{"title":"Fire Safety Equipment"}', '2025-02-20T10:00:00Z'),
  ('cc000000-0000-0000-0000-000000000026', 'a0000000-0000-0000-0000-000000000001', 'rfq_created', 'rfq', 'c0000000-0000-0000-0000-000000000012', '{"title":"CCTV Surveillance System"}', '2025-03-01T11:00:00Z'),
  ('cc000000-0000-0000-0000-000000000027', 'a0000000-0000-0000-0000-000000000001', 'approval_rejected', 'approval', 'e0000000-0000-0000-0000-000000000006', '{"status":"rejected","rfq":"Security Software"}', '2025-02-10T12:00:00Z'),
  ('cc000000-0000-0000-0000-000000000028', 'b0000000-0000-0000-0000-000000000011', 'quotation_submitted', 'quotation', 'd0000000-0000-0000-0000-000000000032', '{"rfq_title":"ERP Implementation","price":5500000}', '2025-03-20T10:00:00Z'),
  ('cc000000-0000-0000-0000-000000000029', 'a0000000-0000-0000-0000-000000000001', 'rfq_published', 'rfq', 'c0000000-0000-0000-0000-000000000004', '{"title":"Network Equipment Purchase"}', '2025-02-11T09:00:00Z'),
  ('cc000000-0000-0000-0000-000000000030', 'a0000000-0000-0000-0000-000000000001', 'invoice_generated', 'invoice', 'aa000000-0000-0000-0000-000000000004', '{"invoice_number":"INV-2502-0004","total":2832000}', '2025-02-28T10:00:00Z')
ON CONFLICT (id) DO NOTHING;
