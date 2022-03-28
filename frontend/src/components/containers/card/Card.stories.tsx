import { Meta, Story } from "@storybook/react";
import { Card } from "./Card";
import { ICard } from "./Card.types";

const meta: Meta = {
  title: "Containers/Card",
  component: Card,
};

export default meta;

const Template: Story<ICard> = (args) => <Card {...args}></Card>;

export const Example = Template.bind({});
