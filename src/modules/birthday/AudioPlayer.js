import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import ReactHowler from "react-howler";

import { AudioControls } from "@/modules/birthday";

const AudioPlayer = ({
  sources,
  isPlaying,
  setIsPlaying,
  setActiveVoicemail,
  type
}) => {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  const player = useRef();

  const handleNext = () => {
    const nextIndex =
      currentSrcIndex >= sources.length - 1 ? 0 : currentSrcIndex + 1;

    setCurrentSrcIndex(nextIndex);
  };

  const handlePrevious = () => {
    const nextIndex =
      currentSrcIndex > 0 ? currentSrcIndex - 1 : sources.length - 1;
    setCurrentSrcIndex(nextIndex);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const endPlay = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <ReactHowler
        playing={isPlaying}
        // When the sources are swapped we'll pass a new
        // src prop into ReactHowler which will destroy our
        // currently playing Howler.js and initialize
        // a new Howler.js instance
        src={sources[currentSrcIndex]}
        ref={player}
        onEnd={endPlay}
      />
      <AudioControls
        isPlaying={isPlaying}
        forward={handleNext}
        back={handlePrevious}
        togglePlay={togglePlay}
        showPlayButton={type === "button"}
      />
    </>
  );
};

AudioPlayer.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  setActiveVoicemail: PropTypes.func.isRequired,
  type: PropTypes.string
};

AudioPlayer.defaultProps = { type: "" };

export default AudioPlayer;
