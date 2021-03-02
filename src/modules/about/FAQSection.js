import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledFAQSection = styled.section`
  font-family: "Roboto Mono", monospace;
  margin-left: 25%;
  width: 50vw;
  margin-top: 5vh;
  margin-bottom: 5vh;
  h3 {
    margin-top: 5vh;
    font-size: 40px;
    text-align: center;
  }
  h5 {
    margin-top: 5vh;
    font-size: 25px;
    text-align: center;
  }
  p {
    margin-top: 2vh;
    font-size: 16px;
    text-align: center;
  }
`;

const Question = ({ question, answer }) => {
  return (
    <>
      <h5>{question}</h5>
      <p>{answer}</p>
    </>
  );
};

const FAQSection = ({ title, footer, questionList, lang }) => {
  return (
    <StyledFAQSection>
      <h3>{title}</h3>
      {questionList.length > 0 &&
        questionList.map(curr => (
          <Question question={curr.question[lang]} answer={curr.answer[lang]} />
        ))}
      <h3>{footer}</h3>
    </StyledFAQSection>
  );
};

export default FAQSection;
