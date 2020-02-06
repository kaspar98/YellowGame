import React from "react";
import CorrectAnswer from "./CorrectAnswer"
import WrongAnswer from "./WrongAnswer"

class GuessSubmitted extends React.Component {
  render() {
    if (this.props.isGuessCorrect) {
      return <CorrectAnswer />;
    } else {
      return <WrongAnswer />;
    }
  }
}

export default GuessSubmitted;
