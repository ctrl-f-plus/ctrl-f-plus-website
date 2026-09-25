// src/components/feature-cards.tsx
'use client';

import CardShell from './ui/card-shell';
import Container from './ui/container';
import { FadeIn } from './fade-in';
import Button from '@/components/ui/Button';

const pricingTiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '#',
    price: { monthly: '$19', annually: '$199' },
    description: 'The essentials to provide your best work for clients.',
    features: [
      '5 products',
      'Up to 1,000 subscribers',
      'Basic analytics',
      '48-hour support response time',
    ],
    featured: false,
    cta: 'Buy plan',
  },
  {
    name: 'Pro',
    id: 'tier-Pro',
    href: '#',
    price: { monthly: '$19', annually: '$199' },
    description: 'The essentials to provide your best work for clients.',
    features: [
      '5 products',
      'Up to 1,000 subscribers',
      'Basic analytics',
      '48-hour support response time',
    ],
    featured: false,
    cta: 'Buy plan',
  },
  {
    name: 'Lifetime',
    id: 'tier-Lifetime',
    href: '#',
    price: { monthly: '$19', annually: '$199' },
    description: 'The essentials to provide your best work for clients.',
    features: [
      '5 products',
      'Up to 1,000 subscribers',
      'Basic analytics',
      '48-hour support response time',
    ],
    featured: false,
    cta: 'Buy plan',
  },
];

export default function PricingCards() {
  return (
    <FadeIn className="">
      <Container className="relative mt-18 flex w-full flex-col tablet:mt-24 wide:mt-[7.625rem]">
        <div className="laptop:text-left">
          <CardShell
            variant="inverted"
            shadow="xl"
            className="relative isolate h-[32.8125rem] overflow-hidden px-[2.25rem] text-center"
          >
            <div className="flex w-fit flex-col items-center justify-center gap-9">
              <h2>Pricing Section</h2>
              <div>Subtitle</div>
              {/* Pricing Tier Cards */}
              <div>
                {/* Tier 1 */}
                <div className="rounded-xl border p-2">
                  <h3>Pro</h3>
                  <p>$2.99 / Month</p>
                  <p>
                    The perfect plan if you're just getting started with our
                    product.
                  </p>

                  <Button target="_blank">Try Now</Button>
                </div>
              </div>
            </div>
          </CardShell>
        </div>
      </Container>
    </FadeIn>
  );
}
