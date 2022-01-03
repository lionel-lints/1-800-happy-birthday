import React, { useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";
import AnimateHeight from "react-animate-height";

import { Voicemails } from "@/modules/renderers";
import { LanguageContextConsumer } from "@/modules/_common";

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
  margin-top: 30%;
`;

const StyledName = styled.h1`
  font-family: BradleyMicro;
  font-size: calc(8vw + 8vh + 2vmin);
  text-align: center;
  letter-spacing: -16px;
  margin: 0 5%;
`;

const StyledDates = styled.h2`
  font-family: PinyonScript;
  font-weight: 400;
  font-variation-settings: "wght" 400;
  font-feature-settings: "kern";
  font-size: 2rem;
  text-align: center;
  margin: 1rem 5%;
  margin-top: 0;

  span {
    display: block;
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

const StyledDonate = styled.div`
  font-family: BradleyMicro;
  display: inline-block;
  font-size: 2rem;
  line-height: calc(2rem * 1.3);
  padding: 1rem;
  margin-right: 1rem;
  border: 3px solid red;
  transition: border-color 0.25s ease-in-out;

  &:hover {
    border-color: white;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

const StyledTakeActionContainer = styled.div`
  opacity: ${p => (p.isOpen ? 1 : 0)};
  z-index: ${p => (p.isOpen ? 10 : 0)};
  transition: opacity 0.25s ease-in-out;
  border: 3px solid white;
  padding: 2rem;
  max-width: 450px;
  transform: rotate(3deg);
  background: black;

  @media ${breakpoints.laptop} {
    position: absolute;
    right: 26%;
  }
`;

const StyledTakeActionHeader = styled.div`
  font-family: BradleyMicro;
  display: inline-block;
  font-size: 2rem;
  line-height: calc(2rem * 1.3);
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
`;

const StyledTakeActionHeaderOpen = styled.div`
  font-family: BradleyMicro;
  display: inline-block;
  font-size: 2rem;
  line-height: calc(2rem * 1.3);
  padding-bottom: 0.5rem;
  border-bottom: 2px solid white;

  a {
    text-decoration: none;
    color: white;
  }
`;

const StyledTakeActionCloseButton = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  left: 0;
  top: 0;
  font-family: RobotoMono;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
  font-variation-settings: "wght" 500;
  transition: color 0.25s ease-in-out;

  &:hover {
    cursor: pointer;
    color: red;
  }
`;

const StyledAction = styled.div`
  font-family: RobotoMono;
  font-size: 1.25rem;
  line-height: 1.5rem;
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
  voicemails,
  voicemailNumber,
  quote,
  quoteAttribution,
  donation,
  animatedHeight,
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
        <AnimateHeight
          id="birthday-section"
          duration={1000}
          height={animatedHeight}
        >
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
                    <StyledQuote>{`“${quote}”`}</StyledQuote>
                    {!!quoteAttribution && (
                      <StyledAttribution>{`- ${quoteAttribution}`}</StyledAttribution>
                    )}
                  </>
                )}
                <StyledActions>
                  <StyledDonate>
                    <a href={donation} rel="noreferrer" target="_blank">
                      Donate
                    </a>
                  </StyledDonate>
                  <StyledTakeActionHeader
                    isOpen={actionsOpen}
                    onClick={handleOpenActions}
                  >
                    {`Take action for ${name.split(" ")[0]}`}
                  </StyledTakeActionHeader>
                  <StyledTakeActionContainer isOpen={actionsOpen}>
                    <StyledTakeActionCloseButton onClick={handleOpenActions}>
                      X
                    </StyledTakeActionCloseButton>
                    <StyledTakeActionHeaderOpen>
                      {`Take action for ${name.split(" ")[0]}`}
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
        </AnimateHeight>
      )}
    </LanguageContextConsumer>
  );
};

BirthdaySection.propTypes = {
  name: PropTypes.string,
  DOB: PropTypes.string,
  DOD: PropTypes.string,
  photo: PropTypes.instanceOf(Array),
  voicemails: PropTypes.instanceOf(Array),
  voicemailNumber: PropTypes.string,
  quote: PropTypes.string,
  quoteAttribution: PropTypes.string,
  callToActionText1: PropTypes.string,
  callToActionText2: PropTypes.string,
  callToActionText3: PropTypes.string,
  callToActionLink1: PropTypes.string,
  callToActionLink2: PropTypes.string,
  callToActionLink3: PropTypes.string,
  donation: PropTypes.string,
  animatedHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

BirthdaySection.defaultProps = {
  name: "Unknown",
  DOB: "Unknown",
  DOD: "Unknown",
  photo: [],
  voicemails: [],
  voicemailNumber: "",
  quote: "",
  quoteAttribution: "",
  callToActionText1: "",
  callToActionText2: "",
  callToActionText3: "",
  callToActionLink1: "",
  callToActionLink2: "",
  callToActionLink3: "",
  donation: "",
  animatedHeight: 0
};

export default BirthdaySection;
