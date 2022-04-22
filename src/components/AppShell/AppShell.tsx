import { styled } from "@mui/material";
import { Outlet } from "@tanstack/react-location";
import { AppHeader } from "../AppHeader";
import { Footer } from "../Footer";

const Main = styled("main")`
  /* Take the appbar height into account */
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
`;

const Content = styled("div")`
  /* Content height grows to fit the entire page */
  flex-grow: 1;
`;

export const AppShell = () => (
  <>
    <AppHeader />
    <Main>
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Main>
  </>
);
