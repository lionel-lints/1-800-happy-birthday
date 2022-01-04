import React, { useState, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import breakpoints from "@/utils/breakpoints";

import { Birthday, AudioPlayer } from "@/modules/birthday";

const StyledActiveNames = styled.div`
  position: relative;
  text-align: center;
  margin: 5rem 0 10rem 0;
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
  padding-top: 3rem;
  padding-bottom: 2rem;
  font-size: 4rem;
  line-height: 4rem;
  letter-spacing: -0.2rem;

  @media ${breakpoints.tablet} {
    font-size: 8rem;
    line-height: 8rem;
    letter-spacing: -0.5rem;

    &:hover {
      color: white;
      opacity: 1;
    }
  }

  @media ${breakpoints.laptop} {
    font-size: 15rem;
    letter-spacing: -1rem;
    line-height: 14rem;
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
  padding: 1rem 2%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: -webkit-sticky;
  position: sticky;
  top: -3px;
`;

const StyledNameNavigationClose = styled.span`
  border: 1px solid transparent;

  &:hover {
    cursor: pointer;
    border-bottom: 1px solid red;
  }
`;

const StyledNameNavigationLeft = styled.div`
  font-family: RobotoMono;
  font-size: 1rem;
  line-height: 2rem;
  text-transform: uppercase;
  margin-right: auto;
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const StyledNameNavigationName = styled.div`
  font-family: BradleyMicro;
  color: red;
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
  setVoicemailName
}) => {
  const [activeIDs, setActiveIDs] = useState([]);

  const container = useRef(null);

  const handleOpenBirthday = id => {
    setActiveIDs([...activeIDs, id]);
  };

  const handleCloseBirthday = id => {
    const newActiveIDs = activeIDs.filter(item => item !== id);
    setActiveIDs(newActiveIDs);
  };

  const closeBirthday = (event, id) => {
    event.stopPropagation();
    handleCloseBirthday(id);
  };

  const isBirthdayOpen = id => {
    return activeIDs.includes(id);
  };

  const openBirthday = id => {
    if (!isBirthdayOpen(id)) {
      handleOpenBirthday(id);
    }
  };

  const scrollToBirthday = (event, id) => {
    event.stopPropagation();
  };

  useLayoutEffect(() => {
    if (container && container.current) {
      window.scroll({
        top: container.current.getBoundingClientRect().top + window.scrollY + 5,
        behavior: "smooth"
      });
    }
  }, [activeIDs]);

  return (
    <StyledActiveNamesWrapper>
      <StyledActiveNames>
        {Object.keys(data).map((id, index) => {
          const isLive = !!data[id]["Live Voicemail Number"];
          const name = data[id].Name;
          const dobField = data[id].dob;
          const voicemails = data[id].Voicemails;

          // TODO: image rotate + left/right: random number between range

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
                  {isBirthdayOpen(id) && (
                    <StyledNameNavigation
                      ref={container}
                      onClick={event => scrollToBirthday(event, id)}
                      id={name}
                    >
                      <StyledNameNavigationLeft>
                        <StyledNameNavigationClose
                          onClick={event => closeBirthday(event, id)}
                        >
                          Close
                        </StyledNameNavigationClose>
                      </StyledNameNavigationLeft>
                      <StyledNameNavigationName>
                        {name}
                      </StyledNameNavigationName>
                      <StyledNameNavigationRight>
                        {voicemails && voicemails.length > 0 ? (
                          <AudioPlayer
                            sources={voicemails.map(voicemail => voicemail.url)}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            setActiveVoicemail={setActiveVoicemail}
                            activeVoicemail={activeVoicemail}
                            setVoicemailName={() => {
                              setVoicemailName(name);
                            }}
                            type="icon"
                          />
                        ) : null}
                      </StyledNameNavigationRight>
                    </StyledNameNavigation>
                  )}

                  {!isBirthdayOpen(id) && (
                    <StyledDate className="date">{dob.join(" ")}</StyledDate>
                  )}

                  {!isBirthdayOpen(id) && <StyledName>{name}</StyledName>}

                  {photoUrl && !isBirthdayOpen(id) && (
                    <StyledImg src={photoUrl} isEven={index % 2 === 0} />
                  )}

                  <StyledBirthdayWrapper isOpen={isBirthdayOpen(id)}>
                    {isBirthdayOpen(id) ? (
                      <Birthday
                        data={data}
                        id={id}
                        isOpen={isBirthdayOpen(id)}
                        animatedHeight={isBirthdayOpen(id) ? "auto" : 0}
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
  setVoicemailName: PropTypes.func.isRequired
};

ActiveNames.defaultProps = {
  data: {}
};

export default ActiveNames;
