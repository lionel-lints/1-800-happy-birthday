import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const StyledAttributionBlurb = styled.p`
  font-family: "Roboto Mono", monospace;
  a {
    text-decoration: none;
    color: white;
  }
`;
const Footer = () => {
  return (
    <LanguageContextConsumer>
      {context => (
        <StyledLayout>
          <NavRow context={context} />
          <p>{footer.donationBlurb[context.lang]} Happy Birthday Project</p>
          <StyledAttributionBlurb>
            {footer.created[context.lang]}{" "}
            <a href="https://www.evenoddfilms.com">Even/Odd</a>,
            {footer.site[context.lang]}{" "}
            <a href="https://www.lionellints.com">Lionel Lints</a>{" "}
            {footer.and[context.lang]}{" "}
            <a href="https://www.alexmarple.com">Alex Marple</a>,
            {footer.design[context.lang]}{" "}
            <a href="https://twitter.com/lukesbeard">Luke Beard</a>.
            {footer.notPossible[context.lang]}{" "}
            <Link to={"/about"}>{footer.volunteers[context.lang]}</Link>
          </StyledAttributionBlurb>
        </StyledLayout>
      )}
    </LanguageContextConsumer>
  );
};

export default Footer;
