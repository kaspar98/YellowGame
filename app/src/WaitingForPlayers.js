import React from "react";

class WaitingForPlayers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="waitingplayers">
        <div>
          <p>Waiting for players...</p>
        </div>
      </div>
    );
  }
}

export default WaitingForPlayers;
