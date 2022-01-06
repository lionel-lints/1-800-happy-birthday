import React, { Component } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 5;
  opacity: 0.5;

  canvas {
    visibility: ${p => (p.isPlaying ? "inherit" : "hidden")};
  }
`;

class AudioVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth || 500
    };
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { analyser } = this.props;
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const { height, width } = canvas;
    const context = canvas.getContext("2d");

    const meterWidth = 14;
    const gap = 2;

    const renderVis = () => {
      analyser.getByteFrequencyData(audioData);

      context.fillStyle = "black";
      context.clearRect(0, 0, width, height);

      audioData.forEach((value, i) => {
        context.fillRect(
          i * (meterWidth + gap),
          height,
          meterWidth,
          height - value
        );
      });
      requestAnimationFrame(renderVis);
    };
    renderVis();
  }

  render() {
    return (
      <StyledDiv isPlaying={this.props.isPlaying}>
        <canvas
          width={this.state.width}
          height="65"
          ref={this.canvas}
          resize="true"
        />
      </StyledDiv>
    );
  }
}

export default AudioVisualizer;
