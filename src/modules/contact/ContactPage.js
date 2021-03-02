import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { NavBar, Hero } from "@/modules/_common";

const StyledContactPage = styled.div`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
`;

const StyledContactDetails = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    text-decoration: none;
    color: white;
  }
`;

const ContactPage = () => (
  <StyledContactPage>
    <NavBar />
    <Hero />
    <StyledContactDetails>
      <h1>Contact Us</h1>
      <p>
        Would you like your loved one to be included in this project or want to
        work together? Please get in touch via the following methods.
      </p>
      <p>Email Us</p>
      <a href="1800happybirthday@gmail.com">1800happybirthday@gmail.com</a>
      <p>Send us a message on Instagram</p>
      <a href="https://www.instagram.com/1800HappyBirthday">
        @1800HappyBirthday
      </a>
      <p>
        1800 Happy Birthday is a voicemail project created to honor the Black
        and Brown victims of Police Killings and Systemic Racism by allowing
        people to leave and listen to voicemails left for the victims on their
        birthday
      </p>
    </StyledContactDetails>
  </StyledContactPage>
);

ContactPage.propTypes = {};

export default ContactPage;
