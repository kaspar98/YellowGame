import React from "react";

import Scoreboard from "./Scoreboard";

class HostDrawingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ""
    };
  }

  componentDidMount() {
    this.props.socket.on("drawBoard", data => {
      this.setState({ data });
    });
  }

  render() {
    return (
      <div className="host-drawing-screen">
        <Scoreboard players={this.props.players} scores={this.props.scores} />
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
