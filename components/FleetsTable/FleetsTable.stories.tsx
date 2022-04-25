import { ComponentMeta, ComponentStory } from "@storybook/react";
import { fleets } from "@/mocks/data";
import { FleetsTable } from ".";

export default {
  title: "Components/FleetsTable",
  component: FleetsTable,
} as ComponentMeta<typeof FleetsTable>;

const Template: ComponentStory<typeof FleetsTable> = (args) => (
  <FleetsTable {...args} />
);

export const Data = Template.bind({});
Data.args = {
  rows: fleets.map((fleet) => ({
    ...fleet,
    manager: fleet.manager.name,
    country: fleet.country.displayName,
  })),
};
