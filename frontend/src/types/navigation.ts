export interface NavLinkItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownType?: 'hardware' | 'kitchens';
}

export interface MegaCategoryItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  badge?: string;
  features: string[];
}

export interface MegaMenuFeature {
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
  image: string;
}

export interface MegaMenuData {
  featured: MegaMenuFeature;
  categories: MegaCategoryItem[];
  quickLinks: { label: string; href: string }[];
}

