'use client';

import { SubmitButton } from '@/components/ui/submit-button';
import { useState } from 'react';
import { toast } from 'sonner';
import { createPortalSession } from './billingActions';

export default function PortalButton() {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      const { url } = await createPortalSession();

      window.location.href = url;
    } catch (error) {
      toast.error('Failed to create billing portal session:');
    }
  };

  return (
    <SubmitButton
      isPending={loading}
      className="btn btn-primary btn-outline my-3"
      onClick={handleClick}
    >
      Manage Billing
    </SubmitButton>
  );
}
