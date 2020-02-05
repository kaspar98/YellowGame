import React from 'react';

import GetReady from './GetReady';
import RecruitingPlayers from "./RecruitingPlayers";


class HostScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gameStatus: 'before_start',
    };

    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.setState({gameStatus: 'countdown'})
  }

  render() {
    switch (this.state.gameStatus) {
      case 'before_start':
        return <RecruitingPlayers startGame={this.startGame} />;
      case 'countdown':
        return <GetReady />;
    }
  }
}

export default HostScreen;
