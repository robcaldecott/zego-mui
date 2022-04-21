import { Business, DirectionsCar, Home } from "@mui/icons-material";
import { Breadcrumbs, Container, Typography } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { Details, Link } from "@/components";
import type { LocationGenerics } from "@/types";

const DetailsRoute = () => {
  const {
    data: { vehicle, fleet },
  } = useMatch<LocationGenerics>();

  return (
    <Container maxWidth="xl">
      <Breadcrumbs sx={{ my: 2 }}>
        <Link to="/" sx={{ display: "flex", alignItems: "center" }}>
          <Home sx={{ mr: 0.5 }} />
          Fleets
        </Link>

        <Link
          to={`/fleets/${fleet?.uuid}`}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Business sx={{ mr: 0.5 }} />
          {fleet?.name}
        </Link>

        <Link
          to={`/fleets/${fleet?.uuid}/vehicles`}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <DirectionsCar sx={{ mr: 0.5 }} />
          Vehicles
        </Link>

        <Typography
          component="span"
          variant="body2"
          color="text.primary"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "rgb(255, 211, 7)"
                : theme.palette.grey[900],
            border: "0px solid rgb(0, 0, 0)",
            padding: "2px 12px",
            minWidth: 80,
            display: "inline-block",
            borderRadius: "4px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {vehicle?.registrationNumber}
        </Typography>
      </Breadcrumbs>

      <Details vehicle={vehicle} />
    </Container>
  );
};

export default DetailsRoute;
