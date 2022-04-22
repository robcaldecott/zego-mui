import { useState } from "react";
import { Trans } from "@lingui/macro";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "../Link";
// import NextLink from "next/link";
import { ZegoFleetHorizontal } from "../ZegoFleetHorizontal";

const Background = styled("main")`
  min-height: 100vh;
  width: 100%;
  background-image: radial-gradient(
      49.97% 75.51% at 0% 100%,
      #b932ff 0%,
      rgba(55, 25, 135, 0) 100%
    ),
    radial-gradient(
      50.03% 75.61% at 100% 0%,
      #27252d 0%,
      rgba(55, 25, 135, 0) 100%
    );
  background-color: #371987;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface LoginProps {
  onLogin: () => void;
}

export const Login = (props: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("en-GB");

  return (
    <Background>
      <Stack spacing={4}>
        <ZegoFleetHorizontal color="white" height="32px" width="100%" />

        <form
          onSubmit={(event) => {
            event.preventDefault();
            props.onLogin();
          }}
        >
          <Paper sx={{ p: 4, width: { xs: 300, sm: 336 } }}>
            <Stack spacing={4}>
              {/* Title */}
              <Typography variant="h4" component="h1" align="center">
                <Trans>Log in</Trans>
              </Typography>

              {/* Email */}
              <TextField
                id="email"
                type="email"
                label={<Trans>Email address</Trans>}
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              {/* Password */}
              <div>
                <TextField
                  id="password"
                  type="password"
                  label={<Trans>Password</Trans>}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  sx={{ marginBottom: 1 }}
                />
                <Link to="/forgot-password">
                  <Trans>Forgot password</Trans>
                </Link>
              </div>

              {/* Login button */}
              <Button type="submit" variant="contained" color="primary">
                <Trans>Log in</Trans>
              </Button>
            </Stack>
          </Paper>
        </form>

        <TextField
          select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          color="secondary"
          sx={{
            "& .MuiSelect-select": { color: "common.white" },
            "& .MuiSelect-icon": { color: "common.white" },
          }}
        >
          <MenuItem value="en-GB">
            <Box component="span" sx={{ marginRight: 1 }}>
              🇬🇧
            </Box>
            <span>
              <Trans>English (UK)</Trans>
            </span>
          </MenuItem>
        </TextField>
      </Stack>
    </Background>
  );
};
