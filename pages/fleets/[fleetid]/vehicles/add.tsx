import { Trans } from "@lingui/macro";
import { Add, Business, DirectionsCar, Home } from "@mui/icons-material";
import { Breadcrumbs, Container } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { BreadcrumbItem, CreateSimple } from "@/components";
import type { Config, Fleet } from "@/types";

interface AddVehiclePageProps {
  fleet: Fleet;
  config: Config;
}

const AddVehiclePage: NextPage<AddVehiclePageProps> = ({ fleet, config }) => {
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
        <BreadcrumbItem icon={Add} label={<Trans>Add vehicle</Trans>} />
      </Breadcrumbs>

      <Container maxWidth="md">
        <CreateSimple fleetId={fleet.uuid} config={config} />
      </Container>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const responses = await Promise.all([
    fetch(`https://zego.backend/fleets/${context.params?.fleetid}`),
    fetch(
      `https://zego.backend/fleets/${context.params?.fleetid}/vehicleConfig`
    ),
  ]);

  return {
    props: {
      fleet: await responses[0].json(),
      config: await responses[1].json(),
    },
  };
};

export default AddVehiclePage;
