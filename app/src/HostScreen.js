import React from 'react';

import GetReady from './GetReady';
import RecruitingPlayers from "./RecruitingPlayers";


function getArrayRandomElement(arr) {
  if (arr && arr.length) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  // The undefined will be returned if the empty array was passed
}

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
        this.props.socket.emit('gameState', {state: 'in_game'});
      }

    }, 1000);
  }

  startGame() {
    const drawer = getArrayRandomElement(this.state.players);

    this.props.socket.emit('gameState', {state: 'starting', drawer});
    this.props.socket.emit('countdown', 10);
    this.setState({hostState: 'starting', countdown: 10});
    this.broadcastCountdown();
  }

  render() {
    switch (this.state.hostState) {
      case 'lobby':
        return <RecruitingPlayers startGame={this.startGame} />;
      case 'starting':
        return <GetReady />;
      default:
        return null;
    }
  }
}

export default HostScreen;
