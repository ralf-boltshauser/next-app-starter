import { generateId } from '@/lib/gen-id';
import { cookies } from 'next/headers';
import { PostHog } from 'posthog-node';
import 'server-only';

export async function getBootstrapData() {
  let distinct_id = '';
  const phProjectAPIKey = process.env.NEXT_PUBLIC_POSTHOG_KEY as string;
  const phCookieName = `ph_${phProjectAPIKey}_posthog`;
  const cookieStore = cookies();
  const phCookie = cookieStore.get(phCookieName);

  if (phCookie) {
    const phCookieParsed = JSON.parse(phCookie.value);
    distinct_id = phCookieParsed.distinct_id;
  }
  if (!distinct_id) {
    distinct_id = generateId();
  }

  const client = serverSideAnalytics();
  const flags = await client.getAllFlags(distinct_id);
  const bootstrap = {
    distinctID: distinct_id,
    featureFlags: flags,
  };

  return bootstrap;
}

function serverSideAnalytics() {
  const posthogClient = new PostHog(
    process.env.NEXT_PUBLIC_POSTHOG_KEY as string,
    {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    }
  );

  return posthogClient;
}

const analyticsServerClient = serverSideAnalytics();

export default analyticsServerClient;
