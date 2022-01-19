import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { LoaderBlurb } from "@/modules/home";

import animator from "@/utils/animator";
import breakpoints from "@/utils/breakpoints";
import useSessionStorage from "@/utils/hooks/useSessionStorage";

const StyledLoader = styled.ul`
  text-align: center;
  opacity: 0.1 !important;
  position: absolute;
  top: -0.5rem;
  left: -5rem;
  right: -5rem;
  user-select: none;
  transition: all 1s ease-in-out;
  z-index: 11;
  overflow: auto;
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
  z-index: 12;
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

  &.LoaderFadeInBackground {
    z-index: 20;
  }
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

const Loader = ({ data }) => {
  const [storedData] = useSessionStorage("hbd-data", {});
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const dataIsLoading = !Object.keys(storedData).length;

    if (dataIsLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }

    if (showLoader) {
      animator.animateLoaderFadeIn();
      animator.disableScrolling();
      animator.animateBlurb();
      animator.animateLoader();
    } else {
      animator.animateFadeIn();
      animator.enableScrolling();
    }
  }, [data, storedData]);

  return showLoader ? (
    <>
      <StyledBlurbContainer className="LoaderBlurbContainer">
        <LoaderBlurb />
      </StyledBlurbContainer>
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
      <StyledBlackBackground className="FadeInBackground" />
      <StyledBlackBackground className="LoaderFadeInBackground" />
    </>
  ) : (
    <StyledBlackBackground className="FadeInBackground" />
  );
};

Loader.propTypes = {
  data: PropTypes.shape({
    fields: PropTypes.shape({
      dob: PropTypes.string,
      "Voicemail Number": PropTypes.string,
      Name: PropTypes.string
    }),
    id: PropTypes.string
  })
};

Loader.defaultProps = {
  data: {}
};

export default Loader;
