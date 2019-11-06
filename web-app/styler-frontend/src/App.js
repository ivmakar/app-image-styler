import React, { Component } from 'react';
import './App.css';
import AppHeader from './Components/App-header'
import AppContent from './Components/App-content'

export default function App() {
  return (
    <div className="app">
      <AppHeader />
      <AppContent />
    </div>
  );
}
