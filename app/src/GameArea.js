import React from 'react';

import WaitingForPlayers from './WaitingForPlayers';
import EnterName from './EnterName';

class GameArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStatus: 'enter_name',
      playerName: null
    };

    this.setName = this.setName.bind(this);
  }

  setName(name) {
    this.setState({playerName: name, gameStatus: 'recruiting'});
  }

  render() {
    switch (this.state.gameStatus) {
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
