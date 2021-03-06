import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHowler from "react-howler";
import styled from "styled-components";

import AudioAnalyser from "@/modules/birthday/AudioAnalyser.js";

const StyledDiv = styled.div`
  margin: auto;
  position: absolute;
  bottom: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // The source audio files that we'll switch between
      sources: props.sources,
      currentSrcIndex: 0,
      playing: false,
      audioCTX: null
    };

    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
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
      this.state.currentSrcIndex > 0 ? this.state.currentSrcIndex - 1 : 0;
    this.setState({ currentSrcIndex: nextIndex });
  }

  togglePlay() {
    this.setState({ playing: !this.state.playing });
  }

  render() {
    return (
      <>
        <ReactHowler
          playing={this.state.playing}
          // When the sources are swapped we'll pass a new
          // src prop into ReactHowler which will destroy our
          // currently playing Howler.js and initialize
          // a new Howler.js instance
          src={this.state.sources[this.state.currentSrcIndex]}
          ref={ref => (this.player = ref)}
        />
        <div>
          Current Recording: {this.state.currentSrcIndex + 1} of{" "}
          {this.state.sources.length}
        </div>
        <StyledDiv>
          <button className="full" onClick={this.handlePrev}>
            Previous Recording
          </button>
          <button onClick={this.togglePlay}>
            {this.state.playing ? "Pause" : "Play"}
          </button>
          <button className="full" onClick={this.handleNext}>
            Next Recording
          </button>
        </StyledDiv>
      </>
    );
  }
}

AudioPlayer.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AudioPlayer;
