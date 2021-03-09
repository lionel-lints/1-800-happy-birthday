import React, { useState } from "react";
import styled from "styled-components";

import { birthday } from "@/assets/locales/data.json";

import { LanguageContextConsumer } from "@/modules/_common";
import AudioPlayer from "@/modules/birthday/AudioPlayer.js";
import AudioAnalyser from "@/modules/birthday/AudioAnalyser.js";

const StyledParagraph = styled.p`
  font-family: "Roboto Mono", monospace;
  border-bottom: 1px solid grey;
  padding-bottom: 2vh;
  padding-top: 10vh;
`;

const StyledNumber = styled.h2`
  margin-top: 6vh;
  margin-bottom: 6vh;
  color: red;
  font-family: Pinyon Script;
  font-size: 60px;
  text-align: center;
`;
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

// custom component to see the voicemail component
const Voicemails = ({ vms, voicemailNumber, lang, name }) => {
  let urls = vms.map(vm => vm.url);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <StyledDiv>
      <AudioPlayer
        sources={urls}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <StyledParagraph>{birthday.callNow[lang]}</StyledParagraph>
      <StyledNumber>{voicemailNumber}</StyledNumber>
      <StyledParagraph>
        {birthday.listenStart[lang] + name + birthday.listenEnd[lang]}
      </StyledParagraph>
      <AudioAnalyser isPlaying={isPlaying} />
    </StyledDiv>
  );
};

export default Voicemails;
