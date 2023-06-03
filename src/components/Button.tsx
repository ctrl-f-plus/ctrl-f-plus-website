'use client';
import { useCallback } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
  // onClick?: () => void;
  className: string;
  url: string;
};

function Button({ children, url, className }: ButtonProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      window.open(url, '_blank');
    },
    [url]
  );

  className = clsx(
    // baseStyles[variant],
    // variantStyles[variant][color],
    className
  );

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;
