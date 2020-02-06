import React from "react";
import MainMenu from "./MainMenu";
import GameArea from "./GameArea";
import HostScreen from "./HostScreen";
import WelcomeScreen from "./WelcomeScreen";
import io from "socket.io-client";

class YellowGame extends React.Component {
  constructor(props) {
    super(props);

    this.socket = io.connect("http://localhost:14000");

    this.state = { deviceType: null, logoClicked: false };

    this.becomeHost = this.becomeHost.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.onLogoClicked = this.onLogoClicked.bind(this);
  }

  becomeHost() {
    this.setState({ deviceType: "host" });
  }

  joinGame() {
    this.setState({ deviceType: "player" });
  }

  onLogoClicked() {
    this.setState({ logoClicked: true });
  }

  render() {
    switch (this.state.deviceType) {
      case "player":
        return <GameArea socket={this.socket} />;
      case "host":
        return <HostScreen socket={this.socket} />;
      default:
        if (this.state.logoClicked) {
          return (
            <MainMenu becomeHost={this.becomeHost} joinGame={this.joinGame} />
          );
        } else {
          return <WelcomeScreen onLogoClicked={this.onLogoClicked} />;
        }
    }
  }
}

export default YellowGame;
