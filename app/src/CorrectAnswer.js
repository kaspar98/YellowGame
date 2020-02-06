import React from "react";

class CorrectAnswer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div class="youhaveguessed">
        <div><h1>Correct answer!</h1></div>
        <div><p>Wait for others...</p></div>
        </div>
    );
  }
}

export default CorrectAnswer;
