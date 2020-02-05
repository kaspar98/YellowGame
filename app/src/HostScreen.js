import React from 'react';

import GetReady from './GetReady';

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

  startGame() {
    this.props.socket.emit('gameState', 'starting');
    this.props.socket.emit('countdown', 10);
    this.setState({hostState: 'starting'});
  }

  render() {
    switch (this.state.hostState) {
      case 'lobby':
        return <button onClick={this.startGame}>Start game</button>;
      case 'starting':
        return <GetReady />;
      default:
        return null;
    }
  }
}

export default HostScreen;
