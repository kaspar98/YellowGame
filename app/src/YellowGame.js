import React from 'react';
import MainMenu from './MainMenu';
import GameArea from './GameArea';
import HostScreen from './HostScreen';
import io from 'socket.io-client';

class YellowGame extends React.Component {
  constructor(props) {
    super(props);

    this.socket = io.connect('http://localhost:14000');

    this.state = {deviceType: null};

    this.becomeHost = this.becomeHost.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  becomeHost() {
    this.setState({deviceType: 'host'});
  }

  joinGame() {
    this.setState({deviceType: 'player'});
  }

  render() {
    switch (this.state.deviceType) {
      case 'player':
        return <GameArea socket={this.socket} />;
      case 'host':
        return <HostScreen socket={this.socket} />;
      default:
        return <MainMenu becomeHost={this.becomeHost} joinGame={this.joinGame} />;
    }
  }
}

export default YellowGame;
