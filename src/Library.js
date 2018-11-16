import React, { Component } from 'react';
import './List.css';
import './Library.css';

let App;
let lastCategory;

class Library extends Component {
  constructor(props) {
    super(props);
    App = this.props.app;
  }

  render() {
    return (
      <div 
        className='List Library'
        onDragOver={this.onDrag}
        onDragLeave={this.onDrag}
        onDrop={this.onDrop}
      >
        <ul>
          {App.state.assets.map(this.makeItem)}
        </ul>

        { App.state.isDragging && <div className='dragOverlay'>Drop images here</div> }
      </div>
    );
  }

  makeItem = (asset, i) => {
    let categoryEl;
    if (asset.category !== lastCategory) {
      categoryEl = ( <li className='category'>{asset.prettyCategory}</li> );
      lastCategory = asset.category;
    }
    
    return (<React.Fragment key={i}>
      {categoryEl}
      <li 
        title={asset.prettyName} 
        onClick={() => App.addLayer(asset.name)}
      >
        {asset.imgEl}
      </li>
    </React.Fragment>);
  }
  
  onDrag = (e) => {
    e.preventDefault();

    App.setState({
      isDragging: (e.type === 'dragover')
    });
  }
  
  onDrop = (e) => {
    this.onDrag(e);
    
    Array.from(e.dataTransfer.files)
    .filter(file => /(.png|.jpeg|.jpg|.gif)$/.test(file.name))
    .forEach(file => {
      const reader = new FileReader();
      reader.onloadend = (e) => App.addCustomAsset(file.name, reader.result);
      reader.readAsDataURL(file);
    })
  }
}

export default Library;
