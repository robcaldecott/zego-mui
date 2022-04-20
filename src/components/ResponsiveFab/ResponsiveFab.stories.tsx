import { Star } from "@mui/icons-material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ResponsiveFab } from ".";

export default {
  title: "Components/ResponsiveFab",
  component: ResponsiveFab,
  args: {
    icon: Star,
  },
  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof ResponsiveFab>;

const Template: ComponentStory<typeof ResponsiveFab> = (args) => (
  <ResponsiveFab {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Responsive",
};
