import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CreateSimple } from "./CreateSimple";

export default {
  title: "Components/Create (simple)",
  component: CreateSimple,
} as ComponentMeta<typeof CreateSimple>;

export const Default: ComponentStory<typeof CreateSimple> = () => (
  <CreateSimple />
);
