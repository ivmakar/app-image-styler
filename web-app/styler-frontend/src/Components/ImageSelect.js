import React, { Component } from 'react';

class AppImageSelect extends Component {
  render() {
    return (
      <div className="image-select">
        <input type="file" id="fileName" accept="image/jpeg" onChange={this.props.handleChangeFile} />
        <div className="style-select" onChange={this.props.handleStyleChange.bind(this)}>
          <input type="radio" value="1" name="style"/> Столпы Творения
          <input type="radio" value="2" name="style"/> Огонь
          <input type="radio" value="3" name="style"/> Хохлома
          <input type="radio" value="4" name="style"/> Небо
        </div>
        <button id="oploadFile" onClick={this.props.handleUploadFile}>Upload</button>
      </div>
    );
  }
}

export default AppImageSelect;
