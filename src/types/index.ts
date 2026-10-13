export interface ProductItem {
  id: string;
  name: string;
  category: 'streetwear' | 'caps' | 'mugs' | 'corporate';
  categoryLabel: string;
  tag: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  unitPrice?: string;
  wholesaleCondition?: string;
  priceNote: string;
  features: string[];
  minQuantity: string;
  popularFor: string;
  badge?: string;
  colorsAvailable?: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon: string;
}

export interface DifferentialItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat?: string;
  statLabel?: string;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  productType: string;
  quantity: string;
  specifications: string;
  hasFile: boolean;
  fileName?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  companyOrBrand: string;
  comment: string;
  rating: number;
  productPurchased: string;
  avatar: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
