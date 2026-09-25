// src/components/ui/card-shell.tsx

import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'cva';
import { cva } from '../../../cva.config';

// Height, padding and overflow differ per card, so callers own them.
const cardShellVariants = cva({
  base: 'flex items-center justify-center rounded-[2.25rem]',
  variants: {
    variant: {
      default: 'bg-white',
      inverted: 'bg-shark',
    },
    shadow: {
      none: '',
      xl: 'shadow-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    shadow: 'none',
  },
});

type CardShellProps = VariantProps<typeof cardShellVariants> &
  ComponentPropsWithoutRef<'div'>;

export default function CardShell({
  variant,
  shadow,
  className,
  ...divProps
}: Readonly<CardShellProps>) {
  return (
    <div
      className={cardShellVariants({ variant, shadow, className })}
      {...divProps}
    />
  );
}

export { cardShellVariants };
