import { Container } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { Details } from "@/components";
import { vehicles } from "@/mocks";
import type { Vehicle } from "@/types";

interface DetailsPageProps {
  vehicle: Vehicle;
}

const DetailsPage: NextPage<DetailsPageProps> = ({ vehicle }) => (
  <Container maxWidth="sm" sx={{ py: 4 }}>
    <Details vehicle={vehicle} />
  </Container>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      vehicle: vehicles.find((vehicle) => vehicle.id === context.params?.id),
    },
  };
};

export default DetailsPage;
