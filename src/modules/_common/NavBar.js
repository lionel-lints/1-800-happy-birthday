import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { Header, Icon } from "@/modules/_common";
import LanguageButton from "@/components/LanguageButton.js";
import { LanguageContextConsumer } from "@/components/LanguageContext.js";

import Insta from "@/assets/icons/instagram-icon.svg";
import Twitter from "@/assets/icons/twitter-icon.svg";

import { navBar } from "@/assets/locales/data.json";

const StyledNav = styled.section`
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
const activeClassName = "nav-item-active";

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  display: block;
  color: #cccccc;
  text-decoration: none;
  font-family: MontserratExtraBold;
  font-size: 24px;
  &.${activeClassName} {
    color: #ffffff;
  }
`;

const StyledNavRow = styled.div`
  width: 40%;
  height: 5vh;
`;

const StyledLanguageRow = styled.div`
  width: 20%;
  height: 5vh;
  text-transform: uppercase;
`;
const NavBar = () => {
  return (
    <LanguageContextConsumer>
      {context => (
        <StyledNav>
          <StyledLanguageRow>
            <LanguageButton language={"English"} />
            <LanguageButton language={"Español"} />
          </StyledLanguageRow>
          <Header title={"1 800 Happy Birthday"} />
          <StyledNavRow>
            <StyledLink to="/about">{navBar.about[context.lang]}</StyledLink>
            <StyledLink exact to="/">
              {navBar.birthday[context.lang]}
            </StyledLink>
            <StyledLink to="/contact">
              {navBar.contact[context.lang]}
            </StyledLink>
            <div>
              <Icon src={Insta} alt={"instagram icon"} />
              <Icon src={Twitter} alt={"twitter icon"} />
            </div>
          </StyledNavRow>
        </StyledNav>
      )}
    </LanguageContextConsumer>
  );
};

NavBar.defaultProps = {};

NavBar.propTypes = {};

export default NavBar;
