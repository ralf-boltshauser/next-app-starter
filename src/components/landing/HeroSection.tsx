import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { AnimatedButton } from '../ui/animated-button';
import { Input } from '../ui/input';

export default function HeroSection() {
  return (
    <div className="m-5 pt-[15vh] md:mx-auto md:max-w-4xl">
      <h1
        className={`bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent md:text-7xl`}
      >
        Build your startup <br />
        faster than ever before!
      </h1>
      <p className="mt-6 text-lg text-muted-foreground md:text-2xl">
        For solopreneurs who want to develop a SaaS that is ready to sell within
        a week, this is what you need! We provide you with the tools and
        software!
      </p>
      <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-1">
        <p className="text-start text-muted-foreground">
          Enter your email, to get notified when we launch!
        </p>
        <div className="flex gap-2 ">
          <Input placeholder="Your email" />
          <AnimatedButton className="flex gap-2">
            <span>Get Started</span>
            <PaperPlaneIcon />
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
