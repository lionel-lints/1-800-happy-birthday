import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledLoader = styled.ul`
  padding: 2%;
  text-align: center;
  opacity: 1;
  position: absolute;
  top: 0;
  transition: all 1s ease-out;
  user-select: none;
  height: 100vh;
  background: black;

  animation: fadeOut ease-out 3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const StyledName = styled.li`
  display: inline;
  list-style-type: circle;
  margin-right: 0.5rem;

  font-family: BradleyMicro;
  color: ${p => (p.isEven ? "red" : "lightgray")};
  font-size: 2rem;
  line-height: 3rem;
`;

const AllNamesLoader = ({ data }) => {
  // useEffect(() => {
  //   if (data) {
  //     const listItems = $("li");
  //     listItems.each(function(index) {
  //       $(this)
  //         .delay(100 * Math.random() * listItems.length)
  //         .fadeIn(500);
  //     });
  //   }
  // }, []);

  return (
    <StyledLoader>
      {data.map((person, index) => {
        const name = person.fields.Name;

        return (
          <StyledName key={name} isEven={index % 2 === 0}>
            {name}
          </StyledName>
        );
      })}
    </StyledLoader>
  );
};

AllNamesLoader.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        Name: PropTypes.string
      }),
      id: PropTypes.string
    })
  )
};

AllNamesLoader.defaultProps = {
  data: []
};

export default AllNamesLoader;
