import 'next-auth';
import { DefaultSession } from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: {
      dbId: number;
    } & DefaultSession['user'];
  }

  interface User extends DefaultSession['user'] {
    dbId?: number; // Use the appropriate type for your dbId
  }
}

export type NextAuthUser = User;
