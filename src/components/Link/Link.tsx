import { forwardRef } from "react";
import { Link as MuiLink } from "@mui/material";
import {
  Link as LocationLink,
  LinkProps as LocationLinkProps,
} from "@tanstack/react-location";

const WrappedLink = forwardRef<HTMLAnchorElement, LocationLinkProps>(
  (props, ref) => <LocationLink _ref={ref} {...props} />
);

export const Link = forwardRef<HTMLAnchorElement, LocationLinkProps>(
  (props, ref) => <MuiLink ref={ref} component={WrappedLink} {...props} />
);
