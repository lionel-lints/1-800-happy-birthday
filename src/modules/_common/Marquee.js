import React from "react";
import styled from "styled-components";

import { LanguageContextConsumer } from "@/modules/_common";
import { hero } from "@/assets/locales/data.json";

import BirthdayCake from "@/assets/icons/birthday-cake.svg";

import breakpoints from "@/utils/breakpoints";

const StyledMarquee = styled.div`
  font-family: PinyonScript;
  border-top: solid 2px white;
  border-bottom: solid 2px white;
  padding-top: 10px;
  font-size: 40px;
  margin: 4rem 0;
  position: relative;
  overflow: hidden;
  width: 100vw;
  max-width: 100%;
  --offset: 15vw;
  --move-initial: calc(-25% + var(--offset));
  --move-final: calc(-50% + var(--offset));

  @media ${breakpoints.laptop} {
    margin: 8rem 0;
  }

  div {
    display: flex;
    align-items: center;
    white-space: nowrap;
    width: fit-content;
    will-change: transform;
    transform: translate3d(var(--move-initial), 0, 0);
    animation: marquee 12s linear infinite;
  }

  span {
    margin-right: 5rem;
    margin-left: 3.8rem;
    line-height: 4rem;
  }

  @keyframes marquee {
    0% {
      transform: translate3d(var(--move-initial), 0, 0);
    }

    100% {
      transform: translate3d(var(--move-final), 0, 0);
    }
  }
`;

const Marquee = () => {
  return (
    <LanguageContextConsumer>
      {context => (
        <StyledMarquee>
          <div>
            <span>{hero[context.lang]}</span>
            <img alt="birthday cake" src={BirthdayCake} />
            <span>{hero[context.lang]}</span>
            <img alt="birthday cake" src={BirthdayCake} />
            <span>{hero[context.lang]}</span>
            <img alt="birthday cake" src={BirthdayCake} />
            <span>{hero[context.lang]}</span>
            <img alt="birthday cake" src={BirthdayCake} />
            <span>{hero[context.lang]}</span>
            <img alt="birthday cake" src={BirthdayCake} />
            <span>{hero[context.lang]}</span>
            <img alt="birthday cake" src={BirthdayCake} />
            <span>{hero[context.lang]}</span>
            <img alt="birthday cake" src={BirthdayCake} />
            <span>{hero[context.lang]}</span>
            <img alt="birthday cake" src={BirthdayCake} />
            <span>{hero[context.lang]}</span>
            <img alt="birthday cake" src={BirthdayCake} />
            <span>{hero[context.lang]}</span>
            <img alt="birthday cake" src={BirthdayCake} />
            <span>{hero[context.lang]}</span>
            <img alt="birthday cake" src={BirthdayCake} />
            <span>{hero[context.lang]}</span>
            <img alt="birthday cake" src={BirthdayCake} />
            <span>{hero[context.lang]}</span>
          </div>
        </StyledMarquee>
      )}
    </LanguageContextConsumer>
  );
};

export default Marquee;
