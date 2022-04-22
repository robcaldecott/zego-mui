import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { t, Trans } from "@lingui/macro";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
// import { useRouter } from "next/router";
import * as yup from "yup";
import { fuelTypes, manufacturers } from "@/mocks";
import type { VehiclePayload } from "@/types";
import { http } from "@/utils";
import "dayjs/locale/fi";
import { SelectColour } from "../SelectColour";

interface Values extends Omit<VehiclePayload, "mileage" | "registrationDate"> {
  mileage: string;
  registrationDate: Date | null;
}

const schema = yup
  .object({
    manufacturer: yup.string().required(t`Please select a make`),
    model: yup.string().required(t`Please enter the model`),
    type: yup.string().required(t`Please enter the variant`),
    fuel: yup.string().required(t`Please select a fuel type`),
    vin: yup.string().required(t`Please enter the VIN`),
    color: yup.string().required(t`Please select a colour`),
    mileage: yup
      .number()
      .typeError(t`Please enter a valid mileage`)
      .min(0)
      .required(t`Please enter the mileage`),
    registrationNumber: yup
      .string()
      .required(t`Please enter the registration number`),
    registrationDate: yup
      .date()
      .nullable()
      .required(t`Please enter the registration date`),
  })
  .required();

export const Create = () => {
  // const router = useRouter();
  useEffect(() => {
    dayjs.extend(utc);
  }, []);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Values>({
    mode: "onTouched",
    defaultValues: {
      manufacturer: "",
      model: "",
      type: "",
      fuel: "",
      vin: "",
      color: "",
      mileage: "",
      registrationNumber: "",
      registrationDate: null,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    // Send the data
    try {
      await http.post("/api/vehicles", {
        json: {
          ...data,
          registrationDate: dayjs(data.registrationDate).utc().format(),
          mileage: parseInt(data.mileage, 10),
        },
      });
      // Success
      // router.push("/");
    } catch (e) {
      // TODO: report errors
    }
  });

  return (
    <Container maxWidth="md" disableGutters>
      <Paper>
        <Typography variant="h5" padding={2}>
          <Trans>Create new vehicle</Trans>
        </Typography>
        <Divider />
        <LocalizationProvider dateAdapter={AdapterDayjs} locale="en-GB">
          <form onSubmit={onSubmit}>
            <Box padding={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="manufacturer"
                    control={control}
                    render={(props) => (
                      <TextField
                        id="manufacturer"
                        label={<Trans>Make</Trans>}
                        select
                        error={Boolean(props.fieldState.error)}
                        helperText={props.fieldState.error?.message}
                        {...props.field}
                      >
                        {manufacturers().map((make) => (
                          <MenuItem key={make} value={make}>
                            {make}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="model"
                    control={control}
                    render={(props) => (
                      <TextField
                        id="model"
                        label={<Trans>Model</Trans>}
                        error={Boolean(props.fieldState.error)}
                        helperText={props.fieldState.error?.message}
                        {...props.field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="type"
                    control={control}
                    render={(props) => (
                      <TextField
                        id="type"
                        label={<Trans>Variant</Trans>}
                        error={Boolean(props.fieldState.error)}
                        helperText={props.fieldState.error?.message}
                        {...props.field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="fuel"
                    control={control}
                    render={(props) => (
                      <TextField
                        id="fuel"
                        label={<Trans>Fuel</Trans>}
                        select
                        error={Boolean(props.fieldState.error)}
                        helperText={props.fieldState.error?.message}
                        {...props.field}
                      >
                        {fuelTypes().map((fuel) => (
                          <MenuItem key={fuel} value={fuel}>
                            {fuel}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="color"
                    control={control}
                    render={(props) => (
                      <SelectColour
                        id="color"
                        label={<Trans>Colour</Trans>}
                        error={Boolean(props.fieldState.error)}
                        helperText={props.fieldState.error?.message}
                        {...props.field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="registrationNumber"
                    control={control}
                    render={(props) => (
                      <TextField
                        id="registrationNumber"
                        label={<Trans>Registration number</Trans>}
                        error={Boolean(props.fieldState.error)}
                        helperText={props.fieldState.error?.message}
                        {...props.field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="vin"
                    control={control}
                    render={(props) => (
                      <TextField
                        id="vin"
                        label={<Trans>VIN</Trans>}
                        error={Boolean(props.fieldState.error)}
                        helperText={props.fieldState.error?.message}
                        {...props.field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="mileage"
                    control={control}
                    render={(props) => (
                      <TextField
                        id="mileage"
                        label={<Trans>Mileage</Trans>}
                        inputProps={{
                          inputMode: "numeric",
                        }}
                        error={Boolean(props.fieldState.error)}
                        helperText={props.fieldState.error?.message}
                        {...props.field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="registrationDate"
                    control={control}
                    render={(props) => (
                      <DesktopDatePicker
                        label={<Trans>Registration date</Trans>}
                        openTo="year"
                        inputFormat="DD/MM/YYYY"
                        views={["year", "month", "day"]}
                        disableFuture
                        renderInput={(params) => (
                          <TextField
                            id="registrationDate"
                            error={Boolean(props.fieldState.error)}
                            helperText={props.fieldState.error?.message}
                            {...params}
                          />
                        )}
                        {...props.field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box padding={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => reset()}
                    disabled={isSubmitting}
                    sx={{ width: { xs: 1, sm: "auto" } }}
                  >
                    <Trans>Reset</Trans>
                  </Button>
                </Grid>
                <Grid item xs={6} sm="auto">
                  <Button
                    type="button"
                    variant="outlined"
                    color="secondary"
                    // onClick={() => router.push("/")}
                    sx={{ width: { xs: 1, sm: "auto" } }}
                  >
                    <Trans>Cancel</Trans>
                  </Button>
                </Grid>
                <Grid item xs={6} sm="auto">
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={isSubmitting}
                    sx={{ width: { xs: 1, sm: "auto" } }}
                  >
                    <Trans>Create</Trans>
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </form>
        </LocalizationProvider>
      </Paper>
    </Container>
  );
};
