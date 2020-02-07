import React from "react";

class GetReadyForPlayer extends React.Component {
  render() {
    return (
      <div className="waitingplayers">
        <div>
          <p>Get Ready!</p>
          <p>{this.props.countdown}</p>
          {
            <p
              key="you-are-drawing"
              className="you-are-drawing"
              style={{ opacity: this.props.isDrawing ? 1 : 0 }}
            >
              You are drawing!
            </p>
          }
        </div>
      </div>
    );
  }
}

export default GetReadyForPlayer;
