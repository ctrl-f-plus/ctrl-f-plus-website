const faqs = [
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

export default function FAQ() {
  return (
    <>
      {/* FAQs */}
      <div className="mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32">
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
          Frequently asked questions
        </h2>
        <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
          {faqs.map((faq) => (
            <div key={faq.id} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">
                {faq.question}
              </dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base leading-7 text-gray-600">
                  {faq.answer}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
