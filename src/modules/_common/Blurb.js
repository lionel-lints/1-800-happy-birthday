import React from "react";
import styled from "styled-components";

import { LanguageContextConsumer } from "@/modules/_common";
import { blurb } from "@/assets/locales/data.json";

import breakpoints from "@/utils/breakpoints";

const StyledBlurb = styled.h2`
  font-family: BradleyMicro;
  color: white;
  text-align: center;
  font-size: 1.6rem;
  line-height: 2rem;
  font-weight: 400;
  margin: 0 5%;

  animation: fadeInBlurb ease-in 0.25s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  @keyframes fadeInBlurb {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media ${breakpoints.tablet} {
    font-size: 2.2rem;
    line-height: calc(2.2rem * 1.3);
  }

  @media ${breakpoints.laptop} {
    font-size: 3.5rem;
    line-height: calc(3.5rem * 1.3);
  }
`;

const Blurb = () => {
  return (
    <LanguageContextConsumer>
      {context => <StyledBlurb>{blurb[context.lang]}</StyledBlurb>}
    </LanguageContextConsumer>
  );
};

Blurb.propTypes = {};

export default Blurb;
