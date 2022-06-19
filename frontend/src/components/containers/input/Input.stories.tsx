import { Meta, Story } from "@storybook/react";
import styled from "styled-components";
import Input from "./Input";
import { IInput } from "./Input.types";

const meta: Meta = {
  title: "Containers/Input",
  component: Input,
};

export default meta;

const Template: Story<IInput> = (args) => (
  <LayOut>
    <Input placeholder={args.type} {...args} />
  </LayOut>
);

export const Default = Template.bind({});
export const Round = Template.bind({});

Default.args = {
  label: "금액 입력",
};

const LayOut = styled.div`
  padding: 0px 10px;
`;
