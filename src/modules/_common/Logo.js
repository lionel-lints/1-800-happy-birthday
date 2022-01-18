import React from "react";
import styled from "styled-components";

import logo from "@/assets/logo/1800-happy-birthday-logo.svg";

// TODO: click target area, change margins?
const StyledLogo = styled.img`
  margin: 2% 5%;
  transition: opacity 0.25s ease-in-out;

  &:hover {
    opacity: 0.7;
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='50' height='60' viewport='0 0 100 100' style='fill:black;font-size:30px;'><text y='50%'>🍰</text></svg>")
        16 0,
      auto;
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
