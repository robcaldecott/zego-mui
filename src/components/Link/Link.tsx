import { forwardRef } from "react";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import {
  Link as LocationLink,
  LinkProps as LocationLinkProps,
} from "@tanstack/react-location";

const WrappedLink = forwardRef<HTMLAnchorElement, LocationLinkProps>(
  (props, ref) => <LocationLink _ref={ref} {...props} />
);

export const Link = forwardRef<
  HTMLAnchorElement,
  LocationLinkProps & MuiLinkProps
>(({ href, ...props }, ref) => (
  <MuiLink ref={ref} component={WrappedLink} to={href} {...props} />
));
