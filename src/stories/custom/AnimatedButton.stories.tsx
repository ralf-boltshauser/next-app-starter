// components/ui/MyButton.stories.tsx

import { AnimatedButton } from '@/components/ui/animated-button';
import { Meta } from '@storybook/react';
import { Button, ButtonProps } from '../../components/ui/button';

export default {
  title: 'UI/Custom/AnimatedButton',
  component: Button,
} as Meta;

export const Default = (args: ButtonProps) => (
  <AnimatedButton {...args}>Default</AnimatedButton>
);
