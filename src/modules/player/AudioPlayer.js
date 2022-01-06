import React, { useState } from "react";
import PropTypes from "prop-types";

import { AudioControls } from "@/modules/player";

const AudioPlayer = ({
  sources,
  isPlaying,
  setIsPlaying,
  setActiveVoicemail,
  setVoicemailID,
  showPlayOnly
}) => {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);

  const handleNext = () => {
    const next =
      currentSrcIndex >= sources.length - 1 ? 0 : currentSrcIndex + 1;

    setCurrentSrcIndex(next);
    setActiveVoicemail(sources[next]);
  };

  const handlePrevious = () => {
    const previous =
      currentSrcIndex > 0 ? currentSrcIndex - 1 : sources.length - 1;

    setCurrentSrcIndex(previous);
    setActiveVoicemail(sources[previous]);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setActiveVoicemail(sources[currentSrcIndex]);

    if (setVoicemailID) setVoicemailID();
  };

  return (
    <AudioControls
      isPlaying={isPlaying}
      forward={handleNext}
      back={handlePrevious}
      togglePlay={togglePlay}
      showPlayOnly={showPlayOnly}
    />
  );
};

AudioPlayer.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  setActiveVoicemail: PropTypes.func.isRequired,
  setVoicemailID: PropTypes.func,
  showPlayOnly: PropTypes.bool
};

AudioPlayer.defaultProps = { showPlayOnly: false, setVoicemailID: () => {} };

export default AudioPlayer;
