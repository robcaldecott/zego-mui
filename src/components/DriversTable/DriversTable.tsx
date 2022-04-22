import { useState } from "react";
import { t } from "@lingui/macro";
import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Driver } from "@/types";
import { Link } from "../Link";

const columns: GridColDef[] = [
  {
    field: "email",
    headerName: t`Email`,
    flex: 1,
    renderCell: (params) => <Link href="/">{params.formattedValue}</Link>,
  },
  {
    field: "firstName",
    headerName: t`First name`,
    flex: 1,
  },
  {
    field: "lastName",
    headerName: t`Last name`,
    flex: 1,
  },
  {
    field: "licenceTypeName",
    headerName: t`Licence type`,
    flex: 2,
  },
];

interface DriversTableProps {
  drivers: Driver[];
}

export const DriversTable = ({ drivers }: DriversTableProps) => {
  const [pageSize, setPageSize] = useState(25);

  // Convert data to rows
  const rows = drivers.map((driver) => {
    return {
      id: driver.uuid,
      email: driver.email,
      firstName: driver.firstName,
      lastName: driver.lastName,
      licenceTypeName: driver.driversLicence.licenceTypeName,
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
};
