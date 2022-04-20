import { Container } from "@mui/material";
import type { NextPage } from "next";
import { CreateSimple } from "@/components";

const CreatePage: NextPage = () => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <CreateSimple />
  </Container>
);

export default CreatePage;
