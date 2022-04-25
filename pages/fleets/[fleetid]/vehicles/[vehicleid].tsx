import { Trans } from "@lingui/macro";
import { Business, DirectionsCar, Home } from "@mui/icons-material";
import { Breadcrumbs, Container } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { BreadcrumbItem, Details, LicencePlate } from "@/components";
import { Fleet, Vehicle } from "@/types";

interface VehicleDetailsPageProps {
  fleet: Fleet;
  vehicle: Vehicle;
}

const VehicleDetailsPage: NextPage<VehicleDetailsPageProps> = ({
  fleet,
  vehicle,
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
        <BreadcrumbItem
          to={`/fleets/${fleet?.uuid}/vehicles`}
          icon={DirectionsCar}
          label={<Trans>Vehicles</Trans>}
        />
        <LicencePlate>{vehicle?.registrationNumber}</LicencePlate>
      </Breadcrumbs>

      <Details fleetId={fleet.uuid} vehicle={vehicle} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [fleetsResponse, vehiclesResponse] = await Promise.all([
    fetch(`https://zego.backend/fleets/${context.params?.fleetid}`),
    fetch(
      `https://zego.backend/fleets/${context.params?.fleetid}/vehicles/${context.params?.vehicleid}`
    ),
  ]);

  return {
    props: {
      fleet: await fleetsResponse.json(),
      vehicle: await vehiclesResponse.json(),
    },
  };
};

export default VehicleDetailsPage;
