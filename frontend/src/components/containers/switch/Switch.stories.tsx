import { Meta, Story } from "@storybook/react";
import styled from "styled-components";
import { Switch } from "./Switch";
import { ISwitch } from "./Switch.types";

const meta: Meta = {
  title: "Containers/Switch",
  component: Switch,
};

export default meta;

const Template: Story<ISwitch> = (args) => (
  <LayOut>
    <Switch {...args} />
  </LayOut>
);

export const Default = Template.bind({});

const LayOut = styled.div`
  padding: 0px 10px;
`;
