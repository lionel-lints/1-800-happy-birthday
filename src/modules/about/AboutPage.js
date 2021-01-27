import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { NavBar, Hero, Blurb } from "@/modules/_common";

const StyledAboutPage = styled.div`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
`;

const AboutPage = () => (
  <StyledAboutPage>
    <NavBar />
    <Hero />
    <Blurb />
  </StyledAboutPage>
);

AboutPage.propTypes = {};

export default AboutPage;
