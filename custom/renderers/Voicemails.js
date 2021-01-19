// custom component to see the voicemail component
import React, { Component } from "react";
import ReactHowler from "react-howler";

const Voicemails = ({ name, value }) => {
  let urls = value.map(vm => vm.url);
  return (
    <div>
      <SwapSource sources={urls} />
    </div>
  );
};

class SwapSource extends Component {
  constructor(props) {
    super(props);

    // The two files that we'll switch between
    this.sources = props.sources;

    this.state = {
      currentSrcIndex: 0,
      playing: false
    };

    this.handleSwap = this.handleSwap.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  handleSwap() {
    // Just switch back and forth between 0 and 1
    const nextIndex = this.state.currentSrcIndex === 0 ? 1 : 0;
    this.setState({ currentSrcIndex: nextIndex });
  }

  handlePlay() {
    this.setState({
      playing: true
    });
  }

  handlePause() {
    this.setState({
      playing: false
    });
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
        <button className="full" onClick={this.handleSwap}>
          Swap Source
        </button>
        <br />
        <button onClick={this.handlePlay}>Play</button>
        <button onClick={this.handlePause}>Pause</button>
      </div>
    );
  }
}
export default Voicemails;
