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
      <div className='List Library'>
        <ul>
          {App.state.assets.map(this.makeItem)}
        </ul>
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
        <img
          className='asset'
          alt={asset.name}
          src={asset.src}
          crossOrigin={'Anonymous'}
          draggable={false}
        />
      </li>
    </React.Fragment>);
  }
}

export default Library;
