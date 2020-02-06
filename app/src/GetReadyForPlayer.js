import React from "react";

class GetReadyForPlayer extends React.Component {
  render() {
    return (
      <div className="waitingplayers">
        <div>
          <p>Get Ready!</p>
          <b>{this.props.countdown}</b>
          {this.props.isDrawing && (
            <h2
              className="you-are-drawing"
              style={{ opacity: this.props.isDrawing ? 1 : 0 }}
            >
              You are drawing!
            </h2>
          )}
        </div>
      </div>
    );
  }
}

export default GetReadyForPlayer;
