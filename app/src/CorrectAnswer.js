import React from "react";

class CorrectAnswer extends React.Component {
  render() {
    return (
      <div className="correct-answer-container">
        <div className="youhaveguessed">
          <p>Correct answer!</p>
          <p>Wait for others...</p>
        </div>
      </div>
    );
  }
}

export default CorrectAnswer;
