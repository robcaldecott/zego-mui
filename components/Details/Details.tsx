import { useState } from "react";
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import { useRouter } from "next/router";
import type { Vehicle } from "@/types";
import { http } from "@/utils";
import { Breadcrumbs } from "../Breadcrumbs";
import { DeleteDialog } from "../DeleteDialog";

interface DetailsProps {
  vehicle: Vehicle;
}

export const Details = ({ vehicle }: DetailsProps) => {
  const { i18n } = useLingui();
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs registrationNumber={vehicle.registrationNumber} />

      {/* Vehicle details card */}
      <Card aria-label={t`Vehicle details`}>
        <CardHeader
          title={`${vehicle.manufacturer} ${vehicle.model} ${vehicle.type}`}
          titleTypographyProps={{ noWrap: true }}
          subheader={vehicle.registrationNumber}
          subheaderTypographyProps={{ noWrap: true }}
          sx={{ "& .MuiCardHeader-content": { minWidth: 0 } }}
        />
        <Divider />
        <CardContent>
          <Box
            component="dl"
            sx={{
              margin: 0,
              typography: "body1",
              "& dt": {
                fontWeight: "fontWeightMedium",
              },
              "& dd": {
                color: "text.secondary",
                marginLeft: 0,
                "&:not(:last-child)": {
                  marginBottom: 2,
                },
              },
            }}
          >
            <dt id="color">
              <Trans>Colour</Trans>
            </dt>
            <Box
              component="dd"
              display="flex"
              alignItems="center"
              aria-labelledby="color"
            >
              <Box
                component="span"
                sx={{
                  height: 16,
                  width: 16,
                  borderRadius: "50%",
                  backgroundColor: vehicle.color.replace(/ /g, ""),
                  border: 1,
                  borderColor: "divider",
                  display: "inline-block",
                  marginRight: 0.75,
                }}
              />
              <span>
                {vehicle.color.charAt(0).toUpperCase() + vehicle.color.slice(1)}
              </span>
            </Box>

            <dt id="fuel">
              <Trans>Fuel</Trans>
            </dt>
            <dd aria-labelledby="fuel">{vehicle.fuel}</dd>

            <dt id="vin">
              <Trans>VIN</Trans>
            </dt>
            <dd aria-labelledby="vin">{vehicle.vin}</dd>

            <dt id="mileage">
              <Trans>Mileage</Trans>
            </dt>
            <dd aria-labelledby="mileage">{i18n.number(vehicle.mileage)}</dd>

            <dt id="date">
              <Trans>Registration date</Trans>
            </dt>
            {vehicle.registrationDate && (
              <dd aria-labelledby="date">
                {i18n.date(vehicle.registrationDate, { dateStyle: "long" })}
              </dd>
            )}
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutline />}
            onClick={() => {
              setShowDialog(true);
            }}
          >
            <Trans>Delete vehicle</Trans>
          </Button>
        </CardActions>
      </Card>

      {/* Delete vehicle dialog */}
      <DeleteDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onDelete={async () => {
          await http.delete(`/api/vehicles/${vehicle.id}`);
          setShowDialog(false);
          router.replace("/");
        }}
      />
    </>
  );
};
