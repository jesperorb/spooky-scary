import React, { Component } from "react";
import Ghost from './Ghost';
import GhostSound from '../assets/GHOST8B.mp3';
import "../styles/App.css";

export default class App extends Component {

  state ={
    darkMode: false,
    luxValue: 0,
    sensitivity: 30
  }

  componentDidMount(){
    this.audio = new Audio(GhostSound)
    window.addEventListener('devicelight', event => {
      this.setState({ luxValue: event.value })
      if (event.value < this.state.sensitivity) {
        this.setState({darkMode: true })
        this.audio.play()
      } else {
        this.audio.pause();
        this.setState({ darkMode: false })
      }
    });
  }

  onChange = e => this.setState({[e.target.name] : e.target.value});

  render() {
    const fade = this.state.darkMode ? "fade" : '';
    return (
      <div className={`App ${ fade }`}>
        <div style={ {position: "absolute", top: 10, left: 20, textAlign: "center"} }>
          <input 
          type="range" 
          name="sensitivity"
          max="100"
          min="0" 
          value={this.state.sensitivity}
          onChange={this.onChange}
          />
          <p>{this.state.sensitivity}</p>
        </div>
        { this.state.darkMode && <Ghost /> }      
      </div>
    );
  }
}
