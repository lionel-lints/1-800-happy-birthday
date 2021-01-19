import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHowler from "react-howler";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    // The source audio files that we'll switch between
    this.sources = props.sources;

    this.state = {
      currentSrcIndex: 0,
      playing: false
    };

    this.handleNext = this.handleNext.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  handleNext() {
    const nextIndex =
      this.state.currentSrcIndex >= this.sources.length - 1
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
          src={this.sources[this.state.currentSrcIndex]}
        />
        <button className="full" onClick={this.handleNext}>
          Next Recording
        </button>
        <div>
          Current Recording: {this.state.currentSrcIndex + 1} of{" "}
          {this.sources.length}
        </div>
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
