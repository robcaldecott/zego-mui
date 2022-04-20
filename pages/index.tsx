import { Trans } from "@lingui/macro";
import { Add } from "@mui/icons-material";
import { Container } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { ResponsiveFab, Vehicles } from "@/components";
import { randomVehicles } from "@/mocks";
import type { Vehicle } from "@/types";

interface VehiclesPageProps {
  vehicles: Vehicle[];
}

const VehiclesPage: NextPage<VehiclesPageProps> = ({ vehicles }) => (
  <Container maxWidth="lg" sx={{ pt: 4 }}>
    <Vehicles vehicles={vehicles} fabPadding />

    <Link href="/create" passHref>
      <ResponsiveFab icon={Add} label={<Trans>Create Vehicle</Trans>} />
    </Link>
  </Container>
);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      vehicles: randomVehicles(25),
    },
  };
};

export default VehiclesPage;
