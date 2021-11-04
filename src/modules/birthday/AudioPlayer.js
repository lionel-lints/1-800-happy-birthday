import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHowler from "react-howler";
import styled from "styled-components";

import AudioControls from "@/modules/birthday/AudioControls.js";

const StyledPlayButton = styled.div`
  border: 3px solid red;
  padding: 1rem;
  font-size: 2rem;
  transition: border-color 0.25s ease-in-out;
  font-family: BradleyMicro;

  &:hover {
    cursor: pointer;
    border-color: white;
  }
`;

const StyledControls = styled.div`
  margin-top: 3rem;
  color: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  width: 50%;

  > span {
    font-size: 1rem;
    font-family: RobotoMono;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 0.5rem;
    transition: border-color 0.25s ease-in-out;

    &:hover {
      cursor: pointer;
      border-color: white;
    }
  }
`;

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
        <StyledControls>
          <span onClick={this.handlePrev}>Previous</span>
          <StyledPlayButton onClick={this.togglePlay}>
            {this.props.isPlaying ? `Pause` : `Play`}
          </StyledPlayButton>
          <span onClick={this.handleNext}>Next</span>
        </StyledControls>
        {/* <AudioControls
          isPlaying={this.props.isPlaying}
          forward={this.handleNext}
          back={this.handlePrev}
          playPause={this.togglePlay}
        /> */}
      </>
    );
  }
}

AudioPlayer.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AudioPlayer;
