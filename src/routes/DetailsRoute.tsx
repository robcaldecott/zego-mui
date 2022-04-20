import { Container } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { Details } from "@/components";
import type { LocationGenerics } from "@/types";

const DetailsRoute = () => {
  const {
    data: { vehicle },
  } = useMatch<LocationGenerics>();

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Details vehicle={vehicle} />
    </Container>
  );
};

export default DetailsRoute;
