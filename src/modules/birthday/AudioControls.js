import React, { Component } from "react";
import styled from "styled-components";

import breakpoints from "@/utils/breakpoints";

import Play from "@/assets/icons/play.svg";
import Pause from "@/assets/icons/pause.svg";
import Fwd from "@/assets/icons/skip-fwd.svg";
import Back from "@/assets/icons/skip-back.svg";

const StyledImg = styled.img`
  height: 25px;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const StyledPlayButton = styled.img`
  height: 50px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0.8;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const StyledDiv = styled.div`
  margin-top: 5rem;
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;

  @media ${breakpoints.laptop} {
    width: 30%;
  }
`;

const AudioControls = ({ isPlaying, forward, back, playPause }) => {
  return (
    <StyledDiv>
      <StyledImg src={Back} onClick={back} />
      <StyledPlayButton src={isPlaying ? Pause : Play} onClick={playPause} />
      <StyledImg src={Fwd} onClick={forward} />
    </StyledDiv>
  );
};

export default AudioControls;
