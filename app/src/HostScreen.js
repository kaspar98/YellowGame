import React from 'react';

import GetReady from './GetReady';
import RecruitingPlayers from "./RecruitingPlayers";


class HostScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      hostState: 'lobby'
    };

    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('playerJoin', ({name}) => {
      this.setState({
        players: [...this.state.players, name]
      });
    });
  }

  broadcastCountdown() {
    const id = setInterval(() => {
      const countdown = Math.max(this.state.countdown - 1, 0);

      this.setState({countdown});
      this.props.socket.emit('countdown', countdown);

      if (countdown == 0) {
        clearInterval(id);
      }

    }, 1000);
  }

  startGame() {
    this.props.socket.emit('gameState', 'starting');
    this.props.socket.emit('countdown', 10);
    this.setState({hostState: 'starting', countdown: 10});
    this.broadcastCountdown();
  }

  render() {
    switch (this.state.hostState) {
      case 'lobby':
        return <RecruitingPlayers startGame={this.startGame}>;
      case 'starting':
        return <GetReady />;
      default:
        return null;
    }
  }
}

export default HostScreen;
