import { Trans } from "@lingui/macro";
import { Business, Home } from "@mui/icons-material";
import { Breadcrumbs, Container, Grid } from "@mui/material";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { BreadcrumbItem, FleetCard, FleetCardProps } from "@/components";
import type { Fleet } from "@/types";
import { withAuth } from "@/utils";

interface DetailsPageProps {
  fleet: Fleet;
}

const DetailsPage: NextPage<DetailsPageProps> = ({ fleet }) => {
  const cards: FleetCardProps[] = [
    {
      href: `/fleets/${fleet?.uuid}/vehicles`,
      image: "/undraw_city_driver_re_9xyv.svg",
      title: <Trans>Vehicles</Trans>,
      subtitle: (
        <Trans>
          Manage your fleet of {fleet?.activeVehicleCount} vehicles.
        </Trans>
      ),
    },
    {
      href: `/fleets/${fleet?.uuid}/drivers`,
      image: "/undraw_people_re_8spw.svg",
      title: <Trans>Drivers</Trans>,
      subtitle: (
        <Trans>Manage your {fleet?.activePolicyCount} driver(s).</Trans>
      ),
    },
    {
      href: `/fleets/${fleet?.uuid}/billing`,
      image: "/undraw_receipt_re_fre3.svg",
      title: <Trans>Billing</Trans>,
      subtitle: <Trans>Manage your Zego bills.</Trans>,
    },
  ];

  return (
    <Container maxWidth="xl">
      <Breadcrumbs sx={{ mt: 2, mb: 4 }}>
        <BreadcrumbItem to="/" icon={Home} label={<Trans>Fleets</Trans>} />
        <BreadcrumbItem icon={Business} label={fleet?.name} />
      </Breadcrumbs>

      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid key={card.href} item xs={12} sm={4}>
            <FleetCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    const response = await fetch(
      `https://zego.backend/fleets/${context.params?.fleetid}`
    );
    const fleet = await response.json();

    return {
      props: {
        fleet,
      },
    };
  }
);

export default DetailsPage;
