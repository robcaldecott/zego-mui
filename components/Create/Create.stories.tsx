import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Create } from "./Create";

export default {
  title: "Components/Create",
  component: Create,
} as ComponentMeta<typeof Create>;

export const Default: ComponentStory<typeof Create> = () => <Create />;
