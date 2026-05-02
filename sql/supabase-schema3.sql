-- ============================================
-- SUPABASE STORAGE POLICIES — Resume Bucket
-- Supabase SQL Editor mein yeh run karo
-- ============================================

-- Step 1: Pehle Supabase dashboard → Storage → New bucket
-- Name: resumes
-- Public bucket: ON
-- Create click karo

-- Step 2: Phir yeh SQL run karo:

-- Public SELECT (anyone can view)
CREATE POLICY "Public read resumes bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

-- Public INSERT (admin can upload)
CREATE POLICY "Public upload to resumes bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- Public UPDATE (admin can replace)
CREATE POLICY "Public update resumes bucket"
ON storage.objects FOR UPDATE
USING (bucket_id = 'resumes');

-- Public DELETE (admin can delete)
CREATE POLICY "Public delete resumes bucket"
ON storage.objects FOR DELETE
USING (bucket_id = 'resumes');

SELECT 'Storage policies created! Upload should now work.' AS status;
