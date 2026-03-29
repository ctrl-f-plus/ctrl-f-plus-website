// app/components/quick-view.tsx
'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
const QuickViewModal = dynamic(() => import('./quick-view-modal'));
const Button = dynamic(() => import('./ui/Button'));

export default function QuickView() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        intent="outline"
        size="thin"
        icon="play"
        animation="slice"
        onClick={() => setIsOpen(true)}
        aTag={false}
        target={''}
        button={true}
        className="cursor-pointer"
      >
        See how it works
      </Button>

      {isOpen && <QuickViewModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}
