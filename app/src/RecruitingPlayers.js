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
          <span className="game-code-number">{this.props.code}</span>
        </div>
        <div className="host-screen-info">
          <div className="joined-players">
            <h1>JOINED PLAYERS ({this.props.players.length})</h1>
            <ul>
              {this.props.players.slice(0, 9).map(name => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
          <div className="host-screen-start">
            <input
              className="submit-button"
              type="button"
              onClick={this.props.startGame}
              value="Press when ready"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RecruitingPlayers;
