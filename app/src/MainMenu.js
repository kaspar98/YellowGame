import React from "react";

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { becomeHost, joinGame } = this.props;

    return (
      <React.Fragment>
        <div id="hostorjoinquestion">
          <h1>Do you want to host a game or join an existing game?</h1>
        </div>
        <div id="startbutton_flex-container">
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
      </React.Fragment>
    );
  }
}

export default MainMenu;
