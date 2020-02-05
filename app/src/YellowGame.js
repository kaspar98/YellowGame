import React from 'react';
import MainMenu from './MainMenu';
import socketIOClient from 'socket.io-client';

class YellowGame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainMenu />
    );
  }
}

export default YellowGame;
