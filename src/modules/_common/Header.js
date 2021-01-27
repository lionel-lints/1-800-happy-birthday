import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledHeader = styled.h1`
  font-family: BradleyDisplay;
  font-size: 120px;
  width: 100%;
  text-align: center;
  height: 15vh;
  padding-top: 2vh;
  padding-bottom: 2vh;
`;
const Header = ({ title }) => <StyledHeader>{title}</StyledHeader>;

Header.propTypes = {
  title: PropTypes.string
};

Header.defaultProps = {
  title: ""
};

export default Header;
