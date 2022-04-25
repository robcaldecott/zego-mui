import * as React from "react";
import { Clear, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
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
import { Link } from "../Link";

interface Fleet {
  uuid: string;
  name: string;
  activeVehicleCount: number;
  activePolicyCount: number;
  country: string;
  manager: string;
}

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
  id: keyof Fleet;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: "Name",
  },
  {
    id: "manager",
    numeric: false,
    label: "Manager",
  },
  {
    id: "country",
    numeric: false,
    label: "Country",
  },
  {
    id: "activePolicyCount",
    numeric: true,
    label: "Active policies",
  },
  {
    id: "activeVehicleCount",
    numeric: true,
    label: "Vehicles",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Fleet
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Fleet) => (event: React.MouseEvent<unknown>) => {
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
        placeholder="Filter fleets"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ width: 300 }}
      />
    </Toolbar>
  );
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)({
  border: 0,
});

interface FleetsTableProps {
  rows: Fleet[];
}

export function FleetsTable({ rows }: FleetsTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Fleet>("name");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Fleet
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow tabIndex={-1} key={row.uuid}>
                      <StyledTableCell component="th" id={labelId} scope="row">
                        <Link href={`/fleets/${row.uuid}`}>{row.name}</Link>,
                      </StyledTableCell>
                      <StyledTableCell>{row.manager}</StyledTableCell>
                      <StyledTableCell>{row.country}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.activePolicyCount}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.activeVehicleCount}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
