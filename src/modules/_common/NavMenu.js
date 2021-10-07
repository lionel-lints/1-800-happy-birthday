import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import breakpoints from "@/utils/breakpoints";
import { navMenu } from "@/assets/locales/data.json";

const activeClassName = "nav-item-active";

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  text-decoration: none;
  font-family: PinyonScript;
  display: block;
  color: red;

  margin: 1rem 0;
  font-size: 4rem;

  @media ${breakpoints.tablet} {
    font-size: 3rem;
  }

  @media ${breakpoints.laptop} {
    font-size: 3.5rem;
    padding: 20px 30px;
  }

  &.${activeClassName}, &:hover {
    color: white;
  }
`;

const StyledNavMenu = styled.div`
  display: flex;
  flex-direction: column;

  @media ${breakpoints.laptop} {
    flex-direction: row;
  }
`;

const NavMenu = ({ context }) => {
  return (
    <StyledNavMenu>
      <StyledNavLink exact to="/">
        {navMenu.birthday[context.lang]}
      </StyledNavLink>
      <StyledNavLink to="/about">{navMenu.about[context.lang]}</StyledNavLink>
      <StyledNavLink to="https://instagram.com/1800HappyBirthday/">
        {navMenu.instagram[context.lang]}
      </StyledNavLink>
      <StyledNavLink to="/store">{navMenu.store[context.lang]}</StyledNavLink>
      <StyledNavLink to="/contact">
        {navMenu.contact[context.lang]}
      </StyledNavLink>
    </StyledNavMenu>
  );
};

NavMenu.defaultProps = {};
NavMenu.propTypes = {};

export default NavMenu;
