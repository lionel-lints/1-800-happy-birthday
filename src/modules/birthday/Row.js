import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import _ from "underscore";
import styled from "styled-components";

import TextField from "@/modules/birthdays/TextField.js";
import Attachments from "@/modules/birthday/Attachments.js";
import { default as customRenderers } from "@/modules/renderers";
import { LanguageContextConsumer } from "@/modules/_common";

const StyledRow = styled.span`
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px;
`;

const StyledTextPosition = styled.div`
  position: absolute;
  top: 35vh;
  width: 100%;
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
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top: 5vh;
  padding-top: 30vh;
  height: 100%;
  position: relative;
`;

const StyledImg = styled.img`
  -webkit-filter: grayscale(100%) brightness(0.5); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%) brightness(0.5);
  position: absolute;
  top: 0;
  width: -webkit-fill-available;
`;

const getPhotoURL = arr => {
  return arr[Math.floor(Math.random() * arr.length)].url;
};

const getDateString = (lang, dob, dod) => {
  if (lang === "es") {
    let birth = moment(dob)
      .locale("es")
      .format("LL");
    let death = moment(dod)
      .locale("es")
      .format("LL");

    return `${birth == "Fetcha inválida" ? "Desconocido" : birth} al ${
      death == "Fetcha inválida" ? "Desconocido" : death
    }`;
  } else if (lang === "en") {
    let birth = moment(dob)
      .locale("en")
      .format("MMMM Do, YYYY");
    let death = moment(dod)
      .locale("en")
      .format("MMMM Do, YYYY");
    return `${birth} to ${death}`;
    return `${birth == "Invalid Date" ? "Unknown" : birth} to ${
      death == "Invalid Date" ? "Unknown" : death
    }`;
  }
};

const Row = ({
  name = "Unknown",
  DOB = "Unknown",
  DOD = "Unknown",
  photoArr = []
}) => {
  return (
    <LanguageContextConsumer>
      {context => (
        <StyledDiv>
          {photoArr.length > 0 ? (
            <StyledImg src={getPhotoURL(photoArr)} />
          ) : null}
          <StyledTextPosition>
            <StyledName>{name}</StyledName>
            <StyledDates>{getDateString(context.lang, DOB, DOD)}</StyledDates>
          </StyledTextPosition>
        </StyledDiv>
      )}
    </LanguageContextConsumer>
  );
};

export default Row;
