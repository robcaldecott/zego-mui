import { useState } from "react";
import { t } from "@lingui/macro";
import { Box, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Fleet } from "@/types";
import { Link } from "../Link";

const numberFormatter = (params: GridRenderCellParams) =>
  params.value === 0 ? "-" : params.formattedValue;

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: t`Name`,
    flex: 2,
    renderCell: (params) => <Link to="/">{params.formattedValue}</Link>,
  },
  {
    field: "manager",
    headerName: t`Manager`,
    flex: 2,
  },
  {
    field: "country",
    headerName: t`Country`,
    flex: 1,
  },
  {
    field: "activePolicies",
    headerName: t`Active policies`,
    type: "number",
    flex: 1,
    renderCell: numberFormatter,
  },
  {
    field: "vehicles",
    headerName: t`Vehicles`,
    type: "number",
    flex: 1,
    renderCell: numberFormatter,
  },
];

interface FleetsProps {
  fleets: Fleet[];
}

export const Fleets = ({ fleets }: FleetsProps) => {
  const [pageSize, setPageSize] = useState(50);

  // Convert data to rows
  const rows = fleets.map((fleet) => {
    return {
      id: fleet.uuid,
      name: fleet.name,
      manager: fleet.manager.name,
      country: fleet.country.displayName,
      activePolicies: fleet.activePolicyCount,
      vehicles: fleet.activeVehicleCount,
    };
  });

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        autoHeight
        pageSize={pageSize}
        rowsPerPageOptions={[10, 25, 50, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "primary.light"
                : theme.palette.grey["800"],
          },
          "& .MuiDataGrid-columnSeparator": {
            color: (theme) =>
              theme.palette.mode === "light"
                ? "primary.dark"
                : theme.palette.grey["700"],
          },
        }}
      />
    </Paper>
  );

  // return (
  //   <Paper sx={{ height: "calc(100vh - 4rem)", width: "100%" }}>
  //     <DataGrid
  //       rows={rows}
  //       columns={columns}
  //       disableSelectionOnClick
  //       autoHeight
  //     />
  //   </Paper>
  // );
};
