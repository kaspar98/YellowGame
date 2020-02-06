import React from "react";

import logo from "./logo.png";

class WelcomeScreen extends React.Component {
  render() {
    return (
      <div className="extrastartscreen">
        <div>
          <h2>Press on the logo to start playing</h2>
        </div>
        <img src={logo} alt="Logo" onClick={this.props.onLogoClicked} />
      </div>
    );
  }
}

export default WelcomeScreen;
