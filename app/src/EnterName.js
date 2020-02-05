import React from 'react';

class EnterName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: null};
    this.setName = this.setName.bind(this);
    this.onNameChange = this.onNameChange.bind(this);

  }

  onNameChange(event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  setName() {
    this.props.setName(this.state.inputValue);
  }


  render() {
    return (
        <div className="enter-code-container">
          <form>
            Your name:
            <input className="input-field" type="text" name="code" onChange={this.onNameChange}/>
            <input className="submit-button" type="button" onClick={this.setName} value="Enter name"/>
          </form>
        </div>
    );  }
}

export default EnterName;
