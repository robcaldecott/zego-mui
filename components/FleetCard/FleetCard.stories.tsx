import { Container } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FleetCard } from ".";

export default {
  title: "Components/FleetCard",
  component: FleetCard,
  decorators: [
    (Story) => (
      <Container maxWidth="xs">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof FleetCard>;

const Template: ComponentStory<typeof FleetCard> = (args) => (
  <FleetCard {...args} />
);

export const Vehicles = Template.bind({});
Vehicles.args = {
  href: "/",
  image: "undraw_city_driver_re_9xyv.svg",
  title: "Title",
  subtitle: "Subtitle",
};
