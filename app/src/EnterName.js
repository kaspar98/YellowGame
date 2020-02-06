import React from "react";

class EnterName extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: null };
    this.setName = this.setName.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  onNameChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  setName() {
    this.props.setName(this.state.inputValue);
  }

  render() {
    return (
      <div className="enter-code-container">
        <span className="enter-code-text">Enter Your Name</span>
        <div className="enter-code-form">
          <input className="enter-code-input-field" type="text" name="code" onChange={this.onNameChange} />
          <input
            className="submit-button"
            type="button"
            onClick={this.setName}
            value="GO"
          />
        </div>
      </div>
    );
  }
}

export default EnterName;
