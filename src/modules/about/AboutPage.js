import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import NavBar from "@/modules/_common/NavBar.js";

const StyledAboutPage = styled.div`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
`;

const AboutPage = () => (
  <StyledAboutPage>
    <NavBar />
    <h1>The ABOUT page</h1>
  </StyledAboutPage>
);

AboutPage.propTypes = {};

export default AboutPage;
