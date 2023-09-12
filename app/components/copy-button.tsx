// app/components/copy-button.tsx
'use client';

import { useState } from 'react';

// @ts-ignore
const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 10000);
  };

  return (
    <button disabled={isCopied} onClick={copy}>
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CopyButton;
