import React from "react";

import logo from './logo.png';

class WelcomeScreen extends React.Component {

  render() {

    return (
        <div class="extrastartscreen">
        <div><p>Press on the logo to start</p></div>
        <img src={logo} alt="Logo" onClick={this.props.onLogoClicked}/>
        </div>

    );
  }
}

export default WelcomeScreen;
