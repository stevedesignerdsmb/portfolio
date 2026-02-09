export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string; // Main image for project detail page
  images?: string[]; // Additional images for project detail page gallery
  folderImages?: string[]; // Images for folder card stack (separate from detail page)
  tags?: string[];
  link?: string;
  platform?: string;
  comingSoon?: boolean;
  featured?: boolean;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  description: string;
  /** Optional: first part of description (text-soft-400). If set, descriptionHighlight should also be set. */
  descriptionLead?: string;
  /** Optional: second part of description (text-sub-600). If set, descriptionLead should also be set. */
  descriptionHighlight?: string;
  icon?: string;
  period?: string;
}

export interface Visual {
  id: string;
  image: string;
  /** "mobile" = portrait (e.g. 576x1250), "desktop" = landscape (e.g. 2203x1250). Defaults to "mobile". */
  type?: 'mobile' | 'desktop';
  title?: string;
  description?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}
