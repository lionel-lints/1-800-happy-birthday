import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Play from "@/assets/icons/play.svg";
import Pause from "@/assets/icons/pause.svg";

const StyledName = styled.div``;

const StyledVoicemailFooter = styled.div`
  position: fixed;
  bottom: ${p => (p.isVisible ? 0 : "-100px")};
  width: 100%;
  background: red;
  padding: 1rem 2%;
  z-index: 12;
  border-top: 3px solid black;
  height: 30px;
  display: flex;
  align-items: center;
`;

const StyledPlayIcon = styled.img`
  height: ${p => (p.isPlaying ? "25px" : "30px")};
  vertical-align: middle;
  opacity: 1;
  filter: brightness(0) saturate(100%) invert(0%) sepia(4%) saturate(7500%)
    hue-rotate(222deg) brightness(98%) contrast(104%);

  &:hover {
    filter: none;
    cursor: pointer;
  }
`;

const VoicemailFooter = ({ isVisible, isPlaying, setIsPlaying }) => {
  return (
    <StyledVoicemailFooter isVisible={isVisible}>
      <StyledPlayIcon
        src={isPlaying ? Pause : Play}
        isPlaying={isPlaying}
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      />
      <StyledName></StyledName>
    </StyledVoicemailFooter>
  );
};

VoicemailFooter.propTypes = {};

export default VoicemailFooter;
