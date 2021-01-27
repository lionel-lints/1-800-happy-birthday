import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { NavBar } from "@/modules/_common";

const StyledContactPage = styled.div`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
`;
const ContactPage = () => (
  <StyledContactPage>
    <NavBar />
    <h1>The CONTACT page</h1>
  </StyledContactPage>
);

ContactPage.propTypes = {};

export default ContactPage;
