import React, { useState } from "react";
import styled from "styled-components";

import { birthday } from "@/assets/locales/data.json";
import breakpoints from "@/utils/breakpoints";

import AudioPlayer from "@/modules/birthday/AudioPlayer.js";
import AudioAnalyser from "@/modules/birthday/AudioAnalyser.js";

const StyledAction = styled.p`
  font-family: RobotoMono;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1rem;
  margin-top: 4rem;
  margin-bottom: 1rem;
`;

const StyledParagraph = styled.p`
  font-family: RobotoMono;
  font-size: 0.75rem;
  margin-top: 2rem;
`;

const StyledNumber = styled.h2`
  color: red;
  font-family: PinyonScript;
  font-size: 3rem;
  text-align: center;

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
      <StyledParagraph>
        {birthday.listenStart[lang] + name + birthday.listenEnd[lang]}.
      </StyledParagraph>
      <AudioAnalyser isPlaying={isPlaying} />
    </StyledDiv>
  );
};

export default Voicemails;
