import React, { useEffect, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { birthday } from "@/assets/locales/data.json";
import breakpoints from "@/utils/breakpoints";

import { Birthday } from "@/modules/birthday";
import { AudioPlayer } from "@/modules/player";
import { LanguageContextConsumer, CloseIcon } from "@/modules/_common";

const StyledNames = styled.div`
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
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='50' height='60' viewport='0 0 100 100' style='fill:black;font-size:30px;'><text y='50%'>🎂</text></svg>")
        16 0,
      auto;

    @media ${breakpoints.tablet} {
      div.date,
      img {
        opacity: 1;
      }

      .date {
        color: red;
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

  @media ${breakpoints.desktop} {
    font-size: 12rem;
    letter-spacing: -1rem;
    line-height: 13rem;
  }
`;

const StyledDate = styled.div`
  z-index: 1;
  color: white;
  opacity: 0.4;
  font-family: PinyonScript;
  font-size: 2rem;
  transition: opacity 0.25s ease-in-out;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;

  @media ${breakpoints.tablet} {
    font-size: 4rem;
    height: 40px;
  }

  @media ${breakpoints.laptop} {
    font-size: 6rem;
    opacity: 0;
    color: red;
    height: 60px;
  }
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

const StyledFeaturedNames = styled.div`
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
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='50' height='60' viewport='0 0 100 100' style='fill:black;font-size:30px;'><text y='50%'>🎂</text></svg>")
      16 0,
    auto;

  position: -webkit-sticky;
  position: sticky;
  top: -3px;
  transition: opacity 0.5s ease-in-out;

  &.fadeOut {
    opacity: 0;
  }
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
      cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='50' height='60' viewport='0 0 100 100' style='fill:black;font-size:30px;'><text y='50%'>🎂</text></svg>")
          16 0,
        auto;
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

const Names = ({
  data,
  setActiveVoicemail,
  isPlaying,
  setIsPlaying,
  activeID,
  setActiveID,
  togglePlay,
  playPrevious,
  playNext
}) => {
  const stickyNav = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        e.target.classList.toggle("fadeOut", e.intersectionRatio < 0.75);
      },
      {
        threshold: [0.75]
      }
    );

    if (stickyNav.current) observer.observe(stickyNav.current);

    return () => {
      if (stickyNav.current) observer.unobserve(stickyNav.current);
    };
  });

  useLayoutEffect(() => {
    if (stickyNav && stickyNav.current) {
      window.scroll({
        top: stickyNav.current.getBoundingClientRect().top + window.scrollY + 5
      });
    }
  }, [activeID]);

  const closeBirthday = event => {
    event.stopPropagation();
    setActiveID("");
    setActiveVoicemail("");
    setIsPlaying(false);
  };

  const openBirthday = id => {
    setActiveID(id);
    setActiveVoicemail("");
    setIsPlaying(false);
  };

  const getFirstName = name => {
    return name.split(" ")[0];
  };

  return (
    <StyledFeaturedNames>
      <StyledNames>
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
          if (data[id]["Thumbnail Photo"]) {
            photoUrl = data[id]["Thumbnail Photo"][0].url;
          }

          return (
            <StyledWrapper onClick={() => openBirthday(id)} key={name}>
              {isLive ? (
                <>
                  {activeID === id && (
                    <StyledNameNavigation
                      ref={stickyNav}
                      id={name}
                      onClick={event => {
                        event.stopPropagation();
                      }}
                    >
                      <StyledNameNavigationLeft />
                      <StyledNameNavigationMiddle>
                        {voicemails && voicemails.length > 0 ? (
                          <AudioPlayer
                            isPlaying={isPlaying}
                            togglePlay={togglePlay}
                            playPrevious={playPrevious}
                            playNext={playNext}
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

                  <StyledNameWrapper isOpen={activeID === id} id={id}>
                    <StyledDate className="date">{dob.join(" ")}</StyledDate>
                    <StyledName>{name}</StyledName>
                    {photoUrl ? (
                      <StyledImg src={photoUrl} isEven={index % 2 === 0} />
                    ) : null}
                  </StyledNameWrapper>

                  <StyledBirthdayWrapper isOpen={activeID === id}>
                    {activeID === id ? (
                      <Birthday data={data} id={id} isOpen={activeID === id} />
                    ) : null}
                  </StyledBirthdayWrapper>
                </>
              ) : null}
            </StyledWrapper>
          );
        })}
      </StyledNames>
    </StyledFeaturedNames>
  );
};

Names.propTypes = {
  data: PropTypes.shape({
    fields: PropTypes.shape({
      dob: PropTypes.string,
      "Voicemail Number": PropTypes.string,
      Name: PropTypes.string
    }),
    id: PropTypes.string
  }),
  setActiveVoicemail: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  playPrevious: PropTypes.func.isRequired,
  playNext: PropTypes.func.isRequired,
  setActiveID: PropTypes.func.isRequired,
  activeID: PropTypes.string.isRequired
};

Names.defaultProps = {
  data: {}
};

export default Names;
