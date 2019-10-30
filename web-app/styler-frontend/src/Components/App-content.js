import React, { Component } from 'react';
import AppImageSelect from './ImageSelect'
import logo from '../logo.svg';

var tus = require("tus-js-client");

class AppContent extends Component {

  constructor() {
    super();
    this.state = {
        file: '',
    };
  }

  handleChangeFile = (e) => {

    //console.log(e.target.files[0].type);
    // if (e.target.files[0].type !== "image/jpeg") {
    //   console.log(e.target.files[0].type);
    //   return;
    // }    
    this.file = e.target.files[0];
    document.querySelector(".preview > img").src = window.URL.createObjectURL(this.file);
  }

  handleUploadFile = (e) => {
    var file = this.file;

    // Create a new tus upload
    var upload = new tus.Upload(file, {
        endpoint: "http://localhost:1080/files/",
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
        }
    })

    // Start the upload
    upload.start()

  }

  render() {
    return (
      <div className="app-content">
        <AppImageSelect 
          handleChangeFile={this.handleChangeFile}
          handleUploadFile={this.handleUploadFile}
        />
        <div className="preview">
          <img src={logo} />
        </div>
      </div>
    );
  }
}

export default AppContent;
