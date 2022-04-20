import { Paper } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SelectColour } from ".";

export default {
  title: "Components/SelectColour",
  component: SelectColour,
  decorators: [
    (Story) => (
      <Paper sx={{ padding: 2 }}>
        <Story />
      </Paper>
    ),
  ],
  parameters: {
    controls: {
      include: ["value", "disabled"],
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
} as ComponentMeta<typeof SelectColour>;

const Template: ComponentStory<typeof SelectColour> = (args) => (
  <SelectColour {...args} />
);

export const Value = Template.bind({});
Value.args = {
  value: "gold",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: "blue",
  disabled: true,
};
