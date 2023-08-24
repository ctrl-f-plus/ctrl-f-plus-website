// app/lib/utils.ts

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const targetDate = new Date(date);

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return `${fullDate} `;
}

export function getDocument(allDocumentations, slug: string) {
  return allDocumentations.find((doc) => doc.slug === slug);
}
