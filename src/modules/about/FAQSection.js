import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import breakpoints from "@/utils/breakpoints";

const StyledFAQSection = styled.section`
  font-family: RobotoMono;
  margin: 2rem 5%;

  @media ${breakpoints.laptop} {
    margin: 2rem 25%;
  }

  h3 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    line-height: 2rem;
  }

  h5 {
    margin-bottom: 20px;
    font-size: 1.25rem;
    line-height: 1.5rem;
    font-weight: 500;
    font-variation-settings: "wght" 500;
    border-bottom: 2px solid white;
    padding-bottom: 10px;
    display: inline-block;
  }

  p {
    margin-bottom: 4rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  a {
    margin-bottom: 20px;
    font-size: 1.25rem;
    line-height: 1.5rem;
    font-weight: 500;
    font-variation-settings: "wght" 500;
    text-decoration: none;
    color: red;

    &:hover {
      color: white;
    }
  }
`;

const FAQSection = ({ title, footer, questionList, lang }) => {
  return (
    <StyledFAQSection>
      <h3>{title}</h3>
      {questionList.length > 0 &&
        questionList.map((curr, index) => (
          <div key={index}>
            <h5>{curr.question[lang]}</h5>
            <p>{curr.answer[lang]}</p>
          </div>
        ))}
      <a
        href="mailto:1800happybirthday@gmail.com"
        title="Email 1800happybirthday@gmail.com "
      >
        {footer}
      </a>
    </StyledFAQSection>
  );
};

FAQSection.propTypes = {
  title: PropTypes.string.isRequired,
  footer: PropTypes.node.isRequired,
  questionList: PropTypes.instanceOf(Array),
  lang: PropTypes.string.isRequired
};

FAQSection.defaultProps = {
  questionList: []
};

export default FAQSection;
