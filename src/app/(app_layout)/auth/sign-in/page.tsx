'use client';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { SignInForm } from './SignIn-Form';
import { SignUpForm } from './SignUp-Form';
export default function SignInPage() {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl') || '/app';

  const handleSignIn = async (provider: string) => {
    const res = await signIn(provider, {
      callbackUrl: callbackUrl,
    });

    if (res?.error) {
      toast.error(res.error);
    }
  };

  return (
    <Tabs defaultValue={'sign-in-with-provider'}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="sign-in-with-provider">Google</TabsTrigger>
        <TabsTrigger value="sign-in-with-credentials">Sign in</TabsTrigger>
        <TabsTrigger value="sign-up">Sign up</TabsTrigger>
      </TabsList>
      <TabsContent
        value="sign-in-with-provider"
        className="flex flex-col space-y-2"
      >
        <h2 className="text-xl">Sign in with Google!</h2>
        <AnimatedButton
          className="w-fit"
          onClick={() => handleSignIn('google')}
        >
          Sign in with Google
        </AnimatedButton>
      </TabsContent>
      <TabsContent value="sign-in-with-credentials">
        <SignInForm callbackUrl={callbackUrl} />
      </TabsContent>
      <TabsContent value="sign-up">
        <SignUpForm callbackUrl={callbackUrl} />
      </TabsContent>
    </Tabs>
  );
}
