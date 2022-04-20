import { ChangeEventHandler } from "react";
import { t } from "@lingui/macro";
import { Clear,Search } from "@mui/icons-material";
import { IconButton,InputAdornment, TextField } from "@mui/material";

interface SearchFieldProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
}

export const SearchField = ({ value, onChange, onClear }: SearchFieldProps) => (
  <TextField
    size="small"
    fullWidth
    placeholder={t`Search`}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search color="action" />
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            size="small"
            edge="end"
            disabled={value === ""}
            onClick={onClear}
            aria-label={t`Clear`}
          >
            <Clear />
          </IconButton>
        </InputAdornment>
      ),
      style: { borderRadius: 18 },
    }}
    value={value}
    onChange={onChange}
  />
);
