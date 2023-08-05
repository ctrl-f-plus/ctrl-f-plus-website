// app/lib/utils.ts

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
