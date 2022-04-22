import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createTheme,
  CssBaseline,
  darken,
  lighten,
  PaletteMode,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";

// TODO: augment theme palette for access to these
const ZEGO_GREEN = "rgba(70, 225, 140)";
const ZEGO_PURPLE = "rgba(55, 25, 135)";

export interface ThemeContextData {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
  toggle: () => void;
}

const Context = createContext<ThemeContextData | undefined>(undefined);

const noop = () => {};

export interface ThemeProviderProps {
  /** The initial theme mode. */
  initialMode?: PaletteMode;
  /** Your application component. */
  children: ReactNode;
  /** Called when the theme mode is changed. Passed the new mode ("light" or "dark") */
  onChangeMode?: (mode: PaletteMode) => void;
}

/**
 * Theme provider for MUI apps.
 */
const ThemeProvider = ({
  children,
  initialMode = "light",
  onChangeMode = noop,
}: ThemeProviderProps) => {
  const [mode, setMode] = useState<PaletteMode>(initialMode);
  useEffect(() => void onChangeMode(mode), [mode, onChangeMode]);
  const value: ThemeContextData = useMemo(
    () => ({
      mode,
      setMode,
      toggle: () => setMode((type) => (type === "light" ? "dark" : "light")),
    }),
    [mode, setMode]
  );
  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: [
            '"Modern Era"',
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
        },
        shape: {
          borderRadius: 0,
        },
        palette: {
          mode,
          primary: {
            main: ZEGO_GREEN,
          },
          secondary: {
            main: mode === "light" ? ZEGO_PURPLE : ZEGO_GREEN,
          },
          background: {
            default: mode === "light" ? lighten(ZEGO_GREEN, 0.85) : "#303030",
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                color: "#fff",
                backgroundColor:
                  mode === "light" ? ZEGO_PURPLE : darken(ZEGO_PURPLE, 0.5),
              },
            },
          },
          MuiButton: {
            defaultProps: {
              disableElevation: true,
              size: "large",
            },
            styleOverrides: {
              root: {
                textTransform: "none",
                letterSpacing: "0rem",
              },
            },
          },
          MuiLink: {
            defaultProps: {
              color: "secondary",
            },
          },
          MuiTextField: {
            defaultProps: {
              fullWidth: true,
            },
          },
        },
      }),
    [mode]
  );

  return (
    <Context.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </Context.Provider>
  );
};

/**
 * Hook used to access the theme mode.
 *
 * Returns an object containing `mode` and `setMode` properties.
 */
function useThemeMode() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useThemeMode };
