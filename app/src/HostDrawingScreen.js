import React from "react";

import Scoreboard from "./Scoreboard";

class HostDrawingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    };

    this.onDrawBoard = this.onDrawBoard.bind(this);
  }

  componentDidMount() {
    this.props.socket.on("drawBoard", this.onDrawBoard);
  }

  onDrawBoard(data) {
    this.setState({ data });
  }

  componentWillUnmount() {
    this.props.socket.removeListener("drawBoard", this.onDrawBoard);
  }

  render() {
    return (
      <div className="host-drawing-screen">
        <Scoreboard
          players={this.props.players}
          scores={this.props.scores}
          countdown={this.props.countdown}
        />
        <div className="host-drawing-canvas-area">
          <img src={this.state.data} className="host-drawing-canvas" />
          <div className="host-drawing-drawer">
            {this.props.drawer} is drawing...
          </div>
        </div>
      </div>
    );
  }
}

export default HostDrawingScreen;
