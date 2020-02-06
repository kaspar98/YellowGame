import React from "react";

import Scoreboard from "./Scoreboard";

class HostDrawingScreen extends React.Component {
  render() {
    return (
      <div className="host-drawing-screen">
        <Scoreboard players={this.props.players} scores={this.props.scores} />
        <div className="host-drawing-canvas-area">
          <div className="host-drawing-canvas" />
          <div className="host-drawing-drawer">
            {this.props.drawer} is drawing...
          </div>
        </div>
      </div>
    );
  }
}

export default HostDrawingScreen;
