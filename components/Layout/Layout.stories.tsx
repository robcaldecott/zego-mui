import { Container } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PageHeader } from "../PageHeader";
import { Layout } from ".";

export default {
  title: "Components/Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Layout>;

export const WithContent: ComponentStory<typeof Layout> = () => (
  <Layout>
    <Container disableGutters sx={{ p: 4 }}>
      Content
    </Container>
  </Layout>
);

export const WithHeader: ComponentStory<typeof Layout> = () => (
  <Layout>
    <PageHeader>Header</PageHeader>
    <Container disableGutters sx={{ p: 4 }}>
      Content
    </Container>
  </Layout>
);
