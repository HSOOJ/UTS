import { Meta, Story } from "@storybook/react";
import DropDownItem from "./DropDownItem";
import { IDropDownItem } from "./DropDownItem.types";

const meta: Meta = {
  title: "Containers/DropDownItem",
  component: DropDownItem,
};

export default meta;

const Template: Story<IDropDownItem> = (args) => (
  <DropDownItem {...args}>Artist</DropDownItem>
);

export const Primary = Template.bind({});
