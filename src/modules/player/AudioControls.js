import React from "react";
import styled from "styled-components";

import Play from "@/assets/icons/play.svg";
import Pause from "@/assets/icons/pause.svg";
import Fwd from "@/assets/icons/skip-fwd.svg";
import Back from "@/assets/icons/skip-back.svg";

const StyledImg = styled.img`
  height: 18px;
  opacity: 1;

  &:first-child {
    margin-right: 1.4rem;
  }

  filter: brightness(0) saturate(100%) invert(0%) sepia(4%) saturate(7500%)
    hue-rotate(222deg) brightness(98%) contrast(104%);

  &:hover {
    cursor: pointer;
  }
`;

const StyledPlayIcon = styled.img`
  height: ${p => (p.isPlaying ? "25px" : "30px")};
  vertical-align: middle;
  opacity: 1;
  margin-right: ${p => (p.isPlaying ? "1.4rem" : "1.3rem")};
  filter: brightness(0) saturate(100%) invert(0%) sepia(4%) saturate(7500%)
    hue-rotate(222deg) brightness(98%) contrast(104%);

  &.is-red {
    height: ${p => (p.isPlaying ? "32px" : "40px")};
    width: 40px;
    margin-right: 1rem;
    margin-bottom: ${p => (p.isPlaying ? "1px" : "0")};
    filter: brightness(0) saturate(100%) invert(19%) sepia(88%) saturate(4456%)
      hue-rotate(354deg) brightness(92%) contrast(127%);

    &:hover {
      filter: none;
      cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='50' height='60' viewport='0 0 100 100' style='fill:black;font-size:30px;'><text y='50%'>🎂</text></svg>")
          16 0,
        auto;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  z-index: 6;
  height: 30px;
`;

const AudioControls = ({
  isPlaying,
  forward,
  back,
  togglePlay,
  showPlayOnly
}) => {
  return (
    <StyledDiv>
      {!showPlayOnly ? <StyledImg src={Back} onClick={back} /> : null}

      <StyledPlayIcon
        className={showPlayOnly ? "is-red" : ""}
        src={isPlaying ? Pause : Play}
        isPlaying={isPlaying}
        onClick={togglePlay}
      />

      {!showPlayOnly ? <StyledImg src={Fwd} onClick={forward} /> : null}
    </StyledDiv>
  );
};

export default AudioControls;
