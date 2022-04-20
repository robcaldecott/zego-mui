import { useEffect, useState } from "react";
import { t, Trans } from "@lingui/macro";
import { ChevronRight, Info } from "@mui/icons-material";
import {
  Badge,
  Box,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useFilter } from "@/providers";
import type { Vehicle } from "@/types";
import { SearchField } from "../SearchField";

const NoResults = () => (
  <Stack
    direction="column"
    spacing={2}
    alignItems="center"
    paddingX={2}
    paddingY={4}
  >
    <Info
      sx={{
        fontSize: 64,
        color: "info.main",
      }}
    />
    <Typography variant="h5" component="h2" align="center">
      <Trans>No matching vehicles found.</Trans>
    </Typography>
    <Typography variant="body1" align="center" color="textSecondary">
      <Trans>Please try a different filter.</Trans>
    </Typography>
  </Stack>
);

const filterItems = (data: Vehicle[], filter: string) =>
  data.filter((vehicle) => {
    if (filter === "") {
      return true;
    }
    const re = new RegExp(filter, "i");
    const description = `${vehicle.manufacturer} ${vehicle.model} ${vehicle.type} ${vehicle.fuel}`;
    return description.search(re) !== -1;
  });

interface VehiclesProps {
  vehicles: Vehicle[];
  fabPadding?: boolean;
}

export const Vehicles = (props: VehiclesProps) => {
  const { filter, setFilter } = useFilter();
  const [items, setItems] = useState(filterItems(props.vehicles, filter));
  useEffect(
    () => void setItems(filterItems(props.vehicles, filter)),
    [filter, props.vehicles]
  );

  return (
    <Box marginBottom={props.fabPadding ? 12 : 0}>
      <Paper aria-label={t`Vehicle list`}>
        <Box padding={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm>
              <Badge
                badgeContent={items?.length}
                color="primary"
                sx={{ "& .MuiBadge-badge": { top: 16, right: -24 } }}
              >
                <Typography variant="h5" component="h1">
                  <Trans>Vehicles</Trans>
                </Typography>
              </Badge>
            </Grid>

            <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
              <Divider flexItem />
            </Grid>

            <Grid item xs={12} sm="auto">
              <SearchField
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                onClear={() => setFilter("")}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />
        {items.length === 0 ? (
          <NoResults />
        ) : (
          <List>
            {items.map((vehicle, index, arr) => (
              <Link key={vehicle.id} href={`/vehicles/${vehicle.id}`} passHref>
                <ListItemButton divider={index < arr.length - 1} component="a">
                  <ListItemText
                    primary={`${vehicle.manufacturer} ${vehicle.model} ${vehicle.type} ${vehicle.fuel}`}
                    primaryTypographyProps={{
                      noWrap: true,
                    }}
                    secondary={vehicle.registrationNumber}
                    secondaryTypographyProps={{
                      noWrap: true,
                    }}
                  />
                  <ChevronRight color="action" />
                </ListItemButton>
              </Link>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};
