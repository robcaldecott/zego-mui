import { Star } from "@mui/icons-material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BreadcrumbItem } from ".";

export default {
  title: "Components/BreadcrumbItem",
  component: BreadcrumbItem,
} as ComponentMeta<typeof BreadcrumbItem>;

const Template: ComponentStory<typeof BreadcrumbItem> = (args) => (
  <BreadcrumbItem {...args} />
);

export const Label = Template.bind({});
Label.args = {
  icon: Star,
  label: "Label",
};

export const Link = Template.bind({});
Link.args = {
  icon: Star,
  label: "Link",
  to: "/",
};
