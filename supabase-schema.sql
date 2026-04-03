-- ============================================
-- SHIVAM JOSHI PORTFOLIO — Supabase Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. VISITORS TABLE — Log everyone who visits & interacts with avatar
CREATE TABLE IF NOT EXISTS visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  purpose TEXT, -- 'hiring', 'freelance', 'collaboration', 'just_browsing', etc.
  message TEXT,
  ip_address TEXT,
  user_agent TEXT,
  country TEXT,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROJECTS TABLE — Showcase projects (managed from admin)
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  category TEXT NOT NULL CHECK (category IN ('major', 'mini', 'freelance', 'invented', 'client_demand')),
  tech_stack JSONB DEFAULT '[]'::jsonb, -- [{name: "Python", icon: "python"}]
  github_url TEXT,
  live_url TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SKILLS TABLE — Skills with categories
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  icon_name TEXT, -- icon identifier for react-icons
  proficiency INTEGER DEFAULT 80 CHECK (proficiency >= 0 AND proficiency <= 100),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXPERIENCE TABLE — Work experience entries
CREATE TABLE IF NOT EXISTS experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT, -- NULL means 'Present'
  description TEXT NOT NULL,
  highlights JSONB DEFAULT '[]'::jsonb, -- ["Built X", "Deployed Y"]
  tech_used JSONB DEFAULT '[]'::jsonb,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field TEXT,
  location TEXT,
  start_year INTEGER,
  end_year INTEGER,
  grade TEXT,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  event TEXT NOT NULL,
  date TEXT,
  description TEXT NOT NULL,
  achievement_type TEXT DEFAULT 'hackathon' CHECK (achievement_type IN ('hackathon', 'award', 'certification', 'publication', 'other')),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SITE SETTINGS — Admin-configurable site settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CONTACT REQUESTS — From contact form
CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ANALYTICS — Page views & interactions
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- 'page_view', 'project_click', 'resume_download', 'avatar_chat'
  page TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  visitor_id UUID REFERENCES visitors(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_visitors_created ON visitors(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_requests(status);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Public read access for portfolio content
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Public read education" ON education FOR SELECT USING (true);
CREATE POLICY "Public read achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);

-- Public insert for visitors & contacts (anyone can submit)
CREATE POLICY "Public insert visitors" ON visitors FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert contacts" ON contact_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert analytics" ON analytics FOR INSERT WITH CHECK (true);

-- Service role (admin) has full access via supabaseAdmin client
-- No additional policies needed — service role bypasses RLS

-- ============================================
-- SEED DATA — Initial skills
-- ============================================
INSERT INTO skills (name, category, icon_name, proficiency, order_index) VALUES
  ('Python', 'Programming', 'SiPython', 95, 1),
  ('JavaScript', 'Programming', 'SiJavascript', 88, 2),
  ('TypeScript', 'Programming', 'SiTypescript', 82, 3),
  ('LLMs', 'GenAI & ML', 'SiBrain', 92, 4),
  ('NumPy', 'GenAI & ML', 'SiNumpy', 85, 5),
  ('Pandas', 'GenAI & ML', 'SiPandas', 85, 6),
  ('OpenCV', 'GenAI & ML', 'SiOpencv', 78, 7),
  ('Multi-Agent Pipelines', 'Agentic AI', 'SiRobot', 90, 8),
  ('RAG', 'Agentic AI', 'SiDatabase', 88, 9),
  ('LangChain', 'GenAI Frameworks', 'SiChainlink', 90, 10),
  ('LlamaIndex', 'GenAI Frameworks', 'SiLlama', 85, 11),
  ('Hugging Face', 'GenAI Frameworks', 'SiHuggingface', 82, 12),
  ('Pinecone', 'Vector Databases', 'SiPinecone', 80, 13),
  ('Node.js', 'Backend & APIs', 'SiNodedotjs', 85, 14),
  ('Express.js', 'Backend & APIs', 'SiExpress', 85, 15),
  ('Flask', 'Backend & APIs', 'SiFlask', 88, 16),
  ('REST APIs', 'Backend & APIs', 'SiPostman', 90, 17),
  ('React.js', 'Frontend', 'SiReact', 85, 18),
  ('HTML5', 'Frontend', 'SiHtml5', 90, 19),
  ('CSS3', 'Frontend', 'SiCss3', 88, 20),
  ('MongoDB', 'Databases', 'SiMongodb', 82, 21),
  ('SQL', 'Databases', 'SiMysql', 80, 22),
  ('Docker', 'MLOps & Tools', 'SiDocker', 75, 23),
  ('GitHub', 'MLOps & Tools', 'SiGithub', 90, 24),
  ('CI/CD', 'MLOps & Tools', 'SiGithubactions', 72, 25),
  ('Claude API', 'AI Platforms', 'SiAnthropic', 92, 26),
  ('OpenAI API', 'AI Platforms', 'SiOpenai', 88, 27),
  ('Prompt Engineering', 'Specialization', 'SiChatbot', 95, 28),
  ('Geospatial Analysis', 'Specialization', 'SiGooglemaps', 90, 29),
  ('API Integration', 'Specialization', 'SiSwagger', 92, 30),
  ('Workflow Automation', 'Specialization', 'SiZapier', 88, 31)
ON CONFLICT DO NOTHING;

-- Seed education
INSERT INTO education (institution, degree, field, location, start_year, end_year, grade, order_index) VALUES
  ('Graphic Era University', 'Bachelor of Computer Applications (BCA)', 'Computer Applications', 'Uttarakhand, India', 2022, 2025, NULL, 1),
  ('The Masters School, Haldwani', 'XII (CBSE)', 'PCM', 'Nainital, Uttarakhand', NULL, 2021, '84.2%', 2)
ON CONFLICT DO NOTHING;

-- Seed experience
INSERT INTO experience (company, role, location, start_date, end_date, description, highlights, order_index) VALUES
  ('Tata Consultancy Services (TCS)', 'AI Engineer — GenAI Developer, CoE Team', 'India', 'July 2025', NULL,
   'Building and deploying AI-driven solutions within TCS GIS Center of Excellence. Automating production workflows using multi-agent AI pipelines and LLM integration.',
   '["Engineered AI/ML automation eliminating 200+ man-hours of manual geospatial research", "Built AI-powered geocoding engine with confidence scoring and bulk-processing", "Developed AI-based signboard detection model for field operations", "Integrated LLM/VLM solutions into live production workflows", "Emergency deployment for critical LLM & VLM integration projects"]'::jsonb,
   1),
  ('Outlier AI (Scale AI)', 'Junior Programmer — Real World Coding Evals', 'Remote', 'Sept 2024', 'July 2025',
   'Trained and fine-tuned Large Language Models through real-world coding evaluations, preparing high-quality datasets for model optimization.',
   '["Trained & fine-tuned LLMs through real-world coding evaluations", "Built data scraping pipelines and manipulation scripts", "Performed fine-tuning workflows to enhance model accuracy", "Validated models against client quality benchmarks"]'::jsonb,
   2)
ON CONFLICT DO NOTHING;

-- Seed achievements
INSERT INTO achievements (title, event, date, description, achievement_type, order_index) VALUES
  ('Winner — Hack''24', 'IIIT Delhi Hackathon 2024', 'Aug 2024', 'Won a 24-hour hackathon at IIIT Delhi, showcasing innovative problem-solving and technical skills.', 'hackathon', 1),
  ('Selected for Screening — SIH 2024', 'Smart India Hackathon 2024', 'Sept 2024', 'Advanced to screening stage for national-level Smart India Hackathon. Built ML-based solution during internal hackathon.', 'hackathon', 2),
  ('Competitor — Hack-Wars', 'Chandigarh University Hackathon 2024', 'Sept 2024', 'Competed in a 36-hour hackathon at Chandigarh University, Punjab. Showcased innovative problem-solving.', 'hackathon', 3),
  ('Finalist — TechSprint (Top 7)', 'National Level Hackathon, Graphic Era University', 'May 2025', 'Ranked among top 7 teams in a 48-hour national-level hackathon with an ML-powered Smart Bin IoT project for smart waste management.', 'hackathon', 4)
ON CONFLICT DO NOTHING;

-- Seed site settings
INSERT INTO site_settings (key, value) VALUES
  ('site_title', 'SHIVAM JOSHI — AI Engineer'),
  ('tagline', 'GenAI Developer • AI Engineer • Problem Solver'),
  ('hero_subtitle', 'Building intelligent systems that think, reason, and deliver.'),
  ('resume_url', ''),
  ('avatar_greeting', 'Welcome to my command center. I''m ARIA, Shivam''s AI assistant. What''s your name, soldier?')
ON CONFLICT (key) DO NOTHING;
