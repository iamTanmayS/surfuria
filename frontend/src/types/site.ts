export interface FooterLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: 'instagram' | 'linkedin' | 'facebook' | 'youtube' | 'x';
  href: string;
  label: string;
}

export interface SiteMeta {
  name: string;
  tagline: string;
  description: string;
  established: number;
}

