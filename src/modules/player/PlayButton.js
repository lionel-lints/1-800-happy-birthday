import React from "react";
import styled from "styled-components";

import breakpoints from "@/utils/breakpoints";

import Play from "@/assets/icons/play.svg";
import Pause from "@/assets/icons/pause.svg";

const StyledPlayButton = styled.div``;

const StyledPlayIcon = styled.img`
  margin-right: 1rem;
  margin-bottom: ${p => (p.isPlaying ? "8px" : "5px")};
  height: ${p => (p.isPlaying ? "32px" : "40px")};
  width: 40px;
  vertical-align: middle;
  opacity: 1;
  filter: brightness(0) saturate(100%) invert(19%) sepia(88%) saturate(4456%)
    hue-rotate(354deg) brightness(92%) contrast(127%);
  z-index: 6;

  &:hover {
    filter: none;
    cursor: pointer;
  }

  @media ${breakpoints.tablet} {
    margin-left: 0;
  }
`;

const PlayButton = ({ isPlaying, togglePlay }) => {
  return (
    <StyledPlayButton>
      <StyledPlayIcon
        src={isPlaying ? Pause : Play}
        isPlaying={isPlaying}
        onClick={togglePlay}
      />
    </StyledPlayButton>
  );
};

export default PlayButton;
