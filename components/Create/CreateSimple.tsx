import { useState } from "react";
import { t, Trans } from "@lingui/macro";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { colors, fuelTypes, manufacturers } from "@/mocks";
import type { VehiclePayload } from "@/types";
import { http } from "@/utils";
import { Breadcrumbs } from "../Breadcrumbs";

interface Values extends Omit<VehiclePayload, "mileage"> {
  mileage: string;
}

export const CreateSimple = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <Breadcrumbs />

      <Paper>
        <Typography variant="h5" padding={2}>
          <Trans>Create new vehicle</Trans>
        </Typography>
        <Divider />
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            // Get the data
            const data = new FormData(event.currentTarget);
            const values = Object.fromEntries(data) as unknown as Values;
            // Submit
            setSubmitting(true);
            try {
              await http.post("/api/vehicles", {
                json: {
                  ...values,
                  mileage: parseInt(values.mileage, 10),
                },
              });
              // Success
              router.push("/");
            } catch (e) {
              setSubmitting(false);
            }
          }}
        >
          <Box padding={2}>
            <Grid container spacing={2}>
              {/* OEM */}
              <Grid item xs={12} sm={4}>
                <TextField
                  name="manufacturer"
                  id="manufacturer"
                  label={<Trans>Make</Trans>}
                  select
                  SelectProps={{ native: true }}
                  required
                  defaultValue=""
                  InputLabelProps={{ shrink: true }}
                  disabled={submitting}
                >
                  <option value="" disabled>
                    {t`Please select a make`}
                  </option>
                  {manufacturers().map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </TextField>
              </Grid>

              {/* Model */}
              <Grid item xs={12} sm={4}>
                <TextField
                  name="model"
                  id="model"
                  label={<Trans>Model</Trans>}
                  required
                  disabled={submitting}
                />
              </Grid>

              {/* Variant */}
              <Grid item xs={12} sm={4}>
                <TextField
                  name="type"
                  id="type"
                  label={<Trans>Variant</Trans>}
                  required
                  disabled={submitting}
                />
              </Grid>

              {/* Fuel type */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="fuel"
                  id="fuel"
                  label={<Trans>Fuel</Trans>}
                  select
                  SelectProps={{ native: true }}
                  required
                  defaultValue=""
                  InputLabelProps={{ shrink: true }}
                  disabled={submitting}
                >
                  <option value="" disabled>
                    {t`Please select a fuel type`}
                  </option>
                  {fuelTypes().map((fuel) => (
                    <option key={fuel} value={fuel}>
                      {fuel}
                    </option>
                  ))}
                </TextField>
              </Grid>

              {/* Colour */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="color"
                  id="color"
                  label={<Trans>Colour</Trans>}
                  select
                  required
                  SelectProps={{ native: true }}
                  defaultValue=""
                  InputLabelProps={{ shrink: true }}
                  disabled={submitting}
                >
                  <option value="" disabled>
                    {t`Please select a colour`}
                  </option>
                  {colors().map((color) => (
                    <option key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))}
                </TextField>
              </Grid>

              {/* Registration number */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="registrationNumber"
                  id="registrationNumber"
                  label={<Trans>Registration number</Trans>}
                  required
                  disabled={submitting}
                />
              </Grid>

              {/* VIN */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="vin"
                  id="vin"
                  label={<Trans>VIN</Trans>}
                  required
                  disabled={submitting}
                />
              </Grid>

              {/* Mileage */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="mileage"
                  id="mileage"
                  label={<Trans>Mileage</Trans>}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    title: t`Mileage must be numbers only`,
                  }}
                  required
                  disabled={submitting}
                />
              </Grid>

              {/* Registration date */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="registrationDate"
                  id="registrationDate"
                  type="date"
                  label={<Trans>Registration date</Trans>}
                  required
                  InputLabelProps={{ shrink: true }}
                  disabled={submitting}
                />
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box padding={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm>
                <Button
                  type="reset"
                  variant="outlined"
                  color="secondary"
                  sx={{ width: { xs: 1, sm: "auto" } }}
                  disabled={submitting}
                >
                  <Trans>Reset</Trans>
                </Button>
              </Grid>
              <Grid item xs={6} sm="auto">
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={() => router.push("/")}
                  sx={{ width: { xs: 1, sm: "auto" } }}
                  disabled={submitting}
                >
                  <Trans>Cancel</Trans>
                </Button>
              </Grid>
              <Grid item xs={6} sm="auto">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  loading={submitting}
                  sx={{ width: { xs: 1, sm: "auto" } }}
                >
                  <Trans>Create</Trans>
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Paper>
    </>
  );
};
