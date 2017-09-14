import React, { Component } from 'react'
import Hero from './Hero'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" aria-hidden="true">
          <h2>Mocha Drip</h2>
          <h3>The Story of Starbuck and the Coffee Spirit</h3>
          <p>Starbuck was the first mate </p>
        </header>
        <Hero />
      </div>
    )
  }
}

export default App
