import React from "react";

class EnterGameCode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="enter-code-container">
          <span className="enter-code-text">Enter Game Code</span>
          <div className="enter-code-form">
            <input className="enter-code-input-field" type="text" name="code" />
            <input
              className="submit-button"
              type="button"
              onClick={this.props.codeEntered}
              value="GO"
            />
          </div>
      </div>
    );
  }
}

export default EnterGameCode;
