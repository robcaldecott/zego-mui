import { Button, Paper, Stack, Typography } from "@mui/material";
import { Meta, Story } from "@storybook/react";
import { ThemeProvider, useThemeMode } from ".";

export default {
  title: "Providers/ThemeProvider",
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const Default: Story = () => {
  const { mode, toggle } = useThemeMode();
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2} alignItems="flex-start">
        <Typography>Mode: {mode}</Typography>
        <Button variant="contained" onClick={() => toggle()}>
          Toggle
        </Button>
      </Stack>
    </Paper>
  );
};
