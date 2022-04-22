import * as React from "react";
import { Add, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  lighten,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Vehicle } from "@/types";
import { Link } from "../Link";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Vehicle;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "registrationNumber",
    numeric: false,
    disablePadding: false,
    label: "Registration number",
  },
  {
    id: "manufacturer",
    numeric: false,
    disablePadding: true,
    label: "Manufacturer",
  },
  {
    id: "model",
    numeric: false,
    disablePadding: true,
    label: "Model",
  },
  {
    id: "fuel",
    numeric: false,
    disablePadding: true,
    label: "Fuel type",
  },
  {
    id: "mileage",
    numeric: true,
    disablePadding: false,
    label: "Mileage",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Vehicle
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Vehicle) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "light"
            ? "primary.light"
            : theme.palette.grey["800"],
      }}
    >
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = () => {
  return (
    <Toolbar
      sx={{
        p: 2,
        justifyContent: "space-between",
      }}
    >
      <TextField
        placeholder="Filter vehicles"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ width: 300 }}
      />
      <Button
        component={Link}
        to="add"
        variant="outlined"
        color="secondary"
        startIcon={<Add />}
        sx={{ flexShrink: 0 }}
      >
        Add vehicle
      </Button>
    </Toolbar>
  );
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
    backgroundColor:
      theme.palette.mode === "light"
        ? lighten(theme.palette.primary.main, 0.9)
        : theme.palette.grey[900],
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)({
  border: 0,
});

interface VehiclesTableProps {
  rows: Vehicle[];
}

export function VehiclesTable({ rows }: VehiclesTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof Vehicle>("registrationNumber");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Vehicle
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(1);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }} variant="outlined">
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow tabIndex={-1} key={row.id}>
                      <StyledTableCell component="th" id={labelId} scope="row">
                        <Link to={row.id} preload={1}>
                          {row.registrationNumber}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell>{row.manufacturer}</StyledTableCell>
                      <StyledTableCell>{row.model}</StyledTableCell>
                      <StyledTableCell>{row.fuel}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.mileage}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </Box>
  );
}
