import React from 'react';

class EnterGameCode extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="enter-code-container">
                <form>
                    Game code:
                    <input className="input-field" type="text" name="code"/>
                    <input className="submit-button" type="button" onClick={this.props.codeEntered} value="Join game"/>
                </form>
            </div>
        );
    }
}

export default EnterGameCode;
