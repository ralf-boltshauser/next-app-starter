'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    router.back();
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={handleOpenChange}>
      <DialogContent className="items-start justify-center sm:max-w-[425px] md:max-w-6xl">
        {children}
      </DialogContent>
    </Dialog>
  );
}
