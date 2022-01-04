import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Play from "@/assets/icons/play.svg";
import Pause from "@/assets/icons/pause.svg";

import { AudioAnalyser } from "@/modules/birthday";

const StyledText = styled.div`
  font-family: RobotoMono;
  font-size: 1rem;
  color: black;
  z-index: 6;

  span {
    border-bottom: 1px solid black;

    &:hover {
      cursor: pointer;
      border-bottom: 1px solid transparent;
    }
  }
`;

const StyledVoicemailFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: red;
  padding: 1rem 2%;
  z-index: 12;
  border-top: 3px solid black;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.5s ease-in-out;
  transform: ${p => (p.isVisible ? "translate(0, 0)" : "translate(0, 100%)")};
`;

const StyledPlayIcon = styled.img`
  height: ${p => (p.isPlaying ? "25px" : "30px")};
  vertical-align: middle;
  opacity: 1;
  filter: brightness(0) saturate(100%) invert(0%) sepia(4%) saturate(7500%)
    hue-rotate(222deg) brightness(98%) contrast(104%);
  z-index: 6;

  &:hover {
    filter: none;
    cursor: pointer;
  }
`;

const VoicemailFooter = ({
  isVisible,
  isPlaying,
  setIsPlaying,
  voicemailName
}) => {
  const [howlerContext, setHowlerContext] = useState(null);

  useEffect(() => {
    setHowlerContext(window.Howler.ctx);
  });

  return (
    <StyledVoicemailFooter isVisible={isVisible}>
      <StyledPlayIcon
        src={isPlaying ? Pause : Play}
        isPlaying={isPlaying}
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      />
      {howlerContext ? <AudioAnalyser isPlaying={isPlaying} /> : null}
      {voicemailName ? (
        <StyledText>
          Playing voicemails for <span onClick={() => {}}>{voicemailName}</span>
        </StyledText>
      ) : null}
    </StyledVoicemailFooter>
  );
};

VoicemailFooter.propTypes = {
  isVisible: PropTypes.bool,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  voicemailName: PropTypes.string.isRequired
};

VoicemailFooter.defaultProps = { isVisible: false };

export default VoicemailFooter;
