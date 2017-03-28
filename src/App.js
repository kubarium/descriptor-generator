import './App.css'

import {Button, Col, ControlLabel, FormControl, FormGroup, Grid, Navbar, Row, Well} from 'react-bootstrap'
import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bits: localStorage.getItem("descriptorBits") || "",
      pieces: localStorage.getItem("descriptorPieces") || "",
      bits_and_pieces:""
    }
  }
  generate = () => {
    let bits = this.state.bits.split("\n").filter(entry=>entry!=="")
    let pieces = this.state.pieces.split("\n").filter(entry=>entry!=="")

    this.setState({
      bits_and_pieces:`${bits[Math.floor(Math.random() * bits.length)]} ${pieces[Math.floor(Math.random() * pieces.length)]}`
    })
  }
  saveBits = (event) => {
    this.setState({
      bits:event.target.value
    })
    localStorage.setItem("descriptorBits", event.target.value)
  }
  savePieces = (event) => {
    this.setState({
      pieces:event.target.value
    })
    localStorage.setItem("descriptorPieces", event.target.value)
  }
  render() {
    return (
      <main>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <h1>Descriptor Generator</h1>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <FormGroup>
                <ControlLabel>Bits</ControlLabel>
                <FormControl componentClass="textarea" onChange={this.saveBits} rows="20" defaultValue={this.state.bits} placeholder="put your bits here, hit enter between each entry"/>
              </FormGroup>
            </Col>
            <Col xs={6} md={4}>
              <FormGroup>
                <ControlLabel>Pieces</ControlLabel>
                <FormControl componentClass="textarea" onChange={this.savePieces} rows="20" defaultValue={this.state.pieces} placeholder="put your pieces here, hit enter between each entry"/>
              </FormGroup>
            </Col>
            <Col xsHidden md={4}>
              <FormGroup>
                <ControlLabel>Instructions</ControlLabel>
                <ul>
                  <li>Insert text into relevant fields</li>
                  <li>Separate entries by pressing return</li>
                  <li>Generate a descriptor</li>
                </ul>
                <Button bsStyle="primary" onClick={this.generate}>Generate</Button>
              </FormGroup>
              <Well hidden={this.state.bits_and_pieces.length === 0}>{this.state.bits_and_pieces}</Well>
            </Col>
          </Row>
        </Grid>
      </main>
    );
  }
}

export default App;
