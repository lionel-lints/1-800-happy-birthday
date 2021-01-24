import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Header from "./Header.js";

const StyledNav = styled.section`
  width: 100%;
  height: 30vh;
  div {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
  }
`;
const activeClassName = "nav-item-active";

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  display: block;
  color: white;
  text-decoration: none;
  font-family: "Pinyon Script", cursive;
  font-size: 40px;
  &.${activeClassName} {
    color: red;
  }
`;

const StyledSocialLinks = styled.div``;

const NavBar = () => {
  return (
    <StyledNav>
      <Header title={"1 800 Happy Birthday"} />
      <div>
        <StyledLink to="/about">About</StyledLink>
        <StyledLink exact to="/">
          Birthdays
        </StyledLink>
        <StyledLink to="/contact">Contact</StyledLink>
      </div>
    </StyledNav>
  );
};

NavBar.defaultProps = {};

NavBar.propTypes = {};

export default NavBar;
