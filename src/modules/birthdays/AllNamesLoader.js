import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import loadingAnimator from "@/utils/loadingAnimator";
import useSessionStorage from "@/utils/hooks/useSessionStorage";

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
  const [storedData] = useSessionStorage("hbd-data", {});
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const dataIsLoading = !Object.keys(storedData).length;

    if (dataIsLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }

    if (showLoader) {
      loadingAnimator.disableScrolling();
      loadingAnimator.animateLoader();
      loadingAnimator.removeLoader();
    } else {
      loadingAnimator.enableScrolling();
    }
  }, [data, storedData]);

  // Before data has loaded, show a blank black screen.
  if (showLoader && !Object.keys(data).length) {
    return <StyledBlackBackground />;
  }

  return showLoader ? (
    <StyledLoader className="Loader">
      {Object.keys(data).map(id => {
        const name = data[id].Name;

        return <StyledName key={name}>{name}</StyledName>;
      })}
    </StyledLoader>
  ) : null;
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
