import { ReactNode, useState } from "react";
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
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-location";
import type { Vehicle } from "@/types";
import { http } from "@/utils";
import { DeleteDialog } from "../DeleteDialog";

interface FieldProps {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

const Field = ({ id, label, value }: FieldProps) => (
  <>
    <Typography component="dt" id={id} sx={{ fontWeight: "medium" }}>
      {label}
    </Typography>
    <Typography
      component="dd"
      sx={{ color: "text.secondary" }}
      aria-labelledby={id}
    >
      {value}
    </Typography>
  </>
);

interface SwatchProps {
  color: string;
}

const Swatch = ({ color }: SwatchProps) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Box
      component="span"
      sx={{
        height: 16,
        width: 16,
        borderRadius: "50%",
        backgroundColor: color.replace(/ /g, ""),
        border: 1,
        borderColor: "divider",
        display: "inline-block",
        marginRight: 0.75,
      }}
    />
    <span>{color.charAt(0).toUpperCase() + color.slice(1)}</span>
  </Box>
);

interface DetailsProps {
  vehicle?: Vehicle;
}

export const Details = ({ vehicle }: DetailsProps) => {
  const { i18n } = useLingui();
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  if (vehicle === undefined) {
    return null;
  }

  return (
    <>
      {/* Vehicle details card */}
      <Card aria-label={t`Vehicle details`} variant="outlined">
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
              dd: {
                "&:not(:last-child)": {
                  marginBottom: 2,
                },
              },
            }}
          >
            <Field
              id="color"
              label={<Trans>Colour</Trans>}
              value={<Swatch color={vehicle.color} />}
            />
            <Field id="fuel" label={<Trans>Fuel</Trans>} value={vehicle.fuel} />
            <Field id="vin" label={<Trans>VIN</Trans>} value={vehicle.vin} />
            <Field
              id="mileage"
              label={<Trans>Mileage</Trans>}
              value={i18n.number(vehicle.mileage)}
            />
            <Field
              id="date"
              label={<Trans>Registration date</Trans>}
              value={i18n.date(vehicle.registrationDate, { dateStyle: "long" })}
            />
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
          navigate({ to: "/" });
        }}
      />
    </>
  );
};
