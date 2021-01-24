import React from "react";
import { LanguageContextConsumer } from "./LanguageContext.js";

const LanguageButton = ({ language }) => {
  return (
    <LanguageContextConsumer>
      {context => (
        <button
          onClick={
            language === "English" ? context.setEnglish : context.setEspanol
          }
        >
          {language}
        </button>
      )}
    </LanguageContextConsumer>
  );
};

export default LanguageButton;
