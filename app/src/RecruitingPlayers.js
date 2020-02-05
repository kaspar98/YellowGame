import React from 'react';

class RecruitingPlayers extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='host-screen-container'>

                <h1 id='gameCode'>GAME CODE: 339912</h1>
                <div className='host-screen-info'>
                    <h3>JOINED PLAYERS</h3>
                    <ul>
                        <li>Toomas</li>
                        <li>Ats</li>
                    </ul>
                </div>
                <div className='host-screen-start'>
                    <input className="submit-button" type="button" onClick={this.props.startGame}
                           value="Start when ALL have joined"/>
                </div>
            </div>
        );
    }
}

export default RecruitingPlayers;
