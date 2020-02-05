import React from 'react';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {becomeHost, joinGame} = this.props;

    return (
      <React.Fragment>
        <button className="host-button" onClick={becomeHost}>Host</button>
        <button className="join-button" onClick={joinGame}>Join</button>
      </React.Fragment>
    );
  }
}

export default MainMenu;
