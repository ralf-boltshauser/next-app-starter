// components/ui/MyButton.stories.tsx

import { PlusIcon } from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';
import { Button, ButtonProps } from '../components/ui/button';

export default {
  title: 'UI/MyButton',
  component: Button,
} as Meta;

export const Default = (args: ButtonProps) => (
  <Button {...args}>Default</Button>
);

export const Destructive = () => (
  <Button variant="destructive">Destructive</Button>
);

export const WithIcon = () => (
  <Button variant="outline" size="icon">
    <PlusIcon />
  </Button>
);
