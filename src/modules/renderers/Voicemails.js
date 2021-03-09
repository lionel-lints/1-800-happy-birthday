import React from "react";
import styled from "styled-components";

import AudioPlayer from "@/modules/birthday/AudioPlayer.js";
import AudioAnalyser from "@/modules/birthday/AudioAnalyser.js";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

// custom component to see the voicemail component
const Voicemails = ({ vms, voicemailNumber }) => {
  let urls = vms.map(vm => vm.url);
  return (
    <StyledDiv>
      <div>{voicemailNumber}</div>
      <AudioPlayer sources={urls} />
      <AudioAnalyser />
    </StyledDiv>
  );
};

export default Voicemails;
