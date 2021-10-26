import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";

import Voicemails from "@/modules/renderers/Voicemails.js";
import { LanguageContextConsumer } from "@/modules/_common";

import breakpoints from "@/utils/breakpoints";

const StyledBirthdaySection = styled.section`
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledDetailsWrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 2;
  margin-top: 50%;
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
      transparent 10%,
      black 100%
    ),
    url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  filter: grayscale(100%) brightness(0.8);

  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;

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

const Layout = ({
  name = "Unknown",
  DOB = "Unknown",
  DOD = "Unknown",
  photo = [],
  voicemails = [],
  voicemailNumber = "",
  quote = ""
}) => {
  return (
    <LanguageContextConsumer>
      {context => (
        <StyledBirthdaySection>
          <StyledDiv>
            {photo.length > 0 ? <StyledImg src={getPhotoURL(photo)} /> : null}
            <StyledDetailsWrapper>
              <StyledName>{name}</StyledName>
              <StyledDates>{getDateString(context.lang, DOB, DOD)}</StyledDates>
              {voicemails.length > 0 ? (
                <Voicemails
                  lang={context.lang}
                  vms={voicemails}
                  name={name.split(" ")[0]}
                  voicemailNumber={voicemailNumber}
                />
              ) : null}
            </StyledDetailsWrapper>
          </StyledDiv>
        </StyledBirthdaySection>
      )}
    </LanguageContextConsumer>
  );
};

export default Layout;
