import { Trans } from "@lingui/macro";
import { Business, Home, Person } from "@mui/icons-material";
import { Breadcrumbs, Container } from "@mui/material";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { BreadcrumbItem, DriversTable } from "@/components";
import { Driver, Fleet } from "@/types";
import { withAuth } from "@/utils";

interface DriversPageProps {
  fleet: Fleet;
  drivers: Driver[];
}

const DriversPage: NextPage<DriversPageProps> = ({ fleet, drivers = [] }) => {
  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Breadcrumbs sx={{ my: 2 }}>
        <BreadcrumbItem to="/" icon={Home} label={<Trans>Fleets</Trans>} />
        <BreadcrumbItem
          to={`/fleets/${fleet?.uuid}`}
          icon={Business}
          label={fleet?.name}
        />
        <BreadcrumbItem icon={Person} label={<Trans>Drivers</Trans>} />
      </Breadcrumbs>

      <DriversTable drivers={drivers!} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    const [fleetsResponse, driversResponse] = await Promise.all([
      fetch(`https://zego.backend/fleets/${context.params?.fleetid}`),
      fetch(`https://zego.backend/fleets/${context.params?.fleetid}/drivers`),
    ]);

    return {
      props: {
        fleet: await fleetsResponse.json(),
        drivers: await driversResponse.json(),
      },
    };
  }
);

export default DriversPage;
