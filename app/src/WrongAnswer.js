import React from "react";


class WrongAnswer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div class="youhaveguessed">
        <div><h1>Wrong answer!</h1></div>
        <div><p>Wait for others...</p></div>
        </div>
    );
  }
}

export default WrongAnswer;
