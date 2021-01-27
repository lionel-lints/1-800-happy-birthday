import React from "react";
import styled from "styled-components";
import { LanguageContextConsumer } from "./LanguageContext.js";

const StyledButton = styled.button`
  color: ${p => (p.isActive ? "#FFFFFF" : "#CCCCCC")};
  background-color: black;
  cursor: pointer;
  outline: none;
  border: none;
  font-family: MontserratExtraBold, sans-serif;
  font-size: 20px;
  text-transform: uppercase;
`;

const LanguageButton = ({ language }) => {
  return (
    <LanguageContextConsumer>
      {context => (
        <StyledButton
          isActive={context.lang === language.toLowerCase().slice(0, 2)}
          onClick={
            language === "English" ? context.setEnglish : context.setEspanol
          }
        >
          {language}
        </StyledButton>
      )}
    </LanguageContextConsumer>
  );
};

export default LanguageButton;
