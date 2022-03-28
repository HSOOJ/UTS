import { Meta, Story } from "@storybook/react";
import Image from "./Image";
import { IImage } from "./Image.types";

const meta: Meta = {
  title: "Containers/Image",
  component: Image,
};
export default meta;

const Template: Story<IImage> = (args) => <Image {...args}></Image>;

export const Example = Template.bind({});

Example.args = {
  width: "100px",
  height: "100px",
  shape: "round",
  src: "https://www.blockmedia.co.kr/wp-content/uploads/2021/02/%EC%9D%BC%EB%A1%A0%EB%A8%B8%EC%8A%A4%ED%81%AC_%EC%A0%95%EC%82%AC%EA%B2%A9%ED%98%95.jpg",
};
