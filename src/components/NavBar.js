import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNav = styled.section`
  width: 100%;
  height: 20vh;
`;
const activeClassName = "nav-item-active";

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: red;
  }
`;
const NavBar = () => {
  return (
    <StyledNav>
      <StyledLink to="/about">About</StyledLink>
      <StyledLink exact to="/">
        Birthdays
      </StyledLink>
      <StyledLink to="/contact">Contact</StyledLink>
    </StyledNav>
  );
};

NavBar.defaultProps = {};

NavBar.propTypes = {};

export default NavBar;
