import { Box, Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NavDrawer } from ".";

export default {
  title: "Components/NavDrawer",
  component: NavDrawer,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof NavDrawer>;

const Template: ComponentStory<typeof NavDrawer> = (args) => (
  <NavDrawer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  toolbar: true,
};

export const Content: ComponentStory<typeof NavDrawer> = (args) => (
  <Box sx={{ display: "flex" }}>
    <NavDrawer sx={{ flexShrink: 0 }} {...args} />
    <Box sx={{ p: 4, flexGrow: 1 }}>
      <Typography variant="h3">Content</Typography>
    </Box>
  </Box>
);
Content.args = {
  toolbar: true,
};
