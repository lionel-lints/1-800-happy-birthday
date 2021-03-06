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
      playing: false,
      audioCTX: null
    };

    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad() {
    console.log("player", this.player);
    console.log("howler", window.Howler);
    this.setState({ audioCTX: window.Howler.ctx });
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
      <div>
        <ReactHowler
          playing={this.state.playing}
          // When the sources are swapped we'll pass a new
          // src prop into ReactHowler which will destroy our
          // currently playing Howler.js and initialize
          // a new Howler.js instance
          onLoad={this.onLoad}
          src={this.state.sources[this.state.currentSrcIndex]}
          ref={ref => (this.player = ref)}
        />
        {this.state.audioCTX ? (
          <AudioAnalyser audioCTX={this.state.audioCTX} />
        ) : (
          ""
        )}
        <div>
          Current Recording: {this.state.currentSrcIndex + 1} of{" "}
          {this.state.sources.length}
        </div>
        <button className="full" onClick={this.handlePrev}>
          Previous Recording
        </button>
        <button onClick={this.togglePlay}>
          {this.state.playing ? "Pause" : "Play"}
        </button>
        <button className="full" onClick={this.handleNext}>
          Next Recording
        </button>
      </div>
    );
  }
}

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.analyser = window.Howler.ctx.createAnalyser();
    window.Howler.masterGain.connect(this.analyser);

    //this.analyser.fftSize = 2048;
    var bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);

    this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
  }

  render() {
    return <AudioVisualiser audioData={this.dataArray} />;
  }
}

class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext("2d");
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = "#000000";
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);
    for (const item of audioData) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();
  }

  render() {
    return <canvas width="300" height="300" ref={this.canvas} />;
  }
}

AudioPlayer.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AudioPlayer;
