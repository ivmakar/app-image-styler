import React, { Component } from 'react';
import logo from '../logo.svg';

export default function AppHeader() {
  return (
    <div className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
  );
}
