import React, { Component } from 'react';
import Select from 'react-select';
import logo from '../logo.svg';

var tus = require("tus-js-client");

class AppContent extends Component {

  constructor() {
    super();
    this.state = {
        file: '',
        selectedStyle: { value: 'model=pilars&img=pilars.jpg', label: 'pilars' },        
    };
  }
  styles = [
    // pilars
    { value: 'model=pilars&img=pilars.jpg', label: 'pilars' },
    // it
    { value: 'model=it&img=curcuit.jpg', label: 'curcuit' },
    { value: 'model=it&img=matrix.jpg', label: 'matrix' },
    { value: 'model=it&img=mind.jpg', label: 'mind' },
    // khokhloma
    { value: 'model=khokhloma&img=khokhloma.jpg', label: 'khokhloma' },
    // potato
    { value: 'model=potato&img=potato.jpg', label: 'potato' },
    // art
    { value: 'model=art&img=candy.jpg', label: 'candy' }, 
    { value: 'model=art&img=Robert_Delaunay,_1906,_Portrait.jpg', label: 'Robert_Delaunay,_1906,_Portrait' },
    { value: 'model=art&img=composition_vii.jpg', label: 'composition_vii'},
    { value: 'model=art&img=seated-nude.jpg', label: 'seated-nude'},
    { value: 'model=art&img=escher_sphere.jpg', label: 'escher_sphere'},
    { value: 'model=art&img=shipwreck.jpg', label: 'shipwreck'},
    { value: 'model=art&img=feathers.jpg', label: 'feathers'},
    { value: 'model=art&img=starry_night.jpg', label: 'starry_night'},
    { value: 'model=art&img=frida_kahlo.jpg', label: 'frida_kahlo'},
    { value: 'model=art&img=stars2.jpg', label: 'stars2'},
    { value: 'model=art&img=la_muse.jpg', label: 'la_muse'},
    { value: 'model=art&img=strip.jpg', label: 'strip'},
    { value: 'model=art&img=mosaic_ducks_massimo.jpg', label: 'mosaic_ducks_massimo'},
    { value: 'model=art&img=the_scream.jpg', label: 'the_scream'},
    { value: 'model=art&img=mosaic.jpg', label: 'mosaic'},
    { value: 'model=art&img=udnie.jpg', label: 'udnie'},
    { value: 'model=art&img=pencil.jpg', label: 'pencil'},
    { value: 'model=art&img=wave.jpg', label: 'wave'},
    { value: 'model=art&img=picasso_selfport1907.jpg', label: 'picasso_selfport1907'},
    { value: 'model=art&img=woman-with-hat-matisse.jpg', label: 'woman-with-hat-matisse'},
    { value: 'model=art&img=rain_princess.jpg', label: 'rain_princess'}
  ]

  handleStyleChange = (value) => {
    this.state.selectedStyle = value;
  }

  handleChangeFile = (e) => {
    this.file = e.target.files[0];
    document.querySelector(".images > img.preview").src = window.URL.createObjectURL(this.file);
  }

  handleUploadFile = () => {
    const file = this.file;
    console.log(file);
    const style = this.state.selectedStyle;
    var upload = new tus.Upload(file, {
        endpoint: "http://localhost:1080/",
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
              = upload.url + "?w=" + img.width + "&h=" + img.height + "&" + style.value;
        }
    })

    upload.start()

  }

  handleSelectStyle = selectedOption => {
    this.setState({ selectedOption });
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="app-content">
        <div className="image-select">
          <input type="file" id="fileName" accept="image/jpeg" onChange={this.handleChangeFile} />
          <div className="style-select">
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={this.styles[0]}
              name="style"
              options={this.styles}
              onChange={this.handleStyleChange}
              value={selectedOption}
            />
          </div>
          <button id="oploadFile" onClick={this.handleUploadFile}>Upload</button>
        </div>
        <div className="images">
          <img className="preview" src={logo} />
          <img className="ready" src={logo} />
        </div>
      </div>
    );
  }
}

export default AppContent;
