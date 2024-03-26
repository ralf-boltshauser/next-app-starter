'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useFormStatus } from 'react-dom';
import { AnimatedButton } from './animated-button';
import { ButtonProps } from './button';

const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { isPending?: boolean; spinner?: boolean }
>(({ isPending = false, spinner = true, ...props }, ref) => {
  const { pending } = useFormStatus();

  const buttonPending = pending || isPending;

  return (
    <AnimatedButton
      ref={ref}
      type="submit"
      aria-disabled={buttonPending}
      disabled={buttonPending}
      {...props}
      className="flex gap-2 items-center"
    >
      <AnimatePresence mode="popLayout">
        {buttonPending && spinner ? (
          <motion.div
            key={'spinner'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.1 }}
            className="border-gray-300 w-4 h-4 animate-spin rounded-full border-2 border-t-gray-600"
          />
        ) : null}
      </AnimatePresence>
      <motion.span transition={{ duration: 0.2, ease: 'easeInOut' }} layout>
        {props.children}
      </motion.span>
    </AnimatedButton>
  );
});
SubmitButton.displayName = 'SubmitButton';

export { SubmitButton };
