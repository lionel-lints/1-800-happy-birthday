import React from "react";
import AudioPlayer from "@/modules/birthday/AudioPlayer.js";
import AudioAnalyser from "@/modules/birthday/AudioAnalyser.js";

// custom component to see the voicemail component
const Voicemails = ({ vms }) => {
  let urls = vms.map(vm => vm.url);
  return (
    <>
      <AudioPlayer sources={urls} />
      <AudioAnalyser />
    </>
  );
};

export default Voicemails;
