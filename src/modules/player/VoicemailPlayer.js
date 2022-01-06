import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import breakpoints from "@/utils/breakpoints";

import Play from "@/assets/icons/play.svg";
import Pause from "@/assets/icons/pause.svg";

import { AudioAnalyser, AudioPlayer } from "@/modules/player";

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

const StyledVoicemailPlayer = styled.div`
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

const VoicemailPlayer = ({
  data,
  isVisible,
  isPlaying,
  setIsPlaying,
  voicemailID,
  setActiveVoicemail,
  activeVoicemail
}) => {
  const [howlerContext, setHowlerContext] = useState(null);
  const [person, setPerson] = useState({});

  useEffect(() => {
    setHowlerContext(window.Howler.ctx);
  });

  useEffect(() => {
    if (data[voicemailID]) setPerson(data[voicemailID]);
  }, [voicemailID]);

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
    <StyledVoicemailPlayer isVisible={isVisible}>
      {person.Voicemails && person.Voicemails.length > 0 ? (
        <AudioPlayer
          sources={person.Voicemails.map(voicemail => voicemail.url)}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setActiveVoicemail={setActiveVoicemail}
          activeVoicemail={activeVoicemail}
        />
      ) : null}
      {howlerContext ? <AudioAnalyser isPlaying={isPlaying} /> : null}
      {person.Name ? (
        <LanguageContextConsumer>
          {context => (
            <StyledText>
              {birthday.listeningToVoicemailsFor[context.lang]}{" "}
              <span
                onClick={() => {
                  scrollToName(person.Name);
                }}
              >
                {person.Name}
              </span>
            </StyledText>
          )}
        </LanguageContextConsumer>
      ) : null}
    </StyledVoicemailPlayer>
  );
};

VoicemailPlayer.propTypes = {
  isVisible: PropTypes.bool,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  voicemailID: PropTypes.string.isRequired
};

VoicemailPlayer.defaultProps = { isVisible: false };

export default VoicemailPlayer;
