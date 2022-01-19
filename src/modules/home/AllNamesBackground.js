import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import animator from "@/utils/animator";
import breakpoints from "@/utils/breakpoints";

const StyledList = styled.ul`
  text-align: center;
  opacity: 0.1 !important;
  position: fixed;
  top: -0.5rem;
  left: -5rem;
  right: -5rem;
  user-select: none;
  transition: all 1s ease-in-out;
  z-index: -1;
`;

const StyledName = styled.li`
  display: inline;
  list-style-type: circle;
  margin-right: 0.5rem;
  opacity: 0;

  font-family: BradleyMicro;
  color: ${p => (p.isEven ? "gray" : "lightgray")};
  font-size: 1.6rem;
  line-height: 2.2rem;

  @media ${breakpoints.tablet} {
    font-size: 2.8rem;
    line-height: 3.1rem;
  }
`;

const AllNamesBackground = ({ data }) => {
  useEffect(() => {
    animator.animateBackgroundNames();
  });

  return (
    <StyledList className="BackgroundNames">
      {Object.keys(data).map((id, index) => {
        const name = data[id].Name;

        return (
          <StyledName key={name} isEven={index % 2 === 0}>
            {name}
          </StyledName>
        );
      })}
    </StyledList>
  );
};

AllNamesBackground.propTypes = {
  data: PropTypes.shape({
    fields: PropTypes.shape({
      dob: PropTypes.string,
      "Voicemail Number": PropTypes.string,
      Name: PropTypes.string
    }),
    id: PropTypes.string
  })
};

AllNamesBackground.defaultProps = {
  data: {}
};

export default AllNamesBackground;
