import React from "react";

import GetReady from "./GetReady";
import RecruitingPlayers from "./RecruitingPlayers";
import HostDrawingScreen from "./HostDrawingScreen";

const getRandom = (arr, n) => {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("More elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
};

const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

const words = [
  'corn',
  'face',
  'flag',
  'snowflake',
  'rabbit',
  'grass',
  'worm',
  'hair',
  'giraffe',
  'candle',
  'blocks',
  'girl',
  'triangle',
  'spider',
  'zebra',
  'person',
  'bumblebee',
  'banana',
  'sea',
  'chicken',
  'mitten',
  'angel',
  'bunny',
  'octopus',
  'cupcake',
  'bee',
  'drum',
  'basketball',
  'leg',
  'blanket',
  'ring',
  'turtle',
  'ice cream cone',
  'motorcycle',
  'rainbow',
  'butterfly',
  'whale',
  'alive',
  'camera',
  'orange',
  'bark',
  'king',
  'bathroom',
  'socks',
  'doll',
  'crack',
  'jail',
  'lips',
  'plant',
  'ears'
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
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      code: Math.floor(Math.random() * 1000 + 1000)
    };

    this.startGame = this.startGame.bind(this);
    this.startDrawCountdown = this.startDrawCountdown.bind(this);
  }

  componentDidMount() {
    console.log('Host screen mounted');
    this.props.socket.on("playerJoin", ({ name }) => {
      console.log('Player joined', name);
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

  componentWillUnmount() {
    console.log('Host screen will unmount');
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
    console.log('startGame called');
    const drawer = this.getNextDrawer();
    const problem = this.getNextProblem();

    console.log('Next problem:', problem);
    console.log('Drawer:', drawer);

    const previousSubject = this.state.problem
      ? this.state.problem.subject
      : null;

    this.props.socket.emit("gameState", { state: "starting", drawer, problem });

    const countdown = isFirstGame ? 8 : 13;

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
    console.log('Current drawer index was', index);
    console.log('Next drawer index is', (index + 1) % this.state.players.length);
    console.log('Index corresponds to player', this.state.players[index]);
    console.log('Players list:', this.state.players);

    this.setState({ drawerIndex: (index + 1) % this.state.players.length });
    return this.state.players[index];
  }

  getNextProblem() {
    const options = getRandom(words, 4);

    return {
      subject: options[0],
      options: shuffleArray(options)
    };
  }

  renderHostState() {
    switch (this.state.hostState) {
      case "lobby":
        return (
          <RecruitingPlayers
            startGame={() => this.startGame(true)}
            players={this.state.players}
            code={this.state.code}
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
            code={this.state.code}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <React.Fragment>
        <audio controls autoPlay loop style={{display: "none"}}>
          <source src="http://soundimage.org/wp-content/uploads/2017/05/Hypnotic-Puzzle3.mp3" />
        </audio>
        {this.renderHostState()}
      </React.Fragment>
    );
  }
}

export default HostScreen;
