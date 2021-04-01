import React from "react";
import styled from "styled-components";

import { NavRow, LanguageContextConsumer } from "@/modules/_common";

import { footer } from "@/assets/locales/data.json";

const StyledLayout = styled.section`
  margin-top: 25vh;
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const Footer = () => {
  return (
    <LanguageContextConsumer>
      {context => (
        <StyledLayout>
          <NavRow context={context} />
          <p>{footer.donationBlurb[context.lang]} Happy Birthday Project</p>
          <p>
            {footer.created[context.lang]} Even/Odd,
            {footer.site[context.lang]} Lionel Lints {footer.and[context.lang]}{" "}
            Alex Marple,
            {footer.design[context.lang]} Luke Beard.
            {footer.notPossible[context.lang]} {footer.volunteers[context.lang]}
          </p>
        </StyledLayout>
      )}
    </LanguageContextConsumer>
  );
};

export default Footer;
