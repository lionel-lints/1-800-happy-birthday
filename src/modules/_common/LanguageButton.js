import React from "react";
import styled from "styled-components";
import { LanguageContextConsumer } from "@/modules/_common/";

const StyledButton = styled.button`
  color: white;
  background-color: black;
  cursor: pointer;
  outline: none;
  border: none;

  font-family: RobotoMono;
  font-size: 14px;
  text-transform: uppercase;

  &:hover {
    color: red;
  }
`;

const LanguageButton = () => {
  return (
    <LanguageContextConsumer>
      {context => (
        <StyledButton
          onClick={
            context.lang === "en" ? context.setEspanol : context.setEnglish
          }
        >
          {context.lang === "en" ? "Español" : "English"}
        </StyledButton>
      )}
    </LanguageContextConsumer>
  );
};

export default LanguageButton;
