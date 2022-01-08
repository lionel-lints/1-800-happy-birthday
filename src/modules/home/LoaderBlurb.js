import React from "react";
import styled from "styled-components";

import { LanguageContextConsumer } from "@/modules/_common";
import { loaderBlurb } from "@/assets/locales/data.json";

import breakpoints from "@/utils/breakpoints";

const StyledBlurb = styled.h2`
  font-family: BradleyMicro;
  color: white;
  text-align: center;
  font-size: 2.5rem;
  line-height: calc(2.5rem * 1.2);
  font-weight: 400;
  margin: 0 5%;

  animation: fadeInBlurb ease-in 0.5s;
  @keyframes fadeInBlurb {
    0% 
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media ${breakpoints.tablet} {
    font-size: 4rem;
    line-height: calc(4rem * 1.2);
  }

  @media ${breakpoints.laptop} {
    font-size: 5rem;
    line-height: calc(5rem * 1.2);
  }
`;

const Blurb = () => {
  return (
    <LanguageContextConsumer>
      {context => <StyledBlurb>{loaderBlurb[context.lang]}</StyledBlurb>}
    </LanguageContextConsumer>
  );
};

export default Blurb;
