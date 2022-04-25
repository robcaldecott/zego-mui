import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LicencePlate } from ".";

export default {
  title: "Components/LicencePlate",
  component: LicencePlate,
} as ComponentMeta<typeof LicencePlate>;

const Template: ComponentStory<typeof LicencePlate> = (args) => (
  <LicencePlate {...args} />
);

export const UK = Template.bind({});
UK.args = {
  children: "ZE22 ABC",
};
