import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { AnimatedButton } from '../ui/animated-button';
import { Input } from '../ui/input';

export default function CTASection() {
  return (
    <div className="dark mx-5 mt-16 rounded-xl bg-secondary p-5 py-8 text-primary md:py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4">
        <h2 className="text-4xl font-bold">Ready to get started?</h2>
        <p className="text-lg text-muted-foreground">
          Start building your startup today! Get notified when we launch!
        </p>
        <div className="flex gap-2 ">
          <Input
            placeholder="Your email"
            className="border-2 border-primary"
            type="email"
          />
          <AnimatedButton className="flex gap-2">
            <span>Get Started</span>
            <PaperPlaneIcon />
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
