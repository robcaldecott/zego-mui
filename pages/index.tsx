import { Trans } from "@lingui/macro";
import { Home } from "@mui/icons-material";
import { Breadcrumbs, Container } from "@mui/material";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { BreadcrumbItem, FleetsTable } from "@/components";
import type { Fleet } from "@/types";
import { withAuth } from "@/utils";

interface FleetsPageProps {
  fleets: Fleet[];
}

const FleetsPage: NextPage<FleetsPageProps> = ({ fleets }) => (
  <Container maxWidth="xl">
    <Breadcrumbs sx={{ my: 2 }}>
      <BreadcrumbItem icon={Home} label={<Trans>Fleets</Trans>} />
    </Breadcrumbs>

    <FleetsTable
      rows={fleets.map((fleet) => ({
        ...fleet,
        manager: fleet.manager.name,
        country: fleet.country.displayName,
      }))}
    />
  </Container>
);

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    const response = await fetch("https://zego.backend/fleets");

    return {
      props: {
        fleets: await response.json(),
      },
    };
  }
);

export default FleetsPage;
