import React from "react";
import PropTypes from "prop-types";

import { AudioControls } from "@/modules/player";

const AudioPlayer = ({
  isPlaying,
  togglePlay,
  playPrevious,
  playNext,
  showPlayOnly
}) => {
  return (
    <AudioControls
      isPlaying={isPlaying}
      forward={playNext}
      back={playPrevious}
      togglePlay={togglePlay}
      showPlayOnly={showPlayOnly}
    />
  );
};

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
  playPrevious: PropTypes.func.isRequired,
  playNext: PropTypes.func.isRequired,
  showPlayOnly: PropTypes.bool
};

AudioPlayer.defaultProps = {
  showPlayOnly: false
};

export default AudioPlayer;
