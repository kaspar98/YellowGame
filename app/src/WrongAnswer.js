import React from "react";

class WrongAnswer extends React.Component {
  render() {
    return (
      <div class="youhaveguessed">
        <p>Wrong answer!</p>
        <p>Wait for others...</p>
      </div>
    );
  }
}

export default WrongAnswer;
