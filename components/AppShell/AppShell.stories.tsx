import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AppShell } from "./AppShell";

export default {
  title: "Components/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof AppShell>;

const Template: ComponentStory<typeof AppShell> = (args) => (
  <AppShell {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Content",
};
