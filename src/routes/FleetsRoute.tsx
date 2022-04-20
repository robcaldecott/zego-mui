import { Trans } from "@lingui/macro";
import { Container } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { Fleets, PageHeader } from "@/components";
import type { LocationGenerics } from "@/types";

const FleetsRoute = () => {
  const {
    data: { fleets = [] },
  } = useMatch<LocationGenerics>();

  return (
    <>
      <PageHeader>
        <Trans>Fleets</Trans>
      </PageHeader>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Fleets fleets={fleets} />
      </Container>
    </>
  );
};

export default FleetsRoute;
