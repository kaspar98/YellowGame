import React from "react";

class GuessingScreen extends React.Component {
  render() {
    return (
      <div className="guessing-screen">
        <h1>What's being drawn?</h1>

        <div className="guessing-screen-keskele">
          <div
            onClick={() => this.props.onGuess(this.props.options[0])}
            className="action-button animate button-text violet"
          >
            {this.props.options[0]}
          </div>
          <div
            onClick={() => this.props.onGuess(this.props.options[1])}
            className="action-button animate button-text red"
          >
            {this.props.options[1]}
          </div>
        </div>
        <div className="guessing-screen-keskele">
          <div
            onClick={() => this.props.onGuess(this.props.options[2])}
            className="action-button animate button-text green"
          >
            {this.props.options[2]}
          </div>
          <div
            onClick={() => this.props.onGuess(this.props.options[3])}
            className="action-button animate button-text cyan"
          >
            {this.props.options[3]}
          </div>
        </div>
      </div>
    );
  }
}

export default GuessingScreen;
