import React, { Component } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  position: absolute;
  canvas {
    visibility: ${p => (p.isPlaying === true ? "inherit" : "hidden")};
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
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext("2d");
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = "#FFFFFF";
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
    return (
      <StyledDiv isPlaying={this.props.isPlaying}>
        <canvas
          width={this.state.width}
          height="30"
          ref={this.canvas}
          resize="true"
        />
      </StyledDiv>
    );
  }
}

export default AudioVisualizer;
