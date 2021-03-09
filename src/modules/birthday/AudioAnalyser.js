import React, { Component } from "react";

import AudioVisualizer from "@/modules/birthday/AudioVisualizer.js";

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.analyser = window.Howler.ctx.createAnalyser();
    window.Howler.masterGain.connect(this.analyser);

    let bufferLength = this.analyser.frequencyBinCount;
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
    return (
      <AudioVisualizer
        audioData={this.dataArray}
        isPlaying={this.props.isPlaying}
      />
    );
  }
}

export default AudioAnalyser;
