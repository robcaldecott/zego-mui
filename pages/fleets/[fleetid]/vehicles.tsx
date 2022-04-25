import { Trans } from "@lingui/macro";
import { Business, DirectionsCar, Home } from "@mui/icons-material";
import { Breadcrumbs, Container } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { BreadcrumbItem, VehiclesTable } from "@/components";
import type { Fleet, Vehicle } from "@/types";

interface VehiclesPageProps {
  fleet: Fleet;
  vehicles: Vehicle[];
}

const VehiclesPage: NextPage<VehiclesPageProps> = ({
  fleet,
  vehicles = [],
}) => {
  return (
    <Container maxWidth="xl">
      <Breadcrumbs sx={{ my: 2 }}>
        <BreadcrumbItem to="/" icon={Home} label={<Trans>Fleets</Trans>} />
        <BreadcrumbItem
          to={`/fleets/${fleet?.uuid}`}
          icon={Business}
          label={fleet?.name}
        />
        <BreadcrumbItem icon={DirectionsCar} label={<Trans>Vehicles</Trans>} />
      </Breadcrumbs>

      <VehiclesTable fleetId={fleet.uuid} rows={vehicles} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [fleetsResponse, vehiclesResponse] = await Promise.all([
    fetch(`https://zego.backend/fleets/${context.params?.fleetid}`),
    fetch(`https://zego.backend/fleets/${context.params?.fleetid}/vehicles`),
  ]);

  return {
    props: {
      fleet: await fleetsResponse.json(),
      vehicles: await vehiclesResponse.json(),
    },
  };
};

export default VehiclesPage;
