import { Business, Home } from "@mui/icons-material";
import {
  Breadcrumbs,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { Link } from "@/components";
import type { LocationGenerics } from "@/types";

const FleetRoute = () => {
  const {
    data: { fleet },
  } = useMatch<LocationGenerics>();

  return (
    <Container maxWidth="xl">
      <Breadcrumbs sx={{ mt: 2, mb: 4 }}>
        <Link to="/" sx={{ display: "flex", alignItems: "center" }}>
          <Home sx={{ mr: 0.5 }} />
          Fleets
        </Link>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <Business sx={{ mr: 0.5 }} />
          {fleet?.name}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardActionArea
              component={Link}
              to={`/fleets/${fleet?.uuid}/vehicles`}
            >
              <CardMedia
                component="img"
                height="140"
                image="/undraw_city_driver_re_9xyv.svg"
                alt="vehicle"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Vehicles
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Manage your fleet of {fleet?.activeVehicleCount} vehicles.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardActionArea
              component={Link}
              to={`/fleets/${fleet?.uuid}/drivers`}
            >
              <CardMedia
                component="img"
                height="140"
                image="/undraw_people_re_8spw.svg"
                alt="people"
                sx={{ objectPosition: "top" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Drivers
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Manage your {fleet?.activePolicyCount} driver(s).
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardActionArea
              component={Link}
              to={`/fleets/${fleet?.uuid}/billing`}
            >
              <CardMedia
                component="img"
                height="140"
                image="/undraw_receipt_re_fre3.svg"
                alt="billing"
                sx={{ objectPosition: "top" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Billing
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Manage your Zego bills.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FleetRoute;
