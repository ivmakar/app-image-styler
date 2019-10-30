import React, { Component } from 'react';

class AppImageSelect extends Component {
  render() {
    return (
      <div className="image-select">
        <input type="file" id="fileName" accept="image/jpeg" onChange={this.props.handleChangeFile} />
        <button id="oploadFile" onClick={this.props.handleUploadFile}>Upload</button>
      </div>
    );
  }
}

export default AppImageSelect;
