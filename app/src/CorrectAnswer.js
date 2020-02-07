import React from "react";

class CorrectAnswer extends React.Component {
  render() {
    return (
      <div class="youhaveguessed">
        <p>Correct answer!</p>
        <p>Wait for others...</p>
      </div>
    );
  }
}

export default CorrectAnswer;
