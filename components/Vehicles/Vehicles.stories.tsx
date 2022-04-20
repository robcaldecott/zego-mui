import { ComponentMeta, ComponentStory } from "@storybook/react";
import { vehicles } from "@/mocks";
import { FilterProvider } from "@/providers";
import { Vehicles } from ".";

export default {
  title: "Components/Vehicles",
  decorators: [
    (Story) => (
      <FilterProvider>
        <Story />
      </FilterProvider>
    ),
  ],
} as ComponentMeta<typeof Vehicles>;

const Template: ComponentStory<typeof Vehicles> = (args) => (
  <Vehicles {...args} />
);

export const Default = Template.bind({});
Default.args = {
  vehicles,
};
