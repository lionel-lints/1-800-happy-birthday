import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import styled from "styled-components";

import TextField from "@/modules/birthdays/TextField.js";
import Attachments from "@/modules/birthday/Attachments.js";
import { default as customRenderers } from "@/modules/renderers";

const StyledRow = styled.span`
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px;
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
  font-size: calc(1vw + 1vh + 1vmin);
  text-align: center;
`;

const getPhotoURL = arr => {
  return arr[Math.floor(Math.random() * arr.length)].url;
};

const Row = ({
  name = "Unknown",
  DOB = "unknown",
  DOD = "unknown",
  photoArr = []
}) => {
  return (
    <div>
      <StyledName>{name}</StyledName>
      <StyledDates>
        {DOB} to {DOD}
      </StyledDates>
      {photoArr.length > 0 ? <img src={getPhotoURL(photoArr)} /> : null}
    </div>
  );
};

export default Row;
