import { ComponentMeta, ComponentStory } from "@storybook/react";
import { fleets } from "@/mocks";
import { Fleets } from ".";

export default {
  title: "Components/Fleets",
  component: Fleets,
} as ComponentMeta<typeof Fleets>;

const Template: ComponentStory<typeof Fleets> = (args) => <Fleets {...args} />;

export const Default = Template.bind({});
Default.args = {
  fleets,
};
