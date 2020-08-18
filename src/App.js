import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      secActual: 300,
      secSet: 300,
      setButtonsDisabled: false,
      startOrPause: 'start'
    };
    
    this.addOneSec = this.addOneSec.bind(this);
    this.subtractOneSec = this.subtractOneSec.bind(this);
    this.addOneMin = this.addOneMin.bind(this);
    this.subtractOneMin = this.subtractOneMin.bind(this);
    this.add15Sec = this.add15Sec.bind(this);
    this.add30Sec = this.add30Sec.bind(this);
    this.subtract15Sec = this.subtract15Sec.bind(this);
    this.subtract30Sec = this.subtract30Sec.bind(this);
    this.set3Min = this.set3Min.bind(this);
    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
  }
  
  addOneSec() {
    this.setState(({secActual}) => ({
      secActual: secActual+1,
      secSet: secActual+1
    }));
  }
  
  subtractOneSec() {
    const {secActual} = this.state
    if(secActual > 0) {
      this.setState(({secActual}) => ({
        secActual: secActual-1,
        secSet: secActual-1
      }));
    }
    return;
  }
  
  addOneMin() {
    this.setState(({secActual}) => ({
      secActual: secActual+60,
      secSet: secActual+60
    }));
  }
  
  subtractOneMin() {
    const {secActual} = this.state
    if(secActual >= 60) {
      this.setState(({secActual}) => ({
        secActual: secActual-60,
        secSet: secActual-60
      }));
    }
    return;
  }
  
  add15Sec() {
    this.setState(({secActual}) => ({
      secActual: secActual+15,
      secSet: secActual+15
    }));
  }
  
  add30Sec() {
    this.setState(({secActual}) => ({
      secActual: secActual+30,
      secSet: secActual+30
    }));
  }

  subtract15Sec() {
    const {secActual} = this.state
    if(secActual >= 15) {
      this.setState(({secActual}) => ({
        secActual: secActual-15,
        secSet: secActual-15
      }));
    }
    return;
  }
  
  subtract30Sec() {
    const {secActual} = this.state
    if(secActual >= 30) {
      this.setState(({secActual}) => ({
        secActual: secActual-30,
        secSet: secActual-30
      }));
    }
    return;
  }
  
  set3Min() {
    this.setState({
      secActual: 180,
      secSet: 180
    });
  }
 
  start() {
    const{startOrPause, secActual} = this.state;
    const audioEl = document.getElementsByClassName("audio-element")[0];
    if(secActual === 0) { return }
    if(startOrPause === "start") {
      this.oneSecInterval = setInterval(() => {
        const {secActual} = this.state;
        if(secActual > 0) {
          this.setState(
            ({secActual}) => ({
              secActual: secActual-1,
              setButtonsDisabled: true,
              startOrPause: "pause"
            })
          )
          if(secActual === 1) {audioEl.play();}
        } else {
          this.setState({
              setButtonsDisabled: false
          });
          clearInterval(this.oneSecInterval);
        }
      }, 1000);
    } else {
      clearInterval(this.oneSecInterval);
      this.setState({
        setButtonsDisabled: false,
        startOrPause: "start"
      });
    }
  }
  
  reset() {
    const {secSet} = this.state;
    clearInterval(this.oneSecInterval);
    this.setState({
      secActual: secSet,
      setButtonsDisabled: false,
      startOrPause: "start"
    });
  }
  
  render() {
    const {secActual, setButtonsDisabled} = this.state;
    
    const min = Math.floor(secActual/60) < 10 ? `0${Math.floor(secActual/60)}`: Math.floor(secActual/60);
    const sec = (secActual % 60) < 10 ? `0${secActual % 60}`: secActual % 60;
    
    const setButtonsClass = ['buttons','set-buttons'];
    if(setButtonsDisabled === true) {
      setButtonsClass.push('button-disabled');
    }
    
    return(
      <div>
        <h2>Countdown clock</h2>
        <h1>{min}:{sec}</h1>
        <div>
          <button className={setButtonsClass.join(" ")} onClick={this.addOneSec}>sec &#9650;</button>
          <button className={setButtonsClass.join(" ")} onClick={this.subtractOneSec}>sec &#9660;</button>
          <button className={setButtonsClass.join(" ")} onClick={this.addOneMin}>min &#9650;</button>
          <button className={setButtonsClass.join(" ")} onClick={this.subtractOneMin}>min &#9660;</button>
        </div>
        <div>
          <button className={setButtonsClass.join(" ")} onClick={this.add15Sec}>15sec &#9650;</button>
          <button className={setButtonsClass.join(" ")} onClick={this.add30Sec}>30sec &#9650;</button>
          <button className={setButtonsClass.join(" ")} onClick={this.subtract15Sec}>15sec &#9660;</button>
          <button className={setButtonsClass.join(" ")} onClick={this.subtract30Sec}>30sec &#9660;</button>
        </div>
        <div>
          <button className={setButtonsClass.join(" ")} onClick={this.set3Min}>set 3min</button>
        </div>
        <div className="control-buttons">
          <button className={"buttons control-button"} onClick={this.start}>&#9654; <span className="pause">| |</span></button>
          <button className={"buttons control-button"} onClick={this.reset}>&#9724; </button>
        </div>
       
        <audio className="audio-element">
          <source src="http://parragi.com/bip.mp3"></source>
        </audio>
      </div>
    );
  }
}

export default App;
