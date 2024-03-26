import { useEffect, useState } from 'react';

import { SubmitButton } from '@/components/ui/submit-button';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SubmitButton> = {
  title: 'UI/Custom/SubmitButton',
  component: SubmitButton,
  argTypes: {
    isPending: {
      control: 'boolean',
    },
    spinner: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SubmitButton>;

/*
 * Example Button story with React Hooks.
 * See note below related to this example.
 */
const ButtonWithHooks = ({ isPending, spinner }: any) => {
  // Sets the hooks for both the label and primary props
  const [pending, setIsPending] = useState(isPending);
  const [hasSpinner, setHasSpinner] = useState(spinner);

  // Sets a click handler to change the label's value
  const handleOnChange = () => {
    if (!pending) {
      setIsPending(true);
      setTimeout(() => {
        setIsPending(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setIsPending(isPending);
  }, [isPending]);

  useEffect(() => {
    setHasSpinner(spinner);
  }, [spinner]);

  return (
    <SubmitButton
      isPending={pending}
      spinner={hasSpinner}
      onClick={handleOnChange}
    >
      Submit
    </SubmitButton>
  );
};

export const Primary: Story = {
  render: (args) => <ButtonWithHooks {...args} />,
};
