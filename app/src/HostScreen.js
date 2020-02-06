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
      scores: {},
      currentDrawing:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
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

    this.props.socket.on("drawBoard", data => {
      this.setState({ currentDrawing: data });
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
        this.startGame(false);
      }
    }, 1000);
  }

  broadcastCountdown() {
    const id = setInterval(() => {
      const countdown = Math.max(this.state.countdown - 1, 0);

      this.setState({ countdown });
      this.props.socket.emit("countdown", countdown);

      if (countdown === 0) {
        clearInterval(id);
        this.props.socket.emit("gameState", { state: "in_game" });
        this.setState({ hostState: "in_game" });
        this.startDrawCountdown();
      }
    }, 1000);
  }

  startGame(isFirstGame) {
    const drawer = this.getNextDrawer();
    const problem = this.getNextProblem();

    const previousSubject = this.state.problem
      ? this.state.problem.subject
      : null;

    this.props.socket.emit("gameState", { state: "starting", drawer, problem });

    const countdown = isFirstGame ? 8 : 15;

    this.props.socket.emit("countdown", countdown);
    this.setState({
      hostState: "starting",
      countdown,
      drawer,
      problem,
      previousSubject
    });
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
            startGame={() => this.startGame(true)}
            players={this.state.players}
          />
        );
      case "starting":
        return (
          <GetReady
            countdown={this.state.countdown}
            currentDrawing={this.state.currentDrawing}
            previousSubject={this.state.previousSubject}
          />
        );
      case "in_game":
        return (
          <HostDrawingScreen
            players={this.state.players}
            scores={this.state.scores}
            drawer={this.state.drawer}
            socket={this.props.socket}
            countdown={this.state.countdown}
          />
        );
      default:
        return null;
    }
  }
}

export default HostScreen;
