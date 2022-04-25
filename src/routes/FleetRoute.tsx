import { Trans } from "@lingui/macro";
import { Business, Home } from "@mui/icons-material";
import { Breadcrumbs, Container, Grid } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { BreadcrumbItem, FleetCard, FleetCardProps } from "@/components";
import type { LocationGenerics } from "@/types";

const FleetRoute = () => {
  const {
    data: { fleet },
  } = useMatch<LocationGenerics>();

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

export default FleetRoute;
