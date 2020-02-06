import React from "react";

const Score = ({ playerName, score }) => {
  return (
    <tr>
      <td>{playerName}</td>
      <td className="score-number">{score}</td>
    </tr>
  );
};

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);

    this.getPlayerScore = this.getPlayerScore.bind(this);
    this.compareScores = this.compareScores.bind(this);
  }

  getPlayerScore(playerName) {
    return this.props.scores[playerName] || 0;
  }

  compareScores(a, b) {
    const scoreA = this.getPlayerScore(a);
    const scoreB = this.getPlayerScore(b);

    if (scoreA > scoreB) {
      return -1;
    }

    if (scoreA < scoreB) {
      return 1;
    }

    return 0;
  }

  render() {
    return (
      <div className="scoreboard">
        <h1>Scoreboard</h1>
        <table>
          {this.props.players.sort(this.compareScores).map(player => (
            <Score
              key={player}
              playerName={player}
              score={this.getPlayerScore(player)}
            />
          ))}
        </table>
      </div>
    );
  }
}

export default Scoreboard;
