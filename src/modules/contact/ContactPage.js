import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  NavBar,
  Header,
  Hero,
  LanguageContextConsumer
} from "@/modules/_common";

import { contact } from "@/assets/locales/data.json";

const StyledAdvisorSection = styled.section`
  margin-left: 15%;
  width: 70vw;
  height: 10vh;
  margin-top: 5vh;
  margin-bottom: 5vh;
  h3 {
    font-family: Pinyon Script;
    font-size: 60px;
    text-align: center;
  }
  p {
    font-family: "Roboto Mono", monospace;
    font-size: 20px;
    text-align: center;
  }
`;

const StyledContactPage = styled.div`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
`;

const StyledContactDetails = styled.section`
  margin-left: 15%;
  width: 70vw;
  height: 10vh;
  margin-top: 5vh;
  margin-bottom: 5vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    text-decoration: none;
    color: white;
  }
`;

const StyledAnchor = styled.a`
  font-family: BradleyDisplay;
  font-size: 40px;
  margin-bottom: 5vh;
`;

const StyledParagraph = styled.p`
  font-family: Pinyon Script;
  font-size: 40px;
  text-align: center;
`;

const StyledBlurb = styled(StyledParagraph)`
  margin-bottom: 5vh;
`;

const ContactPage = () => {
  useLayoutEffect(() => {
    // scroll to top of page on link transistion
    window.scrollTo(0, 0);
  });
  return (
    <LanguageContextConsumer>
      {context => (
        <StyledContactPage>
          <NavBar />
          <Hero />
          <StyledContactDetails>
            <Header title={contact.title[context.lang]} />
            <StyledBlurb>{contact.text[context.lang]}</StyledBlurb>
            <StyledParagraph>{contact.email[context.lang]}</StyledParagraph>
            <StyledAnchor href={`mailto:1800happybirthday@gmail.com`}>
              1800happybirthday@gmail.com
            </StyledAnchor>
            <StyledParagraph>{contact.instagram[context.lang]}</StyledParagraph>
            <StyledAnchor href="https://www.instagram.com/1800HappyBirthday">
              @1800HappyBirthday
            </StyledAnchor>
          </StyledContactDetails>
        </StyledContactPage>
      )}
    </LanguageContextConsumer>
  );
};

ContactPage.propTypes = {};

export default ContactPage;
