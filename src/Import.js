import React, { Component } from 'react';

import Button from './Button.js';

let App;

class Import extends Component {
  fileInput = React.createRef();

  constructor(props) {
    super(props);
    App = this.props.app;
  }

  render() {
    return <>
      <input 
        type='file' 
        style={{ display: 'none' }}
        ref={this.fileInput}
        onChange={this.onFileChange}
      />
      <Button 
        label='Import'
        onClick={this.onButtonClick}
      />
    </>
  }

  onButtonClick = (e) => {
    this.fileInput.current.click();
  }

  onFileChange = (e) => {
    if (this.fileInput.current.files.length) {
      const file = this.fileInput.current.files[0];

      const reader = new FileReader();
      reader.onloadend = (e) => App.addCustomAsset(file.name, reader.result);
      reader.readAsDataURL(file);
    }
  }
}

export default Import;