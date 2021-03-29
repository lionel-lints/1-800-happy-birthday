import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSpan = styled.span`
  text-decoration: none;
  font-family: BradleyDisplay;
  color: ${p => (p.isEven ? "#CCCCCC" : "#FFFFFF")};
  outline: none;
  font-size: 24px;
  font-size calc(20px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
  line-height: 1.5;
  letter-spacing: 2px;
`;
const TextField = ({ data, ind }) => {
  return <StyledSpan isEven={ind % 2 === 0}>{data}</StyledSpan>;
};

TextField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default TextField;
