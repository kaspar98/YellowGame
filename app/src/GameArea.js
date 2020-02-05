import React from "react";

import WaitingForPlayers from "./WaitingForPlayers";
import EnterName from "./EnterName";
import EnterGameCode from "./EnterGameCode";
import GetReadyForPlayer from "./GetReadyForPlayer";
import DrawingScreen from "./DrawingScreen";
import GuessingScreen from "./GuessingScreen";

class GameArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStatus: "enter_code",
      playerName: null,
      isDrawing: false,
      countdown: 0
    };

    this.setName = this.setName.bind(this);
    this.codeEntered = this.codeEntered.bind(this);
  }

  componentDidMount() {
    this.props.socket.on("gameState", ({ state, drawer }) => {
      if (state === "starting") {
        this.setState({
          isDrawing: drawer === this.state.playerName,
          gameStatus: "starting"
        });
      } else if (state === "in_game") {
        this.setState({ gameStatus: "in_game" });
      }
    });

    this.props.socket.on("countdown", countdown => {
      this.setState({ countdown });
    });
  }

  setName(name) {
    this.setState({ playerName: name, gameStatus: "recruiting" });
    this.props.socket.emit("playerJoin", { name });
  }

  codeEntered() {
    this.setState({ gameStatus: "enter_name" });
  }

  render() {
    switch (this.state.gameStatus) {
      case "enter_code":
        return <EnterGameCode codeEntered={this.codeEntered} />;
      case "enter_name":
        return <EnterName setName={this.setName} />;
      case "recruiting":
        return <WaitingForPlayers />;
      case "starting":
        return (
          <GetReadyForPlayer
            countdown={this.state.countdown}
            isDrawing={this.state.isDrawing && this.state.countdown < 5}
          />
        );
      case "in_game":
        if (this.state.isDrawing) {
          return <DrawingScreen />;
        } else {
          return <GuessingScreen />;
        }
      default:
        return <h1>Unknown game state</h1>;
    }
  }
}

export default GameArea;
