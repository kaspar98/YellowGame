import React from "react";

class GetReady extends React.Component {
  render() {
    if (this.props.countdown <= 7 || !this.props.previousSubject) {
      return (
        <div className="waitingplayers">
          <div>
            <p>Get Ready!</p>
            <b>{this.props.countdown}</b>
          </div>
        </div>
      );
    } else {
      return (
        <div className="post-game">
          <h2>
            The correct answer was <b>{this.props.previousSubject}</b>
          </h2>
          <img src={this.props.currentDrawing} />
        </div>
      );
    }
  }
}

export default GetReady;
