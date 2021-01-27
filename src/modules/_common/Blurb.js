import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { LanguageContextConsumer } from "@/components/LanguageContext.js";
import { blurb } from "@/assets/locales/data.json";

const StyledBlurb = styled.h3`
  margin-top: 3vh;
  margin-left: 15%;
  width: 70%;
  color: #ffffff;
  font-family: BradleyDisplay;
  font-size: 50px;
  text-align: center;
  letter-spacing: 3px;
`;

const Blurb = () => {
  return (
    <LanguageContextConsumer>
      {context => <StyledBlurb>{blurb[context.lang]}</StyledBlurb>}
    </LanguageContextConsumer>
  );
};

Blurb.propTypes = {};

export default Blurb;
