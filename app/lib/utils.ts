// app/lib/utils.ts

export function formatDate(date: string) {
  const targetDate = new Date(date);

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return `${fullDate} `;
}

export function getDocument(allDocumentations: any[], slug: string) {
  return allDocumentations.find((doc) => doc.slug === slug);
}
