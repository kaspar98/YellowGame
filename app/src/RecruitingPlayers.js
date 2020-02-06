import React from "react";

class RecruitingPlayers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="host-screen-container">
        <div className="game-code-info-container">
          <span className="game-code-heading">GAME CODE</span>
          <span className="game-code-number">339912</span>
        </div>
        <div className="host-screen-info">
          <div className="joined-players">
            <h1>JOINED PLAYERS</h1>
            <ul>
              {this.props.players.map(name => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
          <div className="host-screen-start">
            <input
              className="submit-button"
              type="button"
              onClick={this.props.startGame}
              value="Start when ALL have joined"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RecruitingPlayers;
