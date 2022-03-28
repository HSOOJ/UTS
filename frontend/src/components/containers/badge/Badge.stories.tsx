import { Meta, Story } from "@storybook/react";
import { Badge } from "./Badge";
import { IBadge } from "./Badge.types";

const meta: Meta = {
  title: "Containers/Badge",
  component: Badge,
};

export default meta;

const Template: Story<IBadge> = (args) => <Badge {...args}></Badge>;

export const Example = Template.bind({});
