import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledAdvisorSection = styled.section`
  margin: 5rem 5%;

  h3 {
    font-family: PinyonScript;
    font-size: 3.125rem;
    text-align: center;
    margin-bottom: 10px;
  }

  p {
    font-family: RobotoMono;
    font-size: 1.25rem;
    line-height: 2rem;
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

AdvisorsSection.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default AdvisorsSection;
