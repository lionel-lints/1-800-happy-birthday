import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import breakpoints from "@/utils/breakpoints";
import { navBar } from "@/assets/locales/data.json";

const activeClassName = "nav-item-active";

const StyledLink = styled(NavLink).attrs({ activeClassName })`
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

const StyledNavRow = styled.div`
  display: flex;
  flex-direction: column;

  @media ${breakpoints.laptop} {
    flex-direction: row;
  }
`;

const NavRow = ({ context }) => {
  return (
    <StyledNavRow>
      <StyledLink exact to="/">
        {navBar.birthday[context.lang]}
      </StyledLink>
      <StyledLink to="/about">{navBar.about[context.lang]}</StyledLink>
      <StyledLink to="https://instagram.com/1800HappyBirthday/">
        {navBar.instagram[context.lang]}
      </StyledLink>
      <StyledLink to="/store">{navBar.store[context.lang]}</StyledLink>
      <StyledLink to="/contact">{navBar.contact[context.lang]}</StyledLink>
    </StyledNavRow>
  );
};

NavRow.defaultProps = {};
NavRow.propTypes = {};

export default NavRow;
