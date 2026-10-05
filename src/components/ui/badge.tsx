// ctrl-f-plus-website/src/components/ui/badge.tsx

import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'cva';
import { cva, cx } from '../../../cva.config';

const badgeVariants = cva({
  base: 'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
  variants: {
    variant: {
      neutral: 'bg-gray-50 text-gray-600 ring-gray-500/10',
      danger: 'bg-red-50 text-red-700 ring-red-600/10',
      warning: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
      success: 'bg-green-50 text-green-700 ring-green-600/20',
      info: 'bg-blue-50 text-blue-700 ring-blue-700/10',
      primary: 'bg-indigo-50 text-indigo-700 ring-indigo-700/10',
      secondary: 'bg-purple-50 text-purple-700 ring-purple-700/10',
      accent: 'bg-pink-50 text-pink-700 ring-pink-700/10',
      // ---
      brand1:
        'bg-highlighter-50/20 text-highlighter-900 ring-highlighter-900/10',
      brand2:
        'bg-highlighter-focus-50 text-highlighter-focus-700 ring-highlighter-focus-700/10',
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
});

type BadgeProps = ComponentPropsWithoutRef<'span'> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cx(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}
