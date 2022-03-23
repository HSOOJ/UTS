import { Meta, Story } from "@storybook/react";
import DropDown from "./DropDown";
import { IDropDown } from "./DropDown.types";
import DropDownItem from "./dropDownItem/DropDownItem";

const meta: Meta = {
  title: "Containers/DropDown",
  component: DropDown,
};

const DropDowns = [1, 2, 3, 4];

export default meta;

const Template: Story<IDropDown> = (args) => (
  <DropDown {...args}>
    {DropDowns.map((num) => (
      <DropDownItem {...args}>Item {num}</DropDownItem>
    ))}
  </DropDown>
);

export const Example = Template.bind({});
