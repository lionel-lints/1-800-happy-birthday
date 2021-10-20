import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";

import Attachments from "@/modules/birthday/Attachments.js";
import AudioPlayer from "@/modules/birthday/AudioPlayer.js";
import AudioAnalyser from "@/modules/birthday/AudioAnalyser.js";

import Voicemails from "@/modules/renderers/Voicemails.js";
import { LanguageContextConsumer } from "@/modules/_common";

const StyledTextPosition = styled.div`
  width: 100%;
  height: 10%;
  position: absolute;
  bottom: 50%;
`;

const StyledName = styled.h1`
  font-family: BradleyDisplay, serif;
  font-size: 100px;
  font-size: calc(8vw + 8vh + 2vmin);
  text-align: center;
`;

const StyledDates = styled.h2`
  font-family: Pinyon Script;
  font-size: 100px;
  font-size: calc(1vw + 2vh + 1vmin);
  text-align: center;
`;

const StyledDiv = styled.div`
  width: 100%;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledSection = styled.section`
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  position: relative;
  height: 100vh;
`;

const StyledImg = styled.img`
  -webkit-filter: grayscale(100%) brightness(0.5); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%) brightness(0.5);
  max-width: 100%;
  min-width: 50%;
  max-height: 100%;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
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

    return `${birth === "Fetcha inválida" ? "Desconocido" : birth} al ${
      death === "Fetcha inválida" ? "Desconocido" : death
    }`;
  }

  const birth = moment(dob)
    .locale("en")
    .format("MMMM Do, YYYY");
  const death = moment(dod)
    .locale("en")
    .format("MMMM Do, YYYY");

  return `${birth === "Invalid date" ? "Unknown" : birth} to ${
    death === "Invalid date" ? "Unknown" : death
  }`;
};

const Layout = ({
  name = "Unknown",
  DOB = "Unknown",
  DOD = "Unknown",
  photoArr = [],
  voicemails = [],
  voicemailNumber = "",
  quote = ""
}) => {
  return (
    <LanguageContextConsumer>
      {context => (
        <StyledSection>
          <StyledDiv>
            {photoArr.length > 0 ? (
              <StyledImg src={getPhotoURL(photoArr)} />
            ) : null}
            <StyledTextPosition>
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
            </StyledTextPosition>
          </StyledDiv>
        </StyledSection>
      )}
    </LanguageContextConsumer>
  );
};

export default Layout;
