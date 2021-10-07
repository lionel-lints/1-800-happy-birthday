import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { NavMenu, LanguageContextConsumer } from "@/modules/_common";

import { footer } from "@/assets/locales/data.json";
import breakpoints from "@/utils/breakpoints";

const StyledLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px 5%;
  color: white;

  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const StyledDonate = styled.div`
  font-family: BradleyMicro;
  font-size: 1.6rem;
  padding-bottom: 10px;
  border-bottom: 5px solid red;
  padding-top: 4rem;

  @media ${breakpoints.laptop} {
    font-size: 3.5rem;
    line-height: calc(3.5rem * 1.3);
  }

  a {
    text-decoration: none;
    color: white;

    &:hover {
      color: red;
    }
  }
`;

const StyledAttributionBlurb = styled.p`
  font-family: RobotoMono;
  line-height: 17.5px;
  font-size: 14px;
  padding: 4rem 0;
  text-align: center;

  a {
    text-decoration: none;
    color: white;

    &:hover {
      color: red;
    }
  }
`;

const Footer = () => {
  return (
    <LanguageContextConsumer>
      {context => (
        <StyledLayout>
          <NavMenu context={context} />
          <StyledDonate>
            <a href="https://cash.app/$1800HBD" target="_blank">
              {footer.donationBlurb[context.lang]} Happy Birthday Project
            </a>
          </StyledDonate>
          <StyledAttributionBlurb>
            {footer.created[context.lang]}{" "}
            <a href="https://www.evenoddfilms.com">Even/Odd</a>.
            {footer.site[context.lang]}{" "}
            <a href="https://www.lionellints.com">Lionel Lints</a>
            {", "}
            <a href="https://www.alexmarple.com">Alex Marple</a>
            {", "}
            {footer.and[context.lang]}{" "}
            <a href="https://nat.uduwela.com">Natalie Uduwela</a>;
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
