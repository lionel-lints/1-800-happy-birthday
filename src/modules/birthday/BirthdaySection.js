import React, { useState, useEffect, useLayoutEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";
import AnimateHeight from "react-animate-height";

import Voicemails from "@/modules/renderers/Voicemails.js";
import { LanguageContextConsumer } from "@/modules/_common";

import breakpoints from "@/utils/breakpoints";

const StyledBirthdaySection = styled.section`
  background: black;
  z-index: 5;
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 2s ease-in-out;
`;

const StyledDetailsWrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 2;
  margin-top: 30%;
`;

const StyledName = styled.h1`
  font-family: BradleyMicro;
  font-size: calc(8vw + 8vh + 2vmin);
  text-align: center;
  letter-spacing: -9px;
  margin: 0 5%;
`;

const StyledDates = styled.h2`
  font-family: PinyonScript;
  font-weight: 400;
  font-variation-settings: "wght" 400;
  font-feature-settings: "kern";
  font-size: 1.5rem;
  text-align: center;
  margin: 1rem 5%;
  margin-top: 0;

  span {
    display: block;
  }

  @media ${breakpoints.tablet} {
    font-size: 2rem;
  }

  @media ${breakpoints.laptop} {
    span {
      font-size: 3rem;
      display: inline-block;
      padding: 0 12px;
    }
  }
`;

const StyledDiv = styled.div`
  width: 100%;
  margin: auto;
`;

const StyledImg = styled.div`
  background-image: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 70%,
      black 100%
    ),
    url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  filter: grayscale(100%) brightness(0.8) opacity(0.8);

  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  height: 40%;

  margin: 0 5%;

  @media ${breakpoints.tablet} {
    margin: auto;
    max-width: 75%;
  }

  @media ${breakpoints.laptop} {
    margin: auto;
    max-width: 50%;
  }
`;

const StyledQuote = styled.div`
  font-family: PinyonScript;
  font-size: 3rem;
  line-height: 4rem;
  margin: 0 5%;
`;

const StyledAttribution = styled.div`
  font-family: RobotoMono;
  color: red;
  font-size: 1rem;
  margin-top: 1rem;
