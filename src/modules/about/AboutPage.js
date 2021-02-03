import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import AdvisorsSection from "@/modules/about/AdvisorsSection.js";
import {
  NavBar,
  Hero,
  Blurb,
  LanguageContextConsumer
} from "@/modules/_common";
import { advisors, volunteers } from "@/assets/locales/data.json";

const StyledAboutPage = styled.main`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
`;

const AboutPage = () => (
  <LanguageContextConsumer>
    {context => (
      <StyledAboutPage>
        <NavBar />
        <Hero />
        <Blurb />
        <AdvisorsSection
          title={advisors.title[context.lang]}
          text={advisors.text[context.lang]}
        />
        <AdvisorsSection
          title={volunteers.title[context.lang]}
          text={volunteers.text[context.lang]}
        />
      </StyledAboutPage>
    )}
  </LanguageContextConsumer>
);

AboutPage.propTypes = {};

export default AboutPage;
