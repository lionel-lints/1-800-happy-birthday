import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  text-align: center;
  margin: 2%;
  opacity: 0.1;
  position: fixed;
  top: 0;
  transition: all 1s ease-out;
  user-select: none;
  padding-bottom: 10rem;
  z-index: -1;
`;

const StyledName = styled.li`
  display: inline;
  list-style-type: circle;
  margin-right: 0.5rem;

  font-family: BradleyMicro;
  color: ${p => (p.isEven ? "gray" : "lightgray")};
  font-size: 2rem;
  line-height: 3rem;
`;

const AllNamesList = ({ data }) => {
  return (
    <StyledList>
      {data.map((person, index) => {
        const name = person.fields.Name;

        return (
          <StyledName key={name} isEven={index % 2 === 0}>
            {name}
          </StyledName>
        );
      })}
    </StyledList>
  );
};

AllNamesList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        Name: PropTypes.string
      }),
      id: PropTypes.string
    })
  )
};

AllNamesList.defaultProps = {
  data: []
};

export default AllNamesList;
