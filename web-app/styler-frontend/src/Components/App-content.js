import React, { Component } from 'react';
import AppImageSelect from './ImageSelect'
import logo from '../logo.svg';

var tus = require("tus-js-client");

class AppContent extends Component {

  constructor() {
    super();
    this.state = {
        file: '',
        selectedStyle: '1',
    };
  }

  handleStyleChange = (e) => {
    this.state.selectedStyle = e.target.value;
  }

  handleChangeFile = (e) => {
    this.file = e.target.files[0];
    document.querySelector(".images > img.preview").src = window.URL.createObjectURL(this.file);
  }

  handleUploadFile = () => {
    const file = this.file;
    const style = this.state.selectedStyle;
    var upload = new tus.Upload(file, {
        endpoint: "http://127.0.0.1:1080/",
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
            filename: file.name,
            filetype: file.type
        },
        onError: function(error) {
            console.log("Failed because: " + error)
        },
        onProgress: function(bytesUploaded, bytesTotal) {
            var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
            console.log(bytesUploaded, bytesTotal, percentage + "%")
        },
        onSuccess: function() {
            console.log("Download %s from %s", upload.file.name, upload.url)
            const img = document.querySelector(".images > img.preview");
            document.querySelector(".images > img.ready").src
              = upload.url + "?w=" + img.width + "&h=" + img.height + "&style=" + style;
        }
    })

    upload.start()

  }

  render() {
    return (
      <div className="app-content">
        <AppImageSelect 
          handleChangeFile={this.handleChangeFile}
          handleUploadFile={this.handleUploadFile}
          handleStyleChange={this.handleStyleChange}
        />
        <div className="images">
          <img className="preview" src={logo} />
          <img className="ready" src={logo} />
        </div>
      </div>
    );
  }
}

export default AppContent;
