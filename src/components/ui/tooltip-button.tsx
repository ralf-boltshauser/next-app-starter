'use client';

import React from 'react';
import { AnimatedButton } from './animated-button';
import { Button, ButtonProps } from './button';
import { SubmitButton, SubmitButtonProps } from './submit-button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

type TooltipButtonType = 'normal' | 'animated' | 'submit';

type ConditionalProps<T extends TooltipButtonType> = T extends 'submit'
  ? SubmitButtonProps
  : {};

const TooltipButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    tooltip: string;
    buttonType?: TooltipButtonType;
  } & ConditionalProps<TooltipButtonType>
>(({ buttonType = 'normal', tooltip, ...props }, ref) => {
  const renderButton = (buttonType: 'normal' | 'animated' | 'submit') => {
    switch (buttonType) {
      case 'animated':
        return <AnimatedButton {...props} ref={ref} />;
      case 'submit':
        return <SubmitButton {...props} ref={ref} />;
      default:
        return <Button {...props} ref={ref} />;
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{renderButton(buttonType)}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});
TooltipButton.displayName = 'TooltipButton';

export { TooltipButton };
