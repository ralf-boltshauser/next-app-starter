import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Skeleton className="h-16 flex-1" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-8" />
      <Skeleton className="h-8 w-16" />
    </div>
  );
}
