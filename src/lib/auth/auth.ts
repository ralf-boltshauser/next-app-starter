import { prisma } from '@/lib/client';
import { User as PrismaUser } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { getServerSession, NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation';
import { Tiers } from '../access/access';
import { sendMail } from '../mail/mail';
import { fromMail, MailTemplates } from '../mail/mail-types';

export const config = {
  maxDuration: 300,
};
export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        confirmPassword: { label: 'Confirm Password', type: 'password' },
      },
      async authorize(user: any, req: any) {
        try {
          if (!user.email) {
            return false;
          }

          const dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          let userId = dbUser?.id;

          if (dbUser && dbUser.password) {
            // user already exists validate password
            const match = await bcrypt.compare(user.password, dbUser.password);
            if (!match) {
              throw new Error('Wrong password.');
            }
          } else if (
            user.name &&
            user.email &&
            user.password &&
            user.confirmPassword
          ) {
            const passwordMatches = user.password === user.confirmPassword;

            if (!passwordMatches) {
              throw new Error('Passwords do not match.');
            }

            const hash = await bcrypt.hash(user.password, 10);

            const userResponse = await upsertUser(user, hash);
            await sendMail({
              to: user.email,
              from: fromMail,
              subject: 'Welcome!',
              templateId: MailTemplates.Welcome,
              dynamicTemplateData: { name: user.name },
            });

            userId = userResponse.id;
          } else {
            throw new Error('User not found.');
          }

          // TODO if you need to add more properties to the token you can do it here
          user.dbId = userId;
          return user;
        } catch (error) {
          throw new Error('Failed to authorize user');
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account && account.provider === 'google') {
          const userResponse = await upsertUser(user, undefined);

          // TODO if you need to add more properties to the token you can do it here
          user.dbId = userResponse.id;
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        // TODO if you need to add more properties to the token you can do it here
        token.dbId = user?.dbId;
      }

      return token;
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      if (session?.user) {
        // TODO if you need to add more properties to the token you can do it here
        session.user.dbId = token.dbId;
      }
      return session;
    },
  },
};

async function upsertUser(user: any, password: string | undefined) {
  const userResponse = await prisma.user.upsert({
    where: { email: user.email! },
    update: {
      name: user.name!,
      email: user.email!,
    },
    create: {
      name: user.name!,
      email: user.email!,
      password,
    },
  });

  return userResponse;
}

export async function getSessionUser(): Promise<User & { email: string }> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    redirect('/auth/sign-in');
  }

  return session.user as User & { email: string };
}

export async function getDatabaseUser(): Promise<PrismaUser> {
  const sessionUser = await getSessionUser();

  const user = await prisma.user.findUnique({
    where: { email: sessionUser.email },
    include: {
      stripeCustomer: true,
    },
  });
  if (!user) {
    redirect('/auth/sign-in');
  }
  return user as PrismaUser;
}

export async function getUserTier(): Promise<Tiers | undefined> {
  const user = await getSessionUser();
  const res = await prisma.user.findUnique({
    where: { id: user.dbId },
    include: {
      stripeCustomer: {
        include: {
          tier: true,
        },
      },
    },
  });

  const tierId = res?.stripeCustomer?.tier.id;

  if (!tierId) {
    return undefined;
  }

  return Object.values(Tiers).find((tier) => tier === tierId) as
    | Tiers
    | undefined;
}
