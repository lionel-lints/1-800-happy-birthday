import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import AnimateHeight from "react-animate-height";

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

const StyledAnchor = styled.a.attrs({ activeClassName })`
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
  display: none !important;

  @media ${breakpoints.laptop} {
    display: flex !important;
    flex-direction: row;
  }
`;

const StyledMobileNavMenu = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;

  @media ${breakpoints.laptop} {
    display: none !important;
  }
`;

const StyledMobileNavMenuButton = styled.div`
  font-family: BradleyMicro;
  color: red;
  font-size: 1.6rem;
  margin: 10px 0 16px 0;

  &:hover {
    color: white;
    cursor: pointer;
  }

  @media ${breakpoints.laptop} {
    display: none !important;
  }
`;

const NavMenu = ({ context }) => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [height, setHeight] = useState(0);

  const toggleMenu = () => {
    setMobileMenuIsOpen(!mobileMenuIsOpen);

    if (!mobileMenuIsOpen) {
      setHeight("auto");
    } else {
      setHeight("0");
    }
  };

  return (
    <>
      <StyledNavMenu>
        <StyledNavLink exact to="/">
          {navMenu.birthday[context.lang]}
        </StyledNavLink>
        <StyledNavLink to="/about">{navMenu.about[context.lang]}</StyledNavLink>
        <StyledAnchor
          target="_blank"
          href="https://instagram.com/1800HappyBirthday/"
        >
          {navMenu.instagram[context.lang]}
        </StyledAnchor>
        <StyledNavLink to="/contact">
          {navMenu.contact[context.lang]}
        </StyledNavLink>
      </StyledNavMenu>
      <StyledMobileNavMenuButton onClick={() => toggleMenu()}>
        {navMenu.menu[context.lang]}
      </StyledMobileNavMenuButton>
      <AnimateHeight id="mobile-menu" duration={1000} height={height}>
        <StyledMobileNavMenu isOpen={mobileMenuIsOpen}>
          <StyledNavLink exact to="/">
            {navMenu.birthday[context.lang]}
          </StyledNavLink>
          <StyledNavLink to="/about">
            {navMenu.about[context.lang]}
          </StyledNavLink>
          <StyledAnchor
            target="_blank"
            href="https://instagram.com/1800HappyBirthday/"
          >
            {navMenu.instagram[context.lang]}
          </StyledAnchor>
          <StyledNavLink to="/contact">
            {navMenu.contact[context.lang]}
          </StyledNavLink>
        </StyledMobileNavMenu>
      </AnimateHeight>
    </>
  );
};

NavMenu.defaultProps = {};
NavMenu.propTypes = {};

export default NavMenu;
