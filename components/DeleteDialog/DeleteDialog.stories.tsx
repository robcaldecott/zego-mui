import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DeleteDialog } from ".";

export default {
  title: "Components/DeleteDialog",
  component: DeleteDialog,
} as ComponentMeta<typeof DeleteDialog>;

const Template: ComponentStory<typeof DeleteDialog> = (args) => (
  <DeleteDialog {...args} />
);

export const Open = Template.bind({});
Open.args = {
  open: true,
};
