import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Login } from "./Login";

export default {
  title: "Components/Login",
  component: Login,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login />;

export const Default = Template.bind({});
