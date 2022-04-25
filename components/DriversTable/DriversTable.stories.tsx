import { ComponentMeta, ComponentStory } from "@storybook/react";
import { drivers } from "@/mocks/data";
import { DriversTable } from ".";

export default {
  title: "Components/DriversTable",
  component: DriversTable,
} as ComponentMeta<typeof DriversTable>;

const Template: ComponentStory<typeof DriversTable> = (args) => (
  <DriversTable {...args} />
);

export const Data = Template.bind({});
Data.args = {
  drivers,
};
