import React from 'react';
import './App.css';

const audioClips = [{
    name: 'Q', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
    description: 'Chord-1'
}, {
    name: 'W', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
    description: 'Chord-2'
}, {
    name: 'E', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
    description: 'Chord-3'
}, {
    name: 'A', src: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
    description: 'Shaker'
}, {
    name: 'S', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
    description: 'Open-HH'
}, {
    name: 'D', src: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
    description: 'Closed-HH'
}, {
    name: 'Z', src: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
    description: 'Punchy-Kick'
}, {
    name: 'X', src: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
    description: 'Side-Stick'
}, {
    name: 'C', src: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
    description: 'Snare'
}];

function DrumPad(props) {
    let audioId = props.name + "-";
    return <button className="drum-pad" onClick={props.onClick} id={audioId}>{props.name}
        <audio id={props.name} className="clip" src={props.src}/>
    </button>;
}

function Display(props) {
    const elem = audioClips.find((item) => {
        return item.name == props.clipId;
    });
    const descr = elem.description;
    return <div id="display">Listen: {descr}</div>;
}

function Container(props) {
    const drumItems = audioClips.map((item) =>
        <DrumPad key={item.name} name={item.name} src={item.src}/>);
    console.log(drumItems)
    return <div id="drum-machine" onClick={props.onClick}>
        {drumItems}
        <Display clipId={props.clipId}/>
    </div>;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentClipIx: 'Q'
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(event) {
        const keyName = event.key.toUpperCase();
        if (undefined != audioClips.find((item) => {
            if (item.name == keyName) {
                return true;
            }
            return false;
        })) {
            this.setState({
                currentClipIx: keyName
            });
            document.getElementById(keyName).play();
        }
    }

    handleClick(event) {
        let audioId = event.target.id.slice(0, -1);
        this.setState({
            currentClipIx: audioId
        });
        console.log(audioId);
        document.getElementById(audioId).play();
    }

    render() {
        return (
            <Container onClick={this.handleClick} clipId={this.state.currentClipIx} onKeyPress={this.handleKeyPress}/>);
    }
}

export default App;
