import React from "react";

class GetReady extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="waitingplayers">
        <div>
         <p>Get Ready!</p>
          <b>{this.props.countdown}</b>
        </div>
      </div>
    );
  }
}

export default GetReady;
