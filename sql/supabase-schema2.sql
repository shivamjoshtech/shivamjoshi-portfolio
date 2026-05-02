-- ============================================
-- FIX: Admin dashboard ko contacts dikhane ke liye
-- Supabase SQL Editor mein yeh run karo
-- ============================================

-- Contact requests ko public read access do (admin dashboard ke liye)
DROP POLICY IF EXISTS "Public read contacts" ON contact_requests;
CREATE POLICY "Public read contacts" ON contact_requests FOR SELECT USING (true);

-- Contact requests ko update allow karo (mark as read, archive ke liye)
DROP POLICY IF EXISTS "Public update contacts" ON contact_requests;
CREATE POLICY "Public update contacts" ON contact_requests FOR UPDATE USING (true);

-- Visitors ko bhi read access do
DROP POLICY IF EXISTS "Public read visitors" ON visitors;
CREATE POLICY "Public read visitors" ON visitors FOR SELECT USING (true);

-- Visitors update allow karo
DROP POLICY IF EXISTS "Public update visitors" ON visitors;
CREATE POLICY "Public update visitors" ON visitors FOR UPDATE USING (true);

-- Analytics read access
DROP POLICY IF EXISTS "Public read analytics" ON analytics;
CREATE POLICY "Public read analytics" ON analytics FOR SELECT USING (true);

-- Projects — full CRUD for admin
DROP POLICY IF EXISTS "Public read projects" ON projects;
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert projects" ON projects;
CREATE POLICY "Public insert projects" ON projects FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public update projects" ON projects;
CREATE POLICY "Public update projects" ON projects FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public delete projects" ON projects;
CREATE POLICY "Public delete projects" ON projects FOR DELETE USING (true);

-- Site settings — read and update
DROP POLICY IF EXISTS "Public read settings" ON site_settings;
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert settings" ON site_settings;
CREATE POLICY "Public insert settings" ON site_settings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public update settings" ON site_settings;
CREATE POLICY "Public update settings" ON site_settings FOR UPDATE USING (true);

-- Success message
SELECT 'All policies updated! Admin dashboard should now show contacts, visitors, projects.' AS status;
