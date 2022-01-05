import React from "react";
import styled from "styled-components";

import { birthday } from "@/assets/locales/data.json";
import breakpoints from "@/utils/breakpoints";

const StyledCallNow = styled.p`
  font-family: RobotoMono;
  display: inline-block;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

const StyledNumber = styled.a`
  color: red;
  font-family: PinyonScript;
  font-size: 3rem;
  text-align: center;
  transition: color 0.25s ease-in-out;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: white;
  }

  span {
    display: none;
  }

  &:before {
    content: "TAP TO CALL";
    font-family: RobotoMono;
    font-size: 1rem;
    letter-spacing: 3.2px;
    font-weight: 700;
    font-variation-settings: "wght" 700;
    border: 3px solid red;
    padding: 1rem;
  }

  @media ${breakpoints.laptop} {
    span {
      display: block;
    }

    &:before {
      display: none;
    }
  }
`;

const StyledPhoneNumber = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Voicemails = ({ voicemailNumber, lang }) => {
  return (
    <StyledPhoneNumber>
      <StyledCallNow>{birthday.callNow[lang]}</StyledCallNow>
      <StyledNumber href={`tel:${voicemailNumber}`}>
        <span>{voicemailNumber}</span>
      </StyledNumber>
    </StyledPhoneNumber>
  );
};

export default Voicemails;
