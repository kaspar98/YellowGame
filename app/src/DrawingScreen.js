import React from "react";
import { SketchField, Tools } from "react-sketch";

class DrawingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.drawBoardBroadcaster = setInterval(() => {
      this.props.socket.emit("drawBoard", this._sketch.toDataURL());
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.drawBoardBroadcaster);
  }

  render() {
    return (
      <div className="drawer-drawing-screen">
        <div className="drawer-drawing-screen-text">
          Draw a {this.props.problem.subject}
        </div>
        <div className="drawer-drawing-screen-timer-text">
          {this.props.countdown}
        </div>
        <div className="drawer-drawing-canvas-area">
          <SketchField
            width="100%"
            height="100%"
            tool={Tools.Pencil}
            lineColor="black"
            lineWidth={5}
            backgroundColor="white"
            ref={c => (this._sketch = c)}
          />
        </div>
      </div>
    );
  }
}

export default DrawingScreen;
