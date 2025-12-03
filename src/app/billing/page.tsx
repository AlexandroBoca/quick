import { Button } from '@/components/Button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/Card';
import { PaddleButton } from '@/components/PaddleButton';
import { paddleConfig } from '@/config/paddle';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const plans = [
  {
    name: 'Starter',
    price: '$9',
    period: '/month',
    description: 'Perfect for individuals and small projects',
    features: [
      '5 Projects',
      '10GB Storage',
      'Basic Support',
      'Analytics Dashboard',
      'API Access'
    ],
    notIncluded: [
      'Custom Domain',
      'Priority Support',
      'Advanced Analytics',
      'Team Collaboration'
    ],
    popular: false,
    cta: 'Get Started'
  },
  {
    name: 'Professional',
    price: '$29',
    period: '/month',
    description: 'Ideal for growing businesses and teams',
    features: [
      'Unlimited Projects',
      '100GB Storage',
      'Priority Support',
      'Advanced Analytics',
      'API Access',
      'Custom Domain',
      'Team Collaboration (5 users)'
    ],
    notIncluded: [
      'White Label',
      'Dedicated Account Manager'
    ],
    popular: true,
    cta: 'Start Free Trial'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organizations',
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
    ],
    notIncluded: [],
    popular: false,
    cta: 'Contact Sales'
  }
];

const faqs = [
  {
    question: 'Can I change my plan later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, we offer a 14-day free trial for all paid plans. No credit card required.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. You can cancel your subscription at any time with no cancellation fees.'
  }
];

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. Start free and scale as you grow.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="text-sm text-gray-500">Monthly</span>
            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
            </div>
            <span className="text-sm text-gray-500">Annual (Save 20%)</span>
          </div>
        </header>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'border-blue-500 border-2 scale-105' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <StarIcon />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckIcon />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 opacity-50">
                    <XIcon />
                    <span className="text-gray-500">{feature}</span>
                  </div>
                ))}
              </CardContent>
              
              <CardFooter>
                <PaddleButton 
                  priceId={
                    plan.name === 'Starter' ? paddleConfig.priceIds.starter :
                    plan.name === 'Professional' ? paddleConfig.priceIds.professional :
                    paddleConfig.priceIds.enterprise
                  }
                  planName={plan.name}
                  variant={plan.popular ? "primary" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </PaddleButton>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Compare Features
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center p-4 font-semibold text-gray-900">Starter</th>
                    <th className="text-center p-4 font-semibold text-blue-600">Professional</th>
                    <th className="text-center p-4 font-semibold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 text-gray-700">Projects</td>
                    <td className="p-4 text-center">5</td>
                    <td className="p-4 text-center font-medium">Unlimited</td>
                    <td className="p-4 text-center font-medium">Unlimited</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 text-gray-700">Storage</td>
                    <td className="p-4 text-center">10GB</td>
                    <td className="p-4 text-center font-medium">100GB</td>
                    <td className="p-4 text-center font-medium">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 text-gray-700">Team Members</td>
                    <td className="p-4 text-center">1</td>
                    <td className="p-4 text-center font-medium">5</td>
                    <td className="p-4 text-center font-medium">Unlimited</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 text-gray-700">Support</td>
                    <td className="p-4 text-center">Basic</td>
                    <td className="p-4 text-center font-medium">Priority</td>
                    <td className="p-4 text-center font-medium">Dedicated</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 text-gray-700">API Access</td>
                    <td className="p-4 text-center">
                      <CheckIcon />
                    </td>
                    <td className="p-4 text-center">
                      <CheckIcon />
                    </td>
                    <td className="p-4 text-center">
                      <CheckIcon />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 text-gray-700">Custom Domain</td>
                    <td className="p-4 text-center">
                      <XIcon />
                    </td>
                    <td className="p-4 text-center">
                      <CheckIcon />
                    </td>
                    <td className="p-4 text-center">
                      <CheckIcon />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PaddleButton 
              priceId={paddleConfig.priceIds.professional}
              planName="Professional"
              variant="primary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Start Free Trial
            </PaddleButton>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
