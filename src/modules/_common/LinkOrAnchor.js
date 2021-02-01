import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledAnchor = styled.a`
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const LinkOrAnchor = ({ to, children }) =>
  typeof window === "undefined" ? (
    <StyledAnchor href={to}>{children}</StyledAnchor>
  ) : (
    <StyledLink to={to}>{children}</StyledLink>
  );

LinkOrAnchor.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

LinkOrAnchor.defaultProps = {
  className: "row-link"
};

export default LinkOrAnchor;
