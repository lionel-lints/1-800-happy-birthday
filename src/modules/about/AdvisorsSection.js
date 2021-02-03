import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledAdvisorSection = styled.section`
  margin-left: 15%;
  width: 70vw;
  height: 10vh;
  margin-top: 5vh;
  margin-bottom: 5vh;
  h3 {
    font-family: Pinyon Script;
    font-size: 60px;
    text-align: center;
  }
  p {
    font-family: "Roboto Mono", monospace;
    font-size: 20px;
    text-align: center;
  }
`;

const AdvisorsSection = ({ title, text }) => {
  return (
    <StyledAdvisorSection>
      <h3>{title}</h3>
      <p>{text}</p>
    </StyledAdvisorSection>
  );
};

export default AdvisorsSection;
