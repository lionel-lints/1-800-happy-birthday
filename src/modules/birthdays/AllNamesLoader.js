import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import $ from "jquery";

const StyledLoader = styled.ul`
  padding: 2%;
  text-align: center;
  opacity: 1;
  position: absolute;
  overflow: auto;
  top: 0;
  transition: all 1s ease-in-out;
  user-select: none;
  height: 100vh;
  background: black;
  z-index: 11;
`;

const StyledBlackBackground = styled.div`
  position: absolute;
  overflow: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background: black;
  z-index: 11;
`;

const StyledName = styled.li`
  display: inline;
  list-style-type: circle;
  margin-right: 0.5rem;

  font-family: BradleyMicro;
  color: lightgray;
  opacity: 0;
  font-size: 2rem;
  line-height: 3rem;
`;

const AllNamesLoader = ({ data }) => {
  // ANIMATION:
  // 0. names start as 0 opacity
  // 1. disable scrolling
  // 2. each name fades in over time
  // 3. then entire animation fades out
  // 4. once animation is done, allow scrolling

  // TODO:
  // 5. do not play again in same browser session

  const disableScrolling = () => {
    $("html, body").css({
      overflow: "hidden",
      height: "100%"
    });
  };

  const enableScrolling = () => {
    $("html, body").css({
      overflow: "auto",
      height: "auto"
    });
  };

  const animateLoader = () => {
    const listItems = $("li");
    listItems.each(function() {
      $(this)
        .delay(15 * Math.random() * listItems.length)
        .fadeTo("fast", 1);
    });
  };

  const removeLoader = () => {
    setTimeout(() => {
      const loader = $("ul")[0];
      $(loader).fadeTo("slow", 0, function() {
        enableScrolling();

        setTimeout(() => {
          $(loader).fadeOut();
        }, 2000);
      });
    }, 4000);
  };

  useEffect(() => {
    disableScrolling();
    animateLoader();
    removeLoader();
  }, [data]);

  if (!Object.keys(data).length) {
    return <StyledBlackBackground />;
  }

  return (
    <StyledLoader>
      {Object.keys(data).map(id => {
        const name = data[id].Name;

        return <StyledName key={name}>{name}</StyledName>;
      })}
    </StyledLoader>
  );
};

AllNamesLoader.propTypes = {
  data: PropTypes.shape({
    fields: PropTypes.shape({
      dob: PropTypes.string,
      "Voicemail Number": PropTypes.string,
      Name: PropTypes.string
    }),
    id: PropTypes.string
  })
};

AllNamesLoader.defaultProps = {
  data: {}
};

export default AllNamesLoader;
