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
    id: 7,
    question: 'I love Ctrl-F Plus! How can I support its development?',
    answer:
      "We're thrilled that you're enjoying Ctrl-F Plus! Stay tuned for ways to support our work, and in the meantime, tell your friends about us!",
  },
];

export default function FAQ() {
  return (
    <>
      {/* FAQs */}
      {/* <div className="bg-white"> */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Have a different question and can’t find the answer you’re looking
            for? Reach out to our support team by{' '}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              sending us an email
            </a>{' '}
            and we’ll get back to you as soon as we can.
          </p>
        </div>
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
