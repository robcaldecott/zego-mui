import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PageHeader } from ".";

export default {
  title: "Components/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof PageHeader>;

const Template: ComponentStory<typeof PageHeader> = (args) => (
  <PageHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Fleets",
};
