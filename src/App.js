import './App.css'

import React, {Component} from 'react'
import classNames from "classnames"
import ReactNbsp from "react-nbsp"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bits: localStorage.getItem("descriptorBits") || "",
      pieces: localStorage.getItem("descriptorPieces") || "",
      bits_and_pieces: ""
    }
  }
  generate = () => {
    let bits = this
      .state
      .bits
      .split("\n")
      .filter(entry => entry !== "")
    let pieces = this
      .state
      .pieces
      .split("\n")
      .filter(entry => entry !== "")

    this.setState({
      bits_and_pieces: `${bits[Math.floor(Math.random() * bits.length)]} ${pieces[Math.floor(Math.random() * pieces.length)]}`
    })
  }
  saveBits = (event) => {
    this.setState({bits: event.target.value})
    localStorage.setItem("descriptorBits", event.target.value)
  }
  savePieces = (event) => {
    this.setState({pieces: event.target.value})
    localStorage.setItem("descriptorPieces", event.target.value)
  }
  swap = (event) => {
    const bits = this.state.bits
    const pieces = this.state.pieces

    this.setState({pieces: bits, bits: pieces})
    localStorage.setItem("descriptorBits", pieces)
    localStorage.setItem("descriptorPieces", bits)
  }
  render() {
    return (
      <main>
        <div className="section">
          <h1 className="title is-4 has-text-centered">
            Descriptor Generator
          </h1>
        </div>
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column">
                <div className="content">
                  <h2 className="subtitle is-5">
                    Instructions
                  </h2>
                  <ul>
                    <li>Fill fields with text by pressing
                      <ReactNbsp/>
                      <span className="tag is-dark">Return</span><ReactNbsp/>
                      to separate entries</li>
                    <li>Alternatively, swap the content of the fields</li>
                  </ul>
                </div>
              </div>
              <div
                className="column is-half-mobile is-two-fifths-tablet is-one-third-desktop">
                <div className="level">
                  <div className="level-left">
                    <button className="button is-info is-fullwidth" onClick={this.swap}>Swap Bits&Pieces</button>
                  </div>
                  <div className="level-right">
                    <button className="button is-primary is-fullwidth" onClick={this.generate}>Generate Descriptor</button>
                  </div>
                </div>
                <div
                  className={classNames('notification', {
                  hidden: this.state.bits_and_pieces.length === 0
                })}>
                  {this.state.bits_and_pieces}
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="columns">
              <div className="column">
                <label className="label">Bits</label>
                <textarea
                  className="textarea"
                  onChange={this.saveBits}
                  rows="20"
                  value={this.state.bits}
                  placeholder="put your bits here, hit enter between each entry"></textarea>
              </div>
              <div className="column">
                <label className="label">Pieces</label>
                <textarea
                  className="textarea"
                  onChange={this.savePieces}
                  rows="20"
                  value={this.state.pieces}
                  placeholder="put your pieces here, hit enter between each entry"></textarea>
              </div>
            </div>
          </div>

        </div>
      </main>
    );
  }
}

export default App;
