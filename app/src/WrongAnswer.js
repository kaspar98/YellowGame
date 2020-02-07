import React from "react";

class WrongAnswer extends React.Component {
  render() {
    return (
      <div className="wrong-answer-container">
        <div className="youhaveguessed">
          <p>Wrong answer!</p>
          <p>Wait for others...</p>
        </div>
      </div>
    );
  }
}

export default WrongAnswer;
