import { ReactNode } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "../Link";

export interface FleetCardProps {
  href: string;
  image: string;
  title: ReactNode;
  subtitle: ReactNode;
}

export const FleetCard = ({ href, image, title, subtitle }: FleetCardProps) => (
  <Card variant="outlined" sx={{ height: "100%" }}>
    <CardActionArea component={Link} href={href}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        aria-hidden="true"
        sx={{ objectPosition: "top" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
