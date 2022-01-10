import React from "react";
import PropTypes from "prop-types";

import { AudioControls } from "@/modules/player";

const AudioPlayer = ({
  id,
  isPlaying,
  togglePlay,
  playPrevious,
  playNext,
  setVoicemailID,
  showPlayOnly
}) => {
  const handlePlay = () => {
    if (setVoicemailID) setVoicemailID(id);
    togglePlay();
  };

  return (
    <AudioControls
      isPlaying={isPlaying}
      forward={playNext}
      back={playPrevious}
      togglePlay={handlePlay}
      showPlayOnly={showPlayOnly}
    />
  );
};

AudioPlayer.propTypes = {
  id: PropTypes.string,
  isPlaying: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
  playPrevious: PropTypes.func.isRequired,
  playNext: PropTypes.func.isRequired,
  setVoicemailID: PropTypes.func,
  showPlayOnly: PropTypes.bool
};

AudioPlayer.defaultProps = {
  id: "",
  showPlayOnly: false,
  setVoicemailID: () => {}
};

export default AudioPlayer;
