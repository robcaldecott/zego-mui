import { ComponentMeta, ComponentStory } from "@storybook/react";
import { vehicles } from "@/mocks/data";
import { VehiclesTable } from ".";

export default {
  title: "Components/VehiclesTable",
  component: VehiclesTable,
} as ComponentMeta<typeof VehiclesTable>;

const Template: ComponentStory<typeof VehiclesTable> = (args) => (
  <VehiclesTable {...args} />
);

export const Data = Template.bind({});
Data.args = {
  fleetId: "123",
  rows: vehicles,
};
