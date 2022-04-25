import { styled } from "@mui/material";
import { ZegoFleetHorizontal } from "../ZegoFleetHorizontal";

const Background = styled("main")`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Fallback = () => (
  <Background>
    <ZegoFleetHorizontal color="rgba(70, 225, 140)" height={48} />
  </Background>
);
