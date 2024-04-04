'use client';
import { H1 } from '@/components/design-system/headings';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  // get query params next app router
  const errorMessage = useSearchParams().get('error');
  return (
    <div>
      <H1>Something went wrong!</H1>
      <p className="my-3">{errorMessage}</p>
      <Button variant="outline" onClick={() => window.history.back()}>
        Back
      </Button>
    </div>
  );
}
