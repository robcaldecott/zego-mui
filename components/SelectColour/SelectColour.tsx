import { forwardRef } from "react";
import {
  Box,
  ListItemIcon,
  MenuItem,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { colors } from "@/mocks/data";

interface SelectColourProps
  extends Omit<
    TextFieldProps,
    "select" | "InputLabelProps" | "sx" | "children"
  > {}

export const SelectColour = forwardRef<HTMLDivElement, SelectColourProps>(
  ({ disabled, ...props }, ref) => (
    <TextField
      ref={ref}
      {...props}
      select
      sx={{
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
        },
      }}
      disabled={disabled}
    >
      {colors().map((color) => (
        <MenuItem key={color} value={color}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <Box
              height={16}
              width={16}
              borderRadius="50%"
              bgcolor={(theme) =>
                disabled
                  ? theme.palette.mode === "light"
                    ? theme.palette.grey["300"]
                    : theme.palette.grey["800"]
                  : color.replace(/ /g, "")
              }
              border={1}
              borderColor="divider"
            />
          </ListItemIcon>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </MenuItem>
      ))}
    </TextField>
  )
);

SelectColour.displayName = "SelectColour";
