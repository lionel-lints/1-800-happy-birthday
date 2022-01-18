import React from "react";
import styled from "styled-components";

const StyledCloseIcon = styled.div`
  width: 22px;
  height: 22px;
  opacity: 1;
  transition: opacity 0.25s ease-in-out;
  padding: 1rem;

  &:hover {
    opacity: 0.7;
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='50' height='60' viewport='0 0 100 100' style='fill:black;font-size:30px;'><text y='50%'>🍰</text></svg>")
        16 0,
      auto;
  }

  &:before,
  &:after {
    position: absolute;
    content: " ";
    height: 22px;
    width: 2px;
    background-color: white;

    &:hover {
      background-color: red;
    }
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const CloseIcon = () => {
  return <StyledCloseIcon />;
};

export default CloseIcon;
