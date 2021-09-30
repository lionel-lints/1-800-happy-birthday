import React from "react";
import styled from "styled-components";

import {
  LanguageButton,
  LanguageContextConsumer,
  Logo,
  NavRow
} from "@/modules/_common";

const StyledNav = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const StyledLanguageRow = styled.div`
  margin: 15px 0;
  text-transform: uppercase;
`;

const NavBar = () => {
  return (
    <LanguageContextConsumer>
      {context => (
        <StyledNav>
          <StyledLanguageRow>
            <LanguageButton />
          </StyledLanguageRow>
          <NavRow context={context} />
          <Logo />
        </StyledNav>
      )}
    </LanguageContextConsumer>
  );
};

NavBar.defaultProps = {};
NavBar.propTypes = {};

export default NavBar;

