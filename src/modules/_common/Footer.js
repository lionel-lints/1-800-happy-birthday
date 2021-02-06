import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { LanguageContextConsumer } from "@/modules/_common";
import { footer } from "@/assets/locales/data.json";

const StyledFooter = styled.footer`
  background: black;
  padding: 5rem 0;
  ul {
    display: flex;
    justify-content: space-around;
    a {
      font-family: "Pinyon Script";
      text-decoration: none;
      color: red;
      font-size: 20px;
    }
  }
`;

const Footer = () => {
  return (
    <LanguageContextConsumer>
      {context => (
        <StyledFooter>
          <ul>
            <li>
              <NavLink to="/about">{footer.info[context.lang]}</NavLink>
            </li>
            <li>
              <NavLink to="/birthdays">
                {footer.birthdays[context.lang]}
              </NavLink>
            </li>
            <li>
              <NavLink to="/">{footer.instagram[context.lang]}</NavLink>
            </li>
            <li>
              <NavLink to="/">{footer.twitter[context.lang]}</NavLink>
            </li>
            <li>
              <NavLink to="/contact">{footer.contact[context.lang]}</NavLink>
            </li>
          </ul>
        </StyledFooter>
      )}
    </LanguageContextConsumer>
  );
};

export default Footer;
