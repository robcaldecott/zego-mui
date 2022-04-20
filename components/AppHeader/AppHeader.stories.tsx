import { Meta, Story } from "@storybook/react";
import { AppHeader } from ".";

export default {
  title: "Components/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story = () => <AppHeader />;

export const Default = Template.bind({});
