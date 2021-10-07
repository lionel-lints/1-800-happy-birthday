import React, { useLayoutEffect } from "react";
import styled from "styled-components";

import AdvisorsSection from "@/modules/about/AdvisorsSection.js";
import FAQSection from "@/modules/about/FAQSection.js";
import {
  PageHeader,
  Footer,
  Blurb,
  Marquee,
  LanguageContextConsumer
} from "@/modules/_common";
import { advisors, volunteers, faq } from "@/assets/locales/data.json";

const StyledAboutPage = styled.main`
  background-color: black;
  color: white;
`;

const AboutPage = () => {
  useLayoutEffect(() => {
    // scroll to top of page on link transition
    window.scrollTo(0, 0);
  });

  return (
    <LanguageContextConsumer>
      {context => (
        <StyledAboutPage>
          <PageHeader />
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
          <Marquee />
          <Footer />
        </StyledAboutPage>
      )}
    </LanguageContextConsumer>
  );
};

AboutPage.propTypes = {};

export default AboutPage;
