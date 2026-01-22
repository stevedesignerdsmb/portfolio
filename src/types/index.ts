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
