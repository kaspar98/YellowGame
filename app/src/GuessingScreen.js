import React from "react";

class GuessingScreen extends React.Component {
  render() {
    return (
      <div className="guessing-screen">
        <h1>What's being drawn?</h1>

        <div className="guessing-screen-keskele">
          <div className="action-button animate button-text violet">
            BASKETBALL
          </div>
          <div className="action-button animate button-text red">BASEBALL</div>
        </div>
        <div className="guessing-screen-keskele">
          <div className="action-button animate button-text green">
            FOOTBALL
          </div>
          <div className="action-button animate button-text cyan">LIME</div>
        </div>
      </div>
    );
  }
}

export default GuessingScreen;
