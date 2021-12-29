import React, { useState } from "react";
import styled from "styled-components";

import { birthday } from "@/assets/locales/data.json";
import breakpoints from "@/utils/breakpoints";

import AudioPlayer from "@/modules/birthday/AudioPlayer.js";
import AudioAnalyser from "@/modules/birthday/AudioAnalyser.js";

const StyledAction = styled.p`
  font-family: RobotoMono;
  display: inline-block;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

const StyledNumber = styled.h2`
  color: red;
  font-family: PinyonScript;
  font-size: 3rem;
  text-align: center;
  transition: color 0.25s ease-in-out;

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

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

// custom component to see the voicemail component
const Voicemails = ({ vms, voicemailNumber, lang, name }) => {
  const urls = vms.map(vm => vm.url);

  const [isPlaying, setIsPlaying] = useState(false);

  const callNumber = () => {
    window.open(`tel:${voicemailNumber}`);
  };

  return (
    <StyledDiv>
      <StyledAction>{birthday.callNow[lang]}</StyledAction>
      <StyledNumber onClick={callNumber}>
        <span>{voicemailNumber}</span>
      </StyledNumber>

      <AudioPlayer
        sources={urls}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <AudioAnalyser isPlaying={isPlaying} />
    </StyledDiv>
  );
};

export default Voicemails;
