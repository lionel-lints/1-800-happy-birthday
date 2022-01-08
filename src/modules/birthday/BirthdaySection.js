import React, { useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";

import { birthday } from "@/assets/locales/data.json";
import { PhoneNumber } from "@/modules/birthday";
import { LanguageContextConsumer, CloseIcon } from "@/modules/_common";

import breakpoints from "@/utils/breakpoints";

const StyledBirthdaySection = styled.section`
  z-index: 5;
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  position: relative;
  transition: all 2s ease-in-out;
`;

const StyledDetailsWrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 2;
  margin-top: 50%;

  @media ${breakpoints.laptop} {
    margin-top: 30%;
  }
`;

const StyledName = styled.h1`
  font-family: BradleyMicro;
  font-size: 4.5rem;
  letter-spacing: -5px;
  text-align: center;
  margin: 0 5%;
  margin-bottom: 1.5rem;

  @media ${breakpoints.laptop} {
    font-size: calc(8vw + 8vh + 2vmin);
    letter-spacing: -16px;
    margin-bottom: 0;
  }

  @media ${breakpoints.desktop} {
    font-size: 12rem;
    letter-spacing: -1rem;
    line-height: 13rem;
  }
`;

const StyledDates = styled.h2`
  font-family: PinyonScript;
  font-weight: 400;
  font-variation-settings: "wght" 400;
  font-feature-settings: "kern";
  font-size: 2rem;
  text-align: center;
  margin: 0 5%;
  margin-bottom: 2rem;

  span {
    display: block;
  }

  @media ${breakpoints.laptop} {
    margin-bottom: 1rem;

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
  z-index: -1;
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
  height: 20%;
  margin: 0 5%;

  @media ${breakpoints.tablet} {
    height: 40%;
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
  font-size: 2rem;
  line-height: 3rem;
  margin: 0 10%;
  margin-top: 5rem;

  @media ${breakpoints.tablet} {
    font-size: 3rem;
    line-height: 4rem;
  }
`;

const StyledAttribution = styled.div`
  font-family: RobotoMono;
  color: red;
  font-size: 1rem;
  margin-top: 1rem;
`;

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5rem 0;
`;

const StyledTakeActionContainer = styled.div`
  opacity: ${p => (p.isOpen ? 1 : 0)};
  z-index: ${p => (p.isOpen ? 10 : 0)};
  transition: opacity 0.25s ease-in-out;
  border-top: 3px solid white;
  border-bottom: 3px solid white;
  padding: 2rem;
  width: 100% - 2rem;
  background: black;
  position: absolute;
  bottom: 1rem;
  overflow: scroll;
  max-width: calc(100% - 4rem);

  @media ${breakpoints.tablet} {
    max-width: 450px;
    width: auto;
    border: 3px solid white;
    bottom: 0;
  }
`;

const StyledTakeActionHeader = styled.div`
  font-family: BradleyMicro;
  display: inline-block;
  font-size: 1.5rem;
  line-height: calc(1.5rem * 1.2);
  padding: 1rem;
  border: 3px solid red;
  transition: all 0.25s ease-in-out;
  z-index: 1;
  opacity: ${p => (p.isOpen ? 0 : 1)};

  &:hover {
    border-color: white;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: white;
  }

  @media ${breakpoints.tablet} {
    font-size: 2rem;
    line-height: calc(2rem * 1.2);
  }
`;

const StyledTakeActionHeaderOpen = styled.div`
  font-family: BradleyMicro;
  display: inline-block;
  font-size: 1.5rem;
  line-height: calc(1.5rem * 1.2);
  padding-bottom: 0.5rem;
  border-bottom: 2px solid white;

  a {
    text-decoration: none;
    color: white;
  }

  @media ${breakpoints.tablet} {
    font-size: 2rem;
    line-height: calc(2rem * 1.2);
  }
`;

const StyledTakeActionCloseButton = styled.div`
  position: absolute;
  left: 1rem;
  top: 1rem;
`;

const StyledAction = styled.div`
  font-family: RobotoMono;
  font-size: 1rem;
  line-height: 1.2rem;
  margin-top: 1.5rem;

  a {
    color: red;
    text-decoration: underline;
    margin-top: 0.5rem;
    transition: color 0.25s ease-in-out;

    &:hover {
      cursor: pointer;
      color: white;
    }
  }

  @media ${breakpoints.tablet} {
    font-size: 1.25rem;
    line-height: 1.5rem;
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

const BirthdaySection = ({
  name,
  DOB,
  DOD,
  photo,
  voicemailNumber,
  quote,
  quoteAttribution,
  callToActionText1,
  callToActionText2,
  callToActionText3,
  callToActionLink1,
  callToActionLink2,
  callToActionLink3
}) => {
  const [actionsOpen, setActionsOpen] = useState(false);

  const handleOpenActions = () => {
    setActionsOpen(!actionsOpen);
  };

  const isPhoneNumber = link => {
    const phoneRegex = /^[0-9+()#.\s/ext-]+$/;
    return phoneRegex.test(link);
  };

  return (
    <LanguageContextConsumer>
      {context => (
        <StyledBirthdaySection>
          <StyledDiv>
            {photo.length > 0 ? <StyledImg src={getPhotoURL(photo)} /> : null}
            <StyledDetailsWrapper>
              <StyledName>{name}</StyledName>
              <StyledDates>{getDateString(context.lang, DOB, DOD)}</StyledDates>
              {voicemailNumber ? (
                <PhoneNumber
                  lang={context.lang}
                  voicemailNumber={voicemailNumber}
                />
              ) : null}
            </StyledDetailsWrapper>
            <>
              {!!quote && (
                <>
                  <StyledQuote>{`“${quote}”`}</StyledQuote>
                  {!!quoteAttribution && (
                    <StyledAttribution>{`- ${quoteAttribution}`}</StyledAttribution>
                  )}
                </>
              )}
              <StyledActions>
                <StyledTakeActionHeader
                  isOpen={actionsOpen}
                  onClick={handleOpenActions}
                >
                  {`${birthday.takeAction[context.lang]} ${name.split(" ")[0]}`}
                </StyledTakeActionHeader>
                <StyledTakeActionContainer isOpen={actionsOpen}>
                  <StyledTakeActionCloseButton onClick={handleOpenActions}>
                    <CloseIcon />
                  </StyledTakeActionCloseButton>
                  <StyledTakeActionHeaderOpen>
                    {`${birthday.takeAction[context.lang]} ${
                      name.split(" ")[0]
                    }`}
                  </StyledTakeActionHeaderOpen>
                  <StyledAction>
                    <div>{callToActionText1}</div>
                    {isPhoneNumber(callToActionLink1) ? (
                      <a href={`tel:${callToActionLink1}`}>
                        {callToActionLink1}
                      </a>
                    ) : (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={callToActionLink1}
                      >
                        {callToActionLink1}
                      </a>
                    )}
                  </StyledAction>
                  <StyledAction>
                    <div>{callToActionText2}</div>
                    {isPhoneNumber(callToActionLink1) ? (
                      <a href={`tel:${callToActionLink2}`}>
                        {callToActionLink2}
                      </a>
                    ) : (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={callToActionLink2}
                      >
                        {callToActionLink2}
                      </a>
                    )}
                  </StyledAction>
                  <StyledAction>
                    <div>{callToActionText3}</div>
                    {isPhoneNumber(callToActionLink1) ? (
                      <a href={`tel:${callToActionLink3}`}>
                        {callToActionLink3}
                      </a>
                    ) : (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={callToActionLink3}
                      >
                        {callToActionLink3}
                      </a>
                    )}
                  </StyledAction>
                </StyledTakeActionContainer>
              </StyledActions>
            </>
          </StyledDiv>
        </StyledBirthdaySection>
      )}
    </LanguageContextConsumer>
  );
};

BirthdaySection.propTypes = {
  name: PropTypes.string,
  DOB: PropTypes.string,
  DOD: PropTypes.string,
  photo: PropTypes.instanceOf(Array),
  voicemailNumber: PropTypes.string,
  quote: PropTypes.string,
  quoteAttribution: PropTypes.string,
  callToActionText1: PropTypes.string,
  callToActionText2: PropTypes.string,
  callToActionText3: PropTypes.string,
  callToActionLink1: PropTypes.string,
  callToActionLink2: PropTypes.string,
  callToActionLink3: PropTypes.string
};

BirthdaySection.defaultProps = {
  name: "Unknown",
  DOB: "Unknown",
  DOD: "Unknown",
  photo: [],
  voicemailNumber: "",
  quote: "",
  quoteAttribution: "",
  callToActionText1: "",
  callToActionText2: "",
  callToActionText3: "",
  callToActionLink1: "",
  callToActionLink2: "",
  callToActionLink3: ""
};

export default BirthdaySection;
