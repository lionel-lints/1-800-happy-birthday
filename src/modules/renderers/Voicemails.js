import React from "react";
import AudioPlayer from "@/modules/birthday/AudioPlayer.js";

// custom component to see the voicemail component
const Voicemails = ({ name, value }) => {
  let urls = value.map(vm => vm.url);
  return (
    <div>
      <AudioPlayer sources={urls} />
    </div>
  );
};

export default Voicemails;
