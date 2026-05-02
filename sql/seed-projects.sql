-- ============================================
-- SEED PROJECTS — Admin Dashboard mein dikhenge
-- Supabase SQL Editor mein yeh run karo
-- ============================================

-- Pehle purane projects hata do (agar hain)
DELETE FROM projects WHERE slug IN ('geocoding-pipeline', 'fire-hazard-analysis', 'terrain-analysis', 'safartravels');

-- Ab 4 projects insert karo
INSERT INTO projects (title, slug, description, long_description, category, tech_stack, github_url, live_url, video_url, featured, order_index, status) VALUES

(
  'AI-Powered Geocoding Pipeline',
  'geocoding-pipeline',
  'Multi-agent geocoding system for US addresses with confidence scoring, waterfall architecture, and bulk-processing capabilities.',
  'An intelligent multi-agent geocoding pipeline that automates US address resolution using a waterfall architecture across multiple geocoding providers. Features confidence scoring, multi-tier accuracy levels, and LLM-powered address reconstruction for edge cases. Built for enterprise-scale address datasets with validation and fuzzy matching.',
  'major',
  '[{"name":"Python","icon":"python"},{"name":"LangChain","icon":"langchain"},{"name":"Nominatim","icon":"nominatim"},{"name":"ESRI","icon":"esri"},{"name":"Census API","icon":"census"},{"name":"rapidfuzz","icon":"rapidfuzz"},{"name":"usaddress","icon":"usaddress"},{"name":"LLM","icon":"llm"},{"name":"REST APIs","icon":"restapi"}]'::jsonb,
  '',
  '',
  '',
  true,
  1,
  'published'
),

(
  'Fire Hazard Analysis System',
  'fire-hazard-analysis',
  'Flask-based fire risk intelligence platform integrating satellite imagery, AI segmentation, terrain analysis, and LLM-powered risk inference.',
  'A comprehensive fire hazard analysis application that stitches satellite tiles from ESRI, performs AI semantic segmentation using SegFormer, computes terrain metrics from elevation data, fetches real-time weather conditions, and uses Gemini LLM for contextual risk inference. Designed with insurance industry applications in mind.',
  'major',
  '[{"name":"Python","icon":"python"},{"name":"Flask","icon":"flask"},{"name":"SegFormer","icon":"segformer"},{"name":"ESRI Tiles","icon":"esri"},{"name":"OpenTopography","icon":"topo"},{"name":"WeatherAPI","icon":"weather"},{"name":"Gemini LLM","icon":"gemini"},{"name":"Leaflet","icon":"leaflet"},{"name":"Bootstrap","icon":"bootstrap"}]'::jsonb,
  '',
  '',
  '',
  true,
  2,
  'published'
),

(
  'Terrain Analysis Tool',
  'terrain-analysis',
  'Elevation and terrain metrics tool using COP30 DEM data with 12 computed terrain parameters for geospatial intelligence.',
  'A terrain analysis tool that computes 12 different terrain metrics (slope, aspect, curvature, roughness, etc.) from COP30 DEM data via OpenTopography API. Built with a clean architectural pattern, designed for production deployment with a single public entry-point function returning structured JSON output.',
  'mini',
  '[{"name":"Python","icon":"python"},{"name":"OpenTopography API","icon":"topo"},{"name":"COP30 DEM","icon":"dem"},{"name":"NumPy","icon":"numpy"},{"name":"REST APIs","icon":"restapi"},{"name":"JSON","icon":"json"}]'::jsonb,
  '',
  '',
  '',
  false,
  3,
  'published'
),

(
  'Tourist Cab Booking Platform',
  'safartravels',
  'Travel booking platform connecting tourists with local cab drivers in Uttarakhand — full technical blueprint with payment integration.',
  'A travel booking platform concept designed for the Uttarakhand tourist season, connecting tourists with local cab drivers in Haldwani. Complete technical blueprint built with Next.js 14, Supabase backend, Razorpay for payments, Vercel hosting, n8n automation workflows, and Twilio WhatsApp API for driver communications.',
  'invented',
  '[{"name":"Next.js 14","icon":"nextjs"},{"name":"Supabase","icon":"supabase"},{"name":"Razorpay","icon":"razorpay"},{"name":"Vercel","icon":"vercel"},{"name":"n8n","icon":"n8n"},{"name":"Twilio WhatsApp API","icon":"twilio"},{"name":"React","icon":"react"},{"name":"TypeScript","icon":"typescript"}]'::jsonb,
  '',
  '',
  '',
  false,
  4,
  'published'
);

SELECT 'All 4 projects seeded! Check admin dashboard.' AS status;