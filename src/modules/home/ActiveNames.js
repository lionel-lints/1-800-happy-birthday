import React, { useState, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { birthday } from "@/assets/locales/data.json";
import breakpoints from "@/utils/breakpoints";

import { Birthday } from "@/modules/birthday";
import { AudioPlayer } from "@/modules/player";
import { LanguageContextConsumer, CloseIcon } from "@/modules/_common";

const StyledActiveNames = styled.div`
  position: relative;
  text-align: center;
  margin: 2rem 0;
`;

const StyledNameWrapper = styled.div`
  display: ${p => (p.isOpen ? "none" : "block")};
`;

const StyledWrapper = styled.div`
  position: relative;
  transition: all 0.25s ease-in-out;

  &:hover {
    cursor: pointer;

    @media ${breakpoints.tablet} {
      div.date,
      img {
        opacity: 1;
      }
    }
  }
`;

const StyledName = styled.div`
  position: relative;
  font-family: BradleyMicro;
  color: red;
  transition: all 0.25s ease-in-out;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 4rem;
  line-height: 4rem;
  letter-spacing: -0.2rem;

  @media ${breakpoints.tablet} {
    font-size: 8rem;
    line-height: 8rem;
    letter-spacing: -0.5rem;
    padding-bottom: 0;

    &:hover {
      color: white;
      opacity: 1;
    }
  }

  @media ${breakpoints.laptop} {
    padding-top: 3rem;
    padding-bottom: 2rem;
    font-size: 15rem;
    letter-spacing: -1rem;
    line-height: 14rem;
  }

 ${"" /* TODO: */}
  @media ${breakpoints.desktop} {
    font-size: 12rem;
    letter-spacing: -1rem;
    line-height: 13rem;
  }
`;

const StyledDate = styled.div`
  z-index: 1;
  color: red;
  opacity: 0;
  font-family: PinyonScript;
  font-size: 6rem;
  transition: opacity 0.25s ease-in-out;
  width: 100%;
  height: 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const StyledImg = styled.img`
  position: absolute;
  transition: all 0.25s ease-in-out;
  opacity: 0;
  right: ${p => (p.isEven ? `inherit` : `20%`)};
  left: ${p => (p.isEven ? `20%` : `inherit`)};
  bottom: 20%;
  width: 200px;
  filter: grayscale(100%) brightness(0.8);
  transform: ${p => (p.isEven ? `rotate(-5deg)` : `rotate(5deg)`)};
  pointer-events: none;
  border: 3px solid red;
`;

const StyledBirthdayWrapper = styled.div`
  position: relative;
  z-index: 5;
  transition: all 0.5s ease-in-out;
  opacity: ${props => (props.isOpen ? 1 : 0)};
`;

const StyledActiveNamesWrapper = styled.div`
  position: relative;
`;

const StyledNameNavigation = styled.div`
  background: black;
  font-size: 3rem;
  border-top: 3px solid white;
  border-bottom: 3px solid white;
  padding: 0 2%;
  height: 80px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: -webkit-sticky;
  position: sticky;
  top: -3px;
`;

const StyledCloseButton = styled.div`
  display: none;

  @media ${breakpoints.tablet} {
    display: block;
  }
`;

const StyledNameNavigationLeft = styled.div`
  margin-right: auto;
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const StyledNameNavigationMiddle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledNameNavigationText = styled.div`
  font-family: BradleyMicro;
  font-size: 2rem;
  letter-spacing: -1px;
  color: white;
  z-index: 6;
  margin-top: 2px;

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

const ActiveNames = ({
  data,
  setActiveVoicemail,
  activeVoicemail,
  isPlaying,
  setIsPlaying,
  setVoicemailID
}) => {
  const [openID, setOpenID] = useState("");

  const container = useRef(null);

  const closeBirthday = event => {
    event.stopPropagation();
    setOpenID("");
    setActiveVoicemail("");
    setIsPlaying(false);
  };

  const openBirthday = id => {
    setOpenID(id);
    setActiveVoicemail("");
    setIsPlaying(false);
  };

  const getFirstName = name => {
    return name.split(" ")[0];
  };

  useLayoutEffect(() => {
    if (container && container.current) {
      window.scroll({
        top: container.current.getBoundingClientRect().top + window.scrollY + 5,
        behavior: "smooth"
      });
    }
  }, [openID]);

  return (
    <StyledActiveNamesWrapper>
      <StyledActiveNames>
        {Object.keys(data).map((id, index) => {
          const isLive = !!data[id]["Live Voicemail Number"];
          const name = data[id].Name;
          const dobField = data[id].dob;
          const voicemails = data[id].Voicemails;

          let dob;
          if (dobField) {
            dob = new Date(Date.parse(dobField));
            dob = dob.toDateString().split(" ");
            dob.shift();
            dob.pop();
          }

          let photoUrl;
          if (data[id]["Hero Photo"]) {
            photoUrl = data[id]["Hero Photo"][0].url;
          }

          return (
            <StyledWrapper onClick={() => openBirthday(id)} key={name}>
              {isLive ? (
                <>
                  {openID === id && (
                    <StyledNameNavigation
                      ref={container}
                      id={name}
                      onClick={event => {
                        event.stopPropagation();
                      }}
                    >
                      <StyledNameNavigationLeft />
                      <StyledNameNavigationMiddle>
                        {voicemails && voicemails.length > 0 ? (
                          <AudioPlayer
                            sources={voicemails.map(voicemail => voicemail.url)}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            setActiveVoicemail={setActiveVoicemail}
                            activeVoicemail={activeVoicemail}
                            setVoicemailID={() => {
                              setVoicemailID(id);
                            }}
                            showPlayOnly
                          />
                        ) : null}
                        <LanguageContextConsumer>
                          {context => (
                            <StyledNameNavigationText>
                              {`${
                                birthday.voicemailsFor[context.lang]
                              } ${getFirstName(name)}`}
                            </StyledNameNavigationText>
                          )}
                        </LanguageContextConsumer>
                      </StyledNameNavigationMiddle>
                      <StyledNameNavigationRight>
                        <StyledCloseButton
                          onClick={event => closeBirthday(event, id)}
                        >
                          <CloseIcon />
                        </StyledCloseButton>
                      </StyledNameNavigationRight>
                    </StyledNameNavigation>
                  )}

                  <StyledNameWrapper isOpen={openID === id}>
                    <StyledDate className="date">{dob.join(" ")}</StyledDate>
                    <StyledName>{name}</StyledName>
                    {photoUrl ? (
                      <StyledImg src={photoUrl} isEven={index % 2 === 0} />
                    ) : null}
                  </StyledNameWrapper>

                  <StyledBirthdayWrapper isOpen={openID === id}>
                    {openID === id ? (
                      <Birthday
                        data={data}
                        id={id}
                        isOpen={openID === id}
                        animatedHeight={openID === id ? "auto" : 0}
                      />
                    ) : null}
                  </StyledBirthdayWrapper>
                </>
              ) : null}
            </StyledWrapper>
          );
        })}
      </StyledActiveNames>
    </StyledActiveNamesWrapper>
  );
};

ActiveNames.propTypes = {
  data: PropTypes.shape({
    fields: PropTypes.shape({
      dob: PropTypes.string,
      "Voicemail Number": PropTypes.string,
      Name: PropTypes.string
    }),
    id: PropTypes.string
  }),
  setActiveVoicemail: PropTypes.func.isRequired,
  activeVoicemail: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  setVoicemailID: PropTypes.func.isRequired
};

ActiveNames.defaultProps = {
  data: {}
};

export default ActiveNames;
