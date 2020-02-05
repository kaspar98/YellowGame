import React from 'react';

import WaitingForPlayers from './WaitingForPlayers';
import EnterName from './EnterName';
import EnterGameCode from './EnterGameCode';


class GameArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStatus: 'enter_code',
      playerName: null
    };

    this.setName = this.setName.bind(this);
    this.codeEntered = this.codeEntered.bind(this);
  }

  setName(name) {
    this.setState({playerName: name, gameStatus: 'recruiting'});
    this.props.socket.emit('playerJoin', {name});
  }

  codeEntered() {
    this.setState({gameStatus: 'enter_name'})
  }

  render() {
    switch (this.state.gameStatus) {
      case 'enter_code':
        return <EnterGameCode codeEntered={this.codeEntered} />;
      case 'enter_name':
        return <EnterName setName={this.setName} />;
      case 'recruiting':
        return <WaitingForPlayers />;
      default:
        return <h1>Unknown game state</h1>;
    }
  }
}

export default GameArea;
