import { Meta, Story } from "@storybook/react";
import styled from "styled-components";
import TextArea from "./TextArea";
import { ITextArea } from "./TextArea.types";

const meta: Meta = {
  title: "Containers/Input",
  component: TextArea,
};

export default meta;

const Template: Story<ITextArea> = (args) => (
  <LayOut>
    <TextArea placeholder={args.type} {...args} />
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
