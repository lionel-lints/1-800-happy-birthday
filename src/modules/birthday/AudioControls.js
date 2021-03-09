import React, { Component } from "react";
import styled from "styled-components";

import Play from "@/assets/icons/play.svg";
import Pause from "@/assets/icons/pause.svg";
import Fwd from "@/assets/icons/skip-fwd.svg";
import Back from "@/assets/icons/skip-back.svg";

const StyledImg = styled.img`
  height: 29px;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;
const StyledDiv = styled.div`
  margin-top: 10vh;
  width: 30%;
  display: flex;
  justify-content: space-around;
  z-index: 1;
`;

const AudioControls = ({ isPlaying, forward, back, playPause }) => {
  return (
    <StyledDiv>
      <StyledImg src={Back} onClick={back} />
      <StyledImg src={isPlaying ? Pause : Play} onClick={playPause} />
      <StyledImg src={Fwd} onClick={forward} />
    </StyledDiv>
  );
};

export default AudioControls;
