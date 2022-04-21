import { action } from "@storybook/addon-actions";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Login } from ".";

export default {
  title: "Components/Login",
  component: Login,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const Default = Template.bind({});
Default.args = {
  onLogin: action("onLogin"),
};
