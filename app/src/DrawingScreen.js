import React from "react";
import { SketchField, Tools } from "react-sketch";

const Countdown = ({ countdown }) => {
  if (countdown <= 5) {
    return <span className="countdown-low">{countdown}</span>;
  } else {
    return countdown;
  }
};

class DrawingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redToggled: false
    };
  }

  componentDidMount() {
    this.drawBoardBroadcaster = setInterval(() => {
      this.props.socket.emit("drawBoard", this._sketch.toDataURL());
    }, 1000);

    this.screenFlasher = setInterval(() => {
      if (this.props.countdown < 5) {
        this.setState({ redToggled: !this.state.redToggled });
      }
    }, 250);
  }

  componentWillUnmount() {
    clearInterval(this.drawBoardBroadcaster);
    clearInterval(this.screenFlasher);
  }

  render() {
    return (
      <div className="drawer-drawing-screen">
        <div className="drawer-drawing-screen-text">
          Draw a <b>{this.props.problem.subject}</b>
        </div>
        <div className="drawer-drawing-screen-timer-text">
          <Countdown countdown={this.props.countdown} />
        </div>
        <div className="drawer-drawing-canvas-area">
          <SketchField
            width="100%"
            height="100%"
            tool={Tools.Pencil}
            lineColor="black"
            lineWidth={5}
            style={{
              backgroundColor: this.state.redToggled ? "#f05545" : "#eeeeee"
            }}
            className="drawer-drawing-canvas-container"
            ref={c => (this._sketch = c)}
          />
        </div>
      </div>
    );
  }
}

export default DrawingScreen;
