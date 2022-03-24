import { Meta, Story } from "@storybook/react";

import { Icon } from "./Icon";
import IIcon from "./Icon.types";

const meta: Meta = {
  title: "Foundation/Icons",
  component: Icon,
};

export const Sample: Story<IIcon> = (args) => <Icon {...args} />;

export default meta;
