import React from "react";
import styled from "styled-components";

const StyledImg = styled.img`
  margin-left: 1px;
  margin-right: 1px;
`;
const Icon = ({ src, alt }) => {
  return <StyledImg src={src} alt={alt} height={30} width={30} />;
};

export default Icon;
