import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import breakpoints from "@/utils/breakpoints";

import Play from "@/assets/icons/play.svg";
import Pause from "@/assets/icons/pause.svg";

import { AudioAnalyser } from "@/modules/birthday";

import { LanguageContextConsumer } from "@/modules/_common";
import { birthday } from "@/assets/locales/data.json";

const StyledText = styled.div`
  font-family: RobotoMono;
  font-size: 1rem;
  color: black;
  z-index: 6;
  margin-left: 1rem;

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
  margin-left: 0.5rem;
  height: ${p => (p.isPlaying ? "25px" : "30px")};
  width: 30px;
  vertical-align: middle;
  opacity: 1;
  filter: brightness(0) saturate(100%) invert(0%) sepia(4%) saturate(7500%)
    hue-rotate(222deg) brightness(98%) contrast(104%);
  z-index: 6;

  &:hover {
    filter: none;
    cursor: pointer;
  }

  @media ${breakpoints.tablet} {
    margin-left: 0;
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

  const scrollToName = name => {
    const navBar = document.getElementById(name);
    if (navBar) {
      window.scroll({
        top:
          navBar.parentElement.getBoundingClientRect().top + window.scrollY + 5,
        behavior: "smooth"
      });
    }
  };

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
        <LanguageContextConsumer>
          {context => (
            <StyledText>
              {birthday.listeningToVoicemailsFor[context.lang]}{" "}
              <span
                onClick={() => {
                  scrollToName(voicemailName);
                }}
              >
                {voicemailName}
              </span>
            </StyledText>
          )}
        </LanguageContextConsumer>
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
