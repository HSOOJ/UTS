import { Meta, Story } from "@storybook/react";
import styled from "styled-components";
import { ImageInput } from "./ImageInput";
import { IImageInput } from "./ImageInput.types";

const meta: Meta = {
  title: "Containers/ImageInput",
  component: ImageInput,
};

export default meta;

const Template: Story<IImageInput> = (args) => (
  <LayOut>
    <ImageInput {...args} />
  </LayOut>
);

export const Default = Template.bind({});

Default.args = {
  title: "이미지 업로드",
  isDark: false,
};

const LayOut = styled.div`
  padding: 0px 10px;
`;
