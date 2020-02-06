import React from "react";

class MainMenu extends React.Component {
  render() {
    const { becomeHost, joinGame } = this.props;

    return (
      <div className="main-menu">
        <div className="main-menu-title">
          <h1>Do you want to host a game or join an existing game?</h1>
        </div>
        <div className="start-buttons">
          <div>
            <button className="host-button" onClick={becomeHost}>
              Host
            </button>
          </div>
          <div>
            <button className="join-button" onClick={joinGame}>
              Join
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MainMenu;
