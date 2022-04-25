import { ComponentMeta, ComponentStory } from "@storybook/react";
import { colors, fuelTypes, manufacturers } from "@/mocks/data";
import { CreateSimple } from "./CreateSimple";

export default {
  title: "Components/Create (simple)",
  component: CreateSimple,
} as ComponentMeta<typeof CreateSimple>;

export const Default: ComponentStory<typeof CreateSimple> = () => (
  <CreateSimple
    fleetId="123"
    config={{
      colors: colors(),
      fuelTypes: fuelTypes(),
      manufacturers: manufacturers(),
    }}
  />
);
