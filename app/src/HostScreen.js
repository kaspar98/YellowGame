import React from 'react';

class HostScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: []
    };
  }

  componentDidMount() {
    this.props.socket.on('playerJoin', ({name}) => {
      this.setState({
        players: [...this.state.players, name]
      });
    });
  }

  render() {
    return <h1>Host screen</h1>;
  }
}

export default HostScreen;
