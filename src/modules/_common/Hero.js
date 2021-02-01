import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { LanguageContextConsumer } from "@/modules/_common";
import { hero } from "@/assets/locales/data.json";

const StyledHero = styled.h2`
  margin-top: 3vh;
  color: red;
  font-family: Pinyon Script;
  font-size: 60px;
  text-align: center;
`;

const Hero = () => {
  return (
    <LanguageContextConsumer>
      {context => <StyledHero>{hero[context.lang]}</StyledHero>}
    </LanguageContextConsumer>
  );
};

Hero.defaultProps = {
  siteDescription: process.env.SITE_DESCRIPTION
};

Hero.propTypes = {
  siteDescription: PropTypes.string
};

export default Hero;
