import { Meta, Story } from "@storybook/react";
import { Button } from "./Button";
import { IButton } from "./Button.types";

const meta: Meta = {
  title: "Containers/Button",
  component: Button,
};

export default meta;

const Template: Story<IButton> = (args) => <Button {...args}>Mint</Button>;

export const Primary = Template.bind({});
