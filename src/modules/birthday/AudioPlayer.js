import React, { useState } from "react";
import PropTypes from "prop-types";

import { AudioControls } from "@/modules/birthday";

const AudioPlayer = ({
  sources,
  isPlaying,
  setIsPlaying,
  setActiveVoicemail,
  setVoicemailName,
  type
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
    setVoicemailName();
    setActiveVoicemail(sources[currentSrcIndex]);
  };

  return (
    <AudioControls
      isPlaying={isPlaying}
      forward={handleNext}
      back={handlePrevious}
      togglePlay={togglePlay}
      showPlayButton={type === "button"}
    />
  );
};

AudioPlayer.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  setActiveVoicemail: PropTypes.func.isRequired,
  setVoicemailName: PropTypes.func.isRequired,
  type: PropTypes.string
};

AudioPlayer.defaultProps = { type: "" };

export default AudioPlayer;
