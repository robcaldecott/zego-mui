import { Trans } from "@lingui/macro";
import { Container } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { Fleets, PageHeader } from "@/components";
import { fleets } from "@/mocks";
import { Fleet } from "@/types";

interface FleetsPage {
  fleets: Fleet[];
}

const FleetsPage: NextPage<FleetsPage> = ({ fleets }) => (
  <>
    <PageHeader>
      <Trans>Fleets</Trans>
    </PageHeader>

    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Fleets fleets={fleets} />
    </Container>
  </>
);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      fleets,
    },
  };
};

export default FleetsPage;
