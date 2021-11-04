import React, { useLayoutEffect } from "react";
import styled from "styled-components";

import {
  PageHeader,
  Marquee,
  Blurb,
  Footer,
  LanguageContextConsumer
} from "@/modules/_common";

import { contact } from "@/assets/locales/data.json";

const StyledContactPage = styled.div`
  color: white;
`;

const StyledContactDetails = styled.section`
  margin: 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: fadeInContact ease-in 0.25s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  @keyframes fadeInContact {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  h3 {
    font-family: PinyonScript;
    font-size: 3.125rem;
    text-align: center;
    margin-bottom: 10px;
  }

  p {
    font-family: RobotoMono;
    font-size: 1.25rem;
    line-height: 2rem;
    text-align: center;
    margin-bottom: 3rem;
    max-width: 600px;
  }

  a {
    font-family: BradleyMicro;
    font-size: 2rem;
    color: red;
    text-decoration: none;

    &:hover {
      color: white;
    }

    &:not(:last-child) {
      margin-bottom: 3rem;
    }
  }
`;

const StyledHeader = styled.h1`
  font-family: BradleyMicro;
  font-size: 6rem;
  text-align: center;
  letter-spacing: -0.5rem;
  margin-bottom: 2rem;
`;

const ContactPage = () => {
  useLayoutEffect(() => {
    // scroll to top of page on link transition
    window.scrollTo(0, 0);
  });

  return (
    <LanguageContextConsumer>
      {context => (
        <StyledContactPage>
          <PageHeader />
          <StyledContactDetails>
            <StyledHeader>{contact.title[context.lang]}</StyledHeader>
            <p>{contact.text[context.lang]}</p>
            <h3>{contact.email[context.lang]}</h3>
            <a href="mailto:1800happybirthday@gmail.com">
              1800happybirthday@gmail.com
            </a>
            <h3>{contact.instagram[context.lang]}</h3>
            <a href="https://www.instagram.com/1800HappyBirthday">
              @1800HappyBirthday
            </a>
          </StyledContactDetails>
          <Marquee />
          <Blurb />
          <Footer />
        </StyledContactPage>
      )}
    </LanguageContextConsumer>
  );
};

ContactPage.propTypes = {};

export default ContactPage;
