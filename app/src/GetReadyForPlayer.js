import React from 'react';

class GetReadyForPlayer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Get ready (player screen)</h1>
        <b>{this.props.countdown}</b>
        {this.props.isDrawing && <h2>You are drawing</h2>}
      </React.Fragment>
    );
  }
}

export default GetReadyForPlayer;
