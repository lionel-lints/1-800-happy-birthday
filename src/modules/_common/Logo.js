import React from "react";
import styled from "styled-components";

import logo from "@/assets/logo/1800-happy-birthday-logo.svg";

const StyledLogo = styled.img`
  margin: 5%;
`;
const Logo = () => {
  return (
    <a target="_blank" rel="noopener noreferrer" href="/">
      <StyledLogo src={logo} alt="1-800-Happy-Birthday logo" width="90%" />
    </a>
  );
};

export default Logo;
