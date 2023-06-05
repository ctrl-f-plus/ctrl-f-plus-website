import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'Features', href: '#' },
  { name: 'How to Use', href: '#' },
  { name: 'About', href: '#' },
  { name: 'FAQ', href: '#' },
];

export const features = [
  {
    name: 'Push to deploy',
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates',
    description:
      'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple queues',
    description:
      'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced security',
    description:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: FingerPrintIcon,
  },
];

export const tiers = [
  {
    name: 'Freelancer',
    id: 'tier-freelancer',
    href: '#',
    priceMonthly: '$24',
    description: 'The essentials to provide your best work for clients.',
    features: [
      '5 products',
      'Up to 1,000 subscribers',
      'Basic analytics',
      '48-hour support response time',
    ],
    mostPopular: false,
  },
  {
    name: 'Startup',
    id: 'tier-startup',
    href: '#',
    priceMonthly: '$32',
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      '24-hour support response time',
      'Marketing automations',
    ],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$48',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      '1-hour, dedicated support response time',
      'Marketing automations',
    ],
    mostPopular: false,
  },
];

export const faqs = [
  {
    id: 0,
    question: 'What makes Ctrl-F Plus the savior of tab hoarders?',
    answer:
      "It lets you search all tabs in your current window, not just the one you're desperately clinging to.",
  },
  {
    id: 1,
    question: 'Does Ctrl-F Plus judge me for having too many tabs open?',
    answer:
      'Absolutely not! In fact, Ctrl-F Plus thrives on your tab hoarding tendencies. The more tabs you have open, the more Ctrl-F Plus can flex its search skills.',
  },
  {
    id: 2,
    question: 'How does Ctrl-F Plus work with incognito tabs?',
    answer:
      'Ctrl-F Plus respects your privacy as much as you do. It does not search within incognito tabs, keeping your incognito browsing truly incognito.',
  },
  {
    id: 3,
    question: 'Can I use Ctrl-F Plus on different browsers?',
    answer:
      "For now, Ctrl-F Plus is exclusively a Chrome extension. We're working on expanding to other browsers, so stay tuned.",
  },
  {
    id: 4,
    question: 'Will Ctrl-F Plus slow down my browser?',
    answer:
      "Ctrl-F Plus is like a ninja - quick, efficient, and unnoticeable until it's needed. It's designed to be lightweight and won't slow down your browser.",
  },
  {
    id: 5,
    question: 'Is Ctrl-F Plus free?',
    answer:
      "Yes, Ctrl-F Plus is free to install and use. It's our gift to all the tab hoarders out there.",
  },
  {
    id: 6,
    question: 'How do I update Ctrl-F Plus?',
    answer:
      "Ctrl-F Plus updates are handled automatically through the Chrome Web Store. You can ensure you're using the latest version by keeping your Chrome browser up to date.",
  },
  {
    id: 7,
    question: 'Is Ctrl-F Plus free?',
    answer:
      "Yes, Ctrl-F Plus is free to install and use. It's our gift to all the tab hoarders out there.",
  },
  {
    id: 7,
    question: 'I love Ctrl-F Plus! How can I support its development?',
    answer:
      "We're thrilled that you're enjoying Ctrl-F Plus! Stay tuned for ways to support our work, and in the meantime, tell your friends about us!",
  },
  // More questions...
];

export const footerNavigation = {
  solutions: [
    { name: 'Hosting', href: '#' },
    { name: 'Data Services', href: '#' },
    { name: 'Uptime Monitoring', href: '#' },
    { name: 'Enterprise Services', href: '#' },
  ],
  support: [
    { name: 'Pricing', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'API Reference', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  legal: [
    { name: 'Claim', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
};
