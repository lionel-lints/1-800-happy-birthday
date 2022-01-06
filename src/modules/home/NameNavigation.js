import React from "react";
import styled from "styled-components";

import { birthday } from "@/assets/locales/data.json";

import { AudioPlayer } from "@/modules/player";
import { LanguageContextConsumer, CloseIcon } from "@/modules/_common";

const StyledNameNavigation = styled.div`
  background: black;
  font-size: 3rem;
  border-top: 3px solid white;
  border-bottom: 3px solid white;
  padding: 1rem 2%;
  height: 80px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: -webkit-sticky;
  position: sticky;
  top: -3px;
`;

const StyledCloseButton = styled.div``;

const StyledNameNavigationLeft = styled.div`
  margin-right: auto;
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const StyledNameNavigationMiddle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledNameNavigationText = styled.div`
  font-family: RobotoMono;
  font-size: 1rem;
  line-height: 1.2rem;
  color: white;
  z-index: 6;
  margin-bottom: 1rem;

  span {
    border-bottom: 1px solid black;

    &:hover {
      cursor: pointer;
      border-bottom: 1px solid transparent;
    }
  }
`;

const StyledNameNavigationRight = styled.div`
  margin-left: auto;
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const NameNavigation = ({
  openID,
  id,
  containerRef,
  name,
  voicemails,
  closeBirthday,
  isPlaying,
  setIsPlaying,
  setActiveVoicemail,
  activeVoicemail
}) => {
  return openID === id ? (
    <StyledNameNavigation ref={containerRef} id={name}>
      <StyledNameNavigationLeft />
      <StyledNameNavigationMiddle>
        <LanguageContextConsumer>
          {context => (
            <StyledNameNavigationText>
              {`${birthday.voicemailsFor[context.lang]} ${name}`}
            </StyledNameNavigationText>
          )}
        </LanguageContextConsumer>
        {voicemails && voicemails.length > 0 ? (
          <AudioPlayer
            sources={voicemails.map(voicemail => voicemail.url)}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setActiveVoicemail={setActiveVoicemail}
            activeVoicemail={activeVoicemail}
          />
        ) : null}
      </StyledNameNavigationMiddle>
      <StyledNameNavigationRight>
        <StyledCloseButton onClick={event => closeBirthday(event, id)}>
          <CloseIcon />
        </StyledCloseButton>
      </StyledNameNavigationRight>
    </StyledNameNavigation>
  ) : null;
};

export default NameNavigation;
