// ============================================
// SHIVAM JOSHI PORTFOLIO — Type Definitions
// ============================================

export interface Visitor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  purpose?: string;
  message?: string;
  ip_address?: string;
  user_agent?: string;
  country?: string;
  city?: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description?: string;
  category: 'major' | 'mini' | 'freelance' | 'invented' | 'client_demand';
  tech_stack: TechItem[];
  github_url?: string;
  live_url?: string;
  video_url?: string;
  thumbnail_url?: string;
  featured: boolean;
  order_index: number;
  status: 'published' | 'draft' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface TechItem {
  name: string;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon_name?: string;
  proficiency: number;
  order_index: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string;
  start_date: string;
  end_date?: string; // null = Present
  description: string;
  highlights: string[];
  tech_used: string[];
  order_index: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  start_year?: number;
  end_year?: number;
  grade?: string;
  description?: string;
  order_index: number;
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  date?: string;
  description: string;
  achievement_type: 'hackathon' | 'award' | 'certification' | 'publication' | 'other';
  order_index: number;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
}

export interface AnalyticsEvent {
  id: string;
  event_type: string;
  page?: string;
  metadata?: Record<string, any>;
  visitor_id?: string;
  created_at: string;
}

// Category labels for display
export const PROJECT_CATEGORIES: Record<Project['category'], string> = {
  major: 'MAJOR PROJECT',
  mini: 'MINI PROJECT',
  freelance: 'FREELANCE',
  invented: 'SELF-INVENTED',
  client_demand: 'CLIENT DEMAND',
};

export const CATEGORY_COLORS: Record<Project['category'], string> = {
  major: 'text-tactical-400 border-tactical-600',
  mini: 'text-hud-400 border-hud-600',
  freelance: 'text-command-400 border-command-600',
  invented: 'text-purple-400 border-purple-600',
  client_demand: 'text-alert-400 border-alert-600',
};
