-- ============================================
-- DELETE POLICIES — Admin se delete karne ke liye
-- Supabase SQL Editor mein yeh run karo
-- ============================================

-- Visitors delete
DROP POLICY IF EXISTS "Public delete visitors" ON visitors;
CREATE POLICY "Public delete visitors" ON visitors FOR DELETE USING (true);

-- Contacts delete
DROP POLICY IF EXISTS "Public delete contacts" ON contact_requests;
CREATE POLICY "Public delete contacts" ON contact_requests FOR DELETE USING (true);

-- Analytics insert (for tracking)
DROP POLICY IF EXISTS "Public insert analytics" ON analytics;
CREATE POLICY "Public insert analytics" ON analytics FOR INSERT WITH CHECK (true);

-- Analytics read
DROP POLICY IF EXISTS "Public read analytics" ON analytics;
CREATE POLICY "Public read analytics" ON analytics FOR SELECT USING (true);

SELECT 'Delete policies created! Admin can now delete visitors and contacts.' AS status;