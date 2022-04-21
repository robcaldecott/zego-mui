import { Add, Business, DirectionsCar, Home } from "@mui/icons-material";
import { Breadcrumbs, Container, Typography } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { CreateSimple, Link } from "@/components";
import type { LocationGenerics } from "@/types";

const CreateRoute = () => {
  const {
    data: { fleet },
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
          color="text.primary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Add sx={{ mr: 0.5 }} />
          Add vehicle
        </Typography>
      </Breadcrumbs>

      <Container maxWidth="md">
        <CreateSimple />
      </Container>
    </Container>
  );
};

export default CreateRoute;
