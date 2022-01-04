import React, { Component } from "react";

import { AudioVisualizer } from "@/modules/birthday";

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.analyser = window.Howler.ctx.createAnalyser();
    window.Howler.masterGain.connect(this.analyser);

    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);

    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
  }

  render() {
    const { isPlaying } = this.props;

    return (
      <AudioVisualizer
        audioData={this.dataArray}
        isPlaying={isPlaying}
        analyser={this.analyser}
      />
    );
  }
}

export default AudioAnalyser;
