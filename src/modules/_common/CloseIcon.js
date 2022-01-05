import React from "react";
import styled from "styled-components";

const StyledCloseIcon = styled.div`
  width: 22px;
  height: 22px;
  opacity: 1;
  transition: opacity 0.25s ease-in-out;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
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
