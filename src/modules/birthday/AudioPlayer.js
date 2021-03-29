import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHowler from "react-howler";
import styled from "styled-components";

import AudioAnalyser from "@/modules/birthday/AudioAnalyser.js";
import AudioControls from "@/modules/birthday/AudioControls.js";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // The source audio files that we'll switch between
      sources: props.sources,
      currentSrcIndex: 0,
      playing: props.isPlaying,
      audioCTX: null
    };

    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.endPlay = this.endPlay.bind(this);
  }

  handleNext() {
    const nextIndex =
      this.state.currentSrcIndex >= this.state.sources.length - 1
        ? 0
        : this.state.currentSrcIndex + 1;
    this.setState({ currentSrcIndex: nextIndex });
  }

  handlePrev() {
    const nextIndex =
      this.state.currentSrcIndex > 0
        ? this.state.currentSrcIndex - 1
        : this.state.sources.length - 1;
    this.setState({ currentSrcIndex: nextIndex });
  }

  togglePlay() {
    this.props.setIsPlaying(!this.props.isPlaying);
  }

  endPlay() {
    this.props.setIsPlaying(false);
  }

  render() {
    return (
      <>
        <ReactHowler
          playing={this.props.isPlaying}
          // When the sources are swapped we'll pass a new
          // src prop into ReactHowler which will destroy our
          // currently playing Howler.js and initialize
          // a new Howler.js instance
          src={this.state.sources[this.state.currentSrcIndex]}
          ref={ref => (this.player = ref)}
          onEnd={this.endPlay}
        />
        <AudioControls
          isPlaying={this.props.isPlaying}
          forward={this.handleNext}
          back={this.handlePrev}
          playPause={this.togglePlay}
        />
      </>
    );
  }
}

AudioPlayer.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AudioPlayer;
