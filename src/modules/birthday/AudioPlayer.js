import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHowler from "react-howler";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // The source audio files that we'll switch between
      sources: props.sources,
      currentSrcIndex: 0,
      playing: false
    };

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

  togglePlay() {
    this.setState({ playing: !this.state.playing });
  }

  render() {
    return (
      <div>
        <ReactHowler
          playing={this.state.playing}
          // When the sources are swapped we'll pass a new
          // src prop into ReactHowler which will destroy our
          // currently playing Howler.js and initialize
          // a new Howler.js instance
          src={this.state.sources[this.state.currentSrcIndex]}
        />
        <div>
          Current Recording: {this.state.currentSrcIndex + 1} of{" "}
          {this.state.sources.length}
        </div>
        <button className="full" onClick={this.handleNext}>
          Next Recording
        </button>
        <button onClick={this.togglePlay}>
          {this.state.playing ? "Pause" : "Play"}
        </button>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AudioPlayer;
