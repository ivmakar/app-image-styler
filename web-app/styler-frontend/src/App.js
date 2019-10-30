import React, { Component } from 'react';
import './App.css';
import AppHeader from './Components/App-header'
import AppContent from './Components/App-content'

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader />
        <AppContent />
      </div>
    );
  }
}

export default App;