`;

const StyledDonate = styled.div`
  font-family: BradleyMicro;
  display: inline-block;
  font-size: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 3px solid red;
  margin-top: 4rem;
  transition: border-color 0.25s ease-in-out;

  @media ${breakpoints.laptop} {
    font-size: 2rem;
    line-height: calc(2rem * 1.3);
  }

  &:hover {
    border-color: white;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

const StyledActionWrapper = styled.div`
  margin-bottom: 5rem;
`;

const StyledActionHeader = styled.div`
  font-family: BradleyMicro;
  display: inline-block;
  font-size: 1rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 3px solid white;
  padding-top: 4rem;
  transition: all 0.25s ease-in-out;
  color: red;

  @media ${breakpoints.laptop} {
    font-size: 2rem;
    line-height: calc(2rem * 1.3);
  }

  &:hover {
    color: white;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: white;

    &:hover {
      color: red;
    }
  }
`;

const StyledAction = styled.div`
  font-family: RobotoMono;
  font-size: 1.25rem;
  margin-top: 2rem;

  > div:nth-child(2) {
    color: red;
    text-decoration: underline;
    margin-top: 1rem;
    transition: color 0.25s ease-in-out;

    &:hover {
      cursor: pointer;
      color: white;
    }
  }
`;

const StyledContactUs = styled.div`
  width: 100%;
  font-family: RobotoMono;
  color: red;
  font-size: 1rem;
  margin: 2rem 0;
  margin-bottom: 5rem;

  a {
    transition: color 0.25s ease-in-out;
    color: red;
    text-decoration: none;

    &:hover {
      color: white;
    }
  }
`;

const getPhotoURL = arr => {
  return arr[Math.floor(Math.random() * arr.length)].url;
};

const getDateString = (lang, dob, dod) => {
  if (lang === "es") {
    const birth = moment(dob)
      .locale("es")
      .format("LL");
    const death = moment(dod)
      .locale("es")
      .format("LL");

    return (
      <>
        <span>{birth === "Fetcha inválida" ? "Desconocido" : birth}</span>
        <span>al</span>
        <span>{death === "Fetcha inválida" ? "Desconocido" : death}</span>
      </>
    );
  }

  const birth = moment(dob)
    .locale("en")
    .format("MMMM Do, YYYY");
  const death = moment(dod)
    .locale("en")
    .format("MMMM Do, YYYY");

  return (
    <>
      <span>{birth === "Invalid date" ? "Unknown" : birth}</span>
      <span>to</span>
      <span>{death === "Invalid date" ? "Unknown" : death}</span>
    </>
  );
};

function getCoords(elem) {
  // crossbrowser version
  const box = elem.getBoundingClientRect();

  const { body } = document;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

const BirthdaySection = ({
  name = "Unknown",
  DOB = "Unknown",
  DOD = "Unknown",
  photo = [],
  voicemails = [],
  voicemailNumber = "",
  quote = "Mario always told me to keep fighting. I will always fight for Mario, I will be his voice.",
  actions = "",
  donation = ""
}) => {
  const [height, setHeight] = useState(0);
  const [actionsHeight, setActionsHeight] = useState(0);

  useEffect(() => {
    setHeight("auto");
  }, [name]);

  useLayoutEffect(() => {
    const section = document.getElementById("birthday-section");
    const { top } = getCoords(section);

    window.scrollTo({
      top
    });
  }, [name]);

  const expandActions = () => {
    if (actionsHeight === 0) {
      setActionsHeight("auto");
    } else {
      setActionsHeight(0);
    }
  };

  return (
    <LanguageContextConsumer>
      {context => (
        <AnimateHeight id="birthday-section" duration={2000} height={height}>
          <StyledBirthdaySection>
            <StyledDiv>
              {photo.length > 0 ? <StyledImg src={getPhotoURL(photo)} /> : null}
              <StyledDetailsWrapper>
                <StyledName>{name}</StyledName>
                <StyledDates>
                  {getDateString(context.lang, DOB, DOD)}
                </StyledDates>
                {voicemails.length > 0 ? (
                  <Voicemails
                    lang={context.lang}
                    vms={voicemails}
                    name={name.split(" ")[0]}
                    voicemailNumber={voicemailNumber}
                  />
                ) : null}
              </StyledDetailsWrapper>
              <>
                {!!quote && (
                  <>
                    <StyledQuote>{quote}</StyledQuote>
                    <StyledAttribution>{`- ${name}`}</StyledAttribution>
                  </>
                )}
                <StyledDonate>
                  <a href={donation} rel="noreferrer" target="_blank">
                    {`Donate to ${name.split(" ")[0]}'s family`}
                  </a>
                </StyledDonate>
                <StyledActionWrapper>
                  <StyledActionHeader onClick={expandActions}>
                    {`Take action for ${name.split(" ")[0]}`}
                  </StyledActionHeader>
                  <AnimateHeight
                    id="birthday-actions"
                    duration={1000}
                    height={actionsHeight}
                  >
                    <StyledAction>
                      <div>Attorney General: Josh Kaul</div>
                      <div>608-266-1221</div>
                    </StyledAction>
                    <StyledAction>
                      <div>Mayor: Satya Rhodes-Conway</div>
                      <div>608-266-1221</div>
                    </StyledAction>
                    <StyledAction>
                      <div>Dane County District Attorney: Ismael R. Ozanne</div>
                      <div>608-266-1221</div>
                    </StyledAction>
                  </AnimateHeight>
                </StyledActionWrapper>
                <StyledContactUs>
                  <a href="https://cash.app/$1800HBD" target="_blank">
                    Contact us to feature your family member.
                  </a>
                </StyledContactUs>
              </>
            </StyledDiv>
          </StyledBirthdaySection>
        </AnimateHeight>
      )}
    </LanguageContextConsumer>
  );
};

export default BirthdaySection;
