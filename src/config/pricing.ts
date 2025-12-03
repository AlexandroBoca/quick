export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  priceId: string;
  features: string[];
  popular?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals and small projects getting started',
    price: '$9',
    period: '/month',
    priceId: process.env.NEXT_PUBLIC_PADDLE_STARTER_PRICE_ID || 'pri_01h8x8x8x8x8x8x8x8x8x8x8x',
    features: [
      '5 Projects',
      '10GB Storage',
      'Basic Support',
      'Analytics Dashboard',
      'API Access'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for growing businesses and teams that need more power',
    price: '$29',
    period: '/month',
    priceId: process.env.NEXT_PUBLIC_PADDLE_PROFESSIONAL_PRICE_ID || 'pri_01h8x9x9x9x9x9x9x9x9x9x9x',
    features: [
      'Unlimited Projects',
      '100GB Storage',
      'Priority Support',
      'Advanced Analytics',
      'API Access',
      'Custom Domain',
      'Team Collaboration (5 users)'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Tailored solutions for large organizations with custom needs',
    price: 'Custom',
    period: '',
    priceId: process.env.NEXT_PUBLIC_PADDLE_ENTERPRISE_PRICE_ID || 'pri_01h8xaxaxaxaxaxaxaxaxaxaxa',
    features: [
      'Unlimited Everything',
      'Unlimited Storage',
      'Dedicated Support',
      'Custom Analytics',
      'Advanced API Access',
      'Custom Domain',
      'Unlimited Team Members',
      'White Label Option',
      'Dedicated Account Manager',
      'SLA Guarantee'
    ]
  }
];
