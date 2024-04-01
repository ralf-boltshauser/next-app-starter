import { getDatabaseUser } from '@/lib/auth';
import DeleteAccountComponent from './DeleteAccountComponent';

import { ProfileForm } from './ProfileFormComponent';

export default async function ProfilePage() {
  const user = await getDatabaseUser();

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">{user.name.split(' ')[0]}&apos;s Profile</h2>
        <p className="text-xs text-muted-foreground">
          Last change: {user.updatedAt.toLocaleDateString()}
        </p>
      </div>
      <ProfileForm user={user} />
      <DeleteAccountComponent />
    </>
  );
}
