import React from "react";

import GetReady from "./GetReady";
import RecruitingPlayers from "./RecruitingPlayers";
import HostDrawingScreen from "./HostDrawingScreen";

const problems = [
  {
    subject: "Kangaroo",
    options: ["Panda", "Cat", "Kangaroo", "Audi S3"]
  },
  {
    subject: "Delta Building",
    options: ["Delta Building", "Computer", "A can of tuna", "Bananas"]
  }
];

class HostScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      hostState: "lobby",
      drawerIndex: 0,
      problemIndex: 0,
      scores: {}
    };

    this.startGame = this.startGame.bind(this);
    this.startDrawCountdown = this.startDrawCountdown.bind(this);
  }

  componentDidMount() {
    this.props.socket.on("playerJoin", ({ name }) => {
      this.setState({
        players: [...this.state.players, name]
      });
    });

    this.props.socket.on("guessSubmitted", ({ player, correct }) => {
      const currentScore = this.state.scores[player] || 0;
      const delta = correct ? 10 : -10;
      const newScore = currentScore + delta;

      this.setState({ scores: { ...this.state.scores, [player]: newScore } });
    });
  }

  startDrawCountdown() {
    this.setState({ countdown: 20 });
    this.props.socket.emit("countdown", 20);

    const id = setInterval(() => {
      const countdown = Math.max(this.state.countdown - 1, 0);
      this.setState({ countdown });
      this.props.socket.emit("countdown", countdown);

      if (countdown === 0) {
        clearInterval(id);
        this.startGame();
      }
    }, 1000);
  }

  broadcastCountdown() {
    const id = setInterval(() => {
      const countdown = Math.max(this.state.countdown - 1, 0);

      this.setState({ countdown });
      this.props.socket.emit("countdown", countdown);

      if (countdown == 0) {
        clearInterval(id);
        this.props.socket.emit("gameState", { state: "in_game" });
        this.setState({ hostState: "in_game" });
        this.startDrawCountdown();
      }
    }, 1000);
  }

  startGame() {
    const drawer = this.getNextDrawer();
    const problem = this.getNextProblem();

    this.props.socket.emit("gameState", { state: "starting", drawer, problem });
    this.props.socket.emit("countdown", 10);
    this.setState({ hostState: "starting", countdown: 10, drawer });
    this.broadcastCountdown();
  }

  getNextDrawer() {
    const index = this.state.drawerIndex;

    this.setState({ drawerIndex: (index + 1) % this.state.players.length });
    return this.state.players[index];
  }

  getNextProblem() {
    const index = this.state.problemIndex;

    this.setState({ problemIndex: (index + 1) % problems.length });
    return problems[index];
  }

  render() {
    switch (this.state.hostState) {
      case "lobby":
        return (
          <RecruitingPlayers
            startGame={this.startGame}
            players={this.state.players}
          />
        );
      case "starting":
        return <GetReady countdown={this.state.countdown} />;
      case "in_game":
        return (
          <HostDrawingScreen
            players={this.state.players}
            scores={this.state.scores}
            drawer={this.state.drawer}
            socket={this.props.socket}
          />
        );
      default:
        return null;
    }
  }
}

export default HostScreen;
