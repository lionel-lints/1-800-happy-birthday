import React from "react";
import styled from "styled-components";

import breakpoints from "@/utils/breakpoints";

import Play from "@/assets/icons/play.svg";
import Pause from "@/assets/icons/pause.svg";
import Fwd from "@/assets/icons/skip-fwd.svg";
import Back from "@/assets/icons/skip-back.svg";

const StyledImg = styled.img`
  height: 18px;
  opacity: 1;
  margin-right: 1.4rem;

  &:hover {
    cursor: pointer;
    filter: brightness(0) saturate(100%) invert(19%) sepia(88%) saturate(4456%)
      hue-rotate(354deg) brightness(92%) contrast(127%);
  }
`;

const StyledPlayButton = styled.div`
  border: 3px solid red;
  padding: 1rem;
  font-size: 2rem;
  transition: border-color 0.25s ease-in-out;
  font-family: BradleyMicro;

  &:hover {
    cursor: pointer;
    border-color: white;
  }
`;

const StyledPlayIcon = styled.img`
  height: ${p => (p.isPlaying ? "25px" : "30px")};
  vertical-align: middle;
  opacity: 1;
  margin-right: ${p => (p.isPlaying ? "1.4rem" : "1.3rem")};
  filter: brightness(0) saturate(100%) invert(19%) sepia(88%) saturate(4456%)
    hue-rotate(354deg) brightness(92%) contrast(127%);

  &:hover {
    filter: none;
    cursor: pointer;
  }
`;

const StyledDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1;

  @media ${breakpoints.laptop} {
    width: 30%;
  }
`;

const AudioControls = ({
  isPlaying,
  forward,
  back,
  togglePlay,
  showPlayButton
}) => {
  return (
    <StyledDiv>
      <StyledImg src={Back} onClick={back} />

      {showPlayButton ? (
        <StyledPlayButton onClick={togglePlay}>
          {isPlaying ? `Pause` : `Play`}
        </StyledPlayButton>
      ) : (
        <StyledPlayIcon
          src={isPlaying ? Pause : Play}
          isPlaying={isPlaying}
          onClick={togglePlay}
        />
      )}

      <StyledImg src={Fwd} onClick={forward} />
    </StyledDiv>
  );
};

export default AudioControls;
