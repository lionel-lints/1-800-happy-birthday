import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import AdvisorsSection from "@/modules/about/AdvisorsSection.js";
import FAQSection from "@/modules/about/FAQSection.js";
import {
  NavBar,
  Hero,
  Blurb,
  LanguageContextConsumer
} from "@/modules/_common";
import { advisors, volunteers, faq } from "@/assets/locales/data.json";

const StyledAboutPage = styled.main`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
`;

const AboutPage = () => {
  useLayoutEffect(() => {
    // scroll to top of page on link transistion
    window.scrollTo(0, 0);
  });
  return (
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
          <FAQSection
            title={faq.title[context.lang]}
            footer={faq.footer[context.lang]}
            lang={context.lang}
            questionList={faq.questionList}
          />
        </StyledAboutPage>
      )}
    </LanguageContextConsumer>
  );
};

AboutPage.propTypes = {};

export default AboutPage;
