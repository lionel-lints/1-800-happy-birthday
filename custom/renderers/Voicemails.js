// custom component to see the voicemail component
import React from "react";
import AudioPlayer from "../../src/components/AudioPlayer.js";

const Voicemails = ({ name, value }) => {
  let urls = value.map(vm => vm.url);
  return (
    <div>
      <AudioPlayer sources={urls} />
    </div>
  );
};

export default Voicemails;
