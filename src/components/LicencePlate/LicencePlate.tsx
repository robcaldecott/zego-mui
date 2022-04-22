import { styled } from "@mui/material";

export const LicencePlate = styled("span")(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgb(255, 211, 7)"
      : theme.palette.grey[900],
  border: "0px solid rgb(0, 0, 0)",
  padding: "2px 12px",
  minWidth: 80,
  display: "inline-block",
  borderRadius: "4px",
  textAlign: "center",
  fontWeight: "bold",
}));
