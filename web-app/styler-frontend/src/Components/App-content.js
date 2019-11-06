import clsx from 'clsx';
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../logo.svg';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';

var tus = require("tus-js-client");

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function AppContent() {

  const file = '';
  const selectedStyle = '1';
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleStyleChange = (e) => {
    this.state.selectedStyle = e.target.value;
  }

  const handleChangeFile = (e) => {
    this.file = e.target.files[0];
    document.querySelector(".images > img.preview").src = window.URL.createObjectURL(this.file);
  }

  const handleUploadFile = () => {
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
    setLoading(true);
    setSuccess(false);
    upload.start()

  }
  
  return (
    <div className="app-content">
      <div className="image-select">
        <input type="file" id="fileName" accept="image/jpeg" onChange={handleChangeFile} />
        <div className="style-select" onChange={handleStyleChange.bind(this)}>
          <input type="radio" value="1" name="style"/> Столпы Творения
          <input type="radio" value="2" name="style"/> Огонь
          <input type="radio" value="3" name="style"/> Хохлома
          <input type="radio" value="4" name="style"/> Небо
        </div>
        {/* <button id="oploadFile" onClick={this.props.handleUploadFile}>Upload</button> */}
        {/* <CircularProgress /> */}
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={loading}
            onClick={handleUploadFile}
          >
            Upload
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </div>
      <div className="images">
        <img className="preview" src={logo} />
        <img className="ready" src={logo} />
      </div>
    </div>
  );
}
