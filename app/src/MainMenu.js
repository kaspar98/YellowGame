import React from 'react';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <button className="host-button">Host</button>
        <button className="join-button">Join</button>
      </React.Fragment>
    );
  }
}

export default MainMenu;
