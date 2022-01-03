import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Blurb } from "@/modules/_common";
import animator from "@/utils/animator";
import useSessionStorage from "@/utils/hooks/useSessionStorage";

const StyledLoader = styled.ul`
  padding: 2%;
  text-align: center;
  opacity: 0.1 !important;
  position: absolute;
  overflow: auto;
  top: 0;
  transition: all 1s ease-in-out;
  user-select: none;
  height: 100vh;
  background: black;
  z-index: 10;
`;

const StyledBlurbContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  position: absolute;
  overflow: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
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
  z-index: 10;
`;

const StyledName = styled.li`
  display: inline;
  list-style-type: circle;
  margin-right: 0.5rem;

  font-family: BradleyMicro;
  color: ${p => (p.isEven ? "gray" : "lightgray")};
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
      animator.disableScrolling();
      animator.animateBlurb();
      animator.animateLoader();
    } else {
      animator.enableScrolling();
    }
  }, [data, storedData]);

  return showLoader ? (
    <>
      <StyledBlackBackground className="BlurbLoaderContainer">
        <StyledBlurbContainer>
          <Blurb />
        </StyledBlurbContainer>
      </StyledBlackBackground>
      <StyledLoader className="Loader">
        {Object.keys(data).map((id, index) => {
          const name = data[id].Name;

          return (
            <StyledName key={name} isEven={index % 2 === 0}>
              {name}
            </StyledName>
          );
        })}
      </StyledLoader>
    </>
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
