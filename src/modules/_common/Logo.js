import React from "react";
import styled from "styled-components";

import logo from "@/assets/logo/1800-happy-birthday-logo.svg";

// TODO: click target area, change margins?
const StyledLogo = styled.img`
  margin: 2% 5%;
  transition: opacity 0.25s ease-out;

  &:hover {
    opacity: 0.6;
  }
`;

const Logo = () => {
  return (
    <a target="_blank" rel="noopener noreferrer" href="/">
      <StyledLogo src={logo} alt="1-800-Happy-Birthday logo" width="90%" />
    </a>
  );
};

export default Logo;
