import { getSessionUser } from '@/lib/auth';

export default async function App() {
  const user = await getSessionUser();
  return <h2>App</h2>;
}
