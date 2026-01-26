export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  tags?: string[];
  link?: string;
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
  title?: string;
  description?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}
