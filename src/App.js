import React, { Component } from 'react';
import './App.css';
import './Panel.css';

import Loading from './Loading.js';
import Library from './Library.js';
import Layers from './Layers.js';
import Canvas from './Canvas.js';
import Title from './Title.js';
import Button from './Button.js';
import Import from './Import.js';

import config from './config.js';
import assets from './assets.js';
import { toTitleCase } from './utils.js';

class App extends Component {
  state = {
    assets,
    assetsLoaded: 0,
    allAssetsLoaded: false,
    layers: [],
    title: '',
  };

  config = config;

  Library = React.createRef();
  Layers = React.createRef();
  Canvas = React.createRef();
  Title = React.createRef();
  SaveButton = React.createRef();

  render() {
    return (
      <div className='App'>
        { this.state.allAssetsLoaded ? (<>

          <header>
            <span>Emojibuilder v1.2</span>
            <span>Built by <a href='https://twitter.com/phlntn'>@phlntn</a></span>
            <span>Assets © Apple pls don't sue me</span>
          </header>

          <main>

            <div className='Panel'>
              <Library ref={this.Library} app={this} />
              <footer>
                <Import app={this} />
              </footer>
            </div>

            <div className='Panel preview'>
              <Canvas ref={this.Canvas} app={this} />
              <Title ref={this.Title} app={this} />
              <footer>
                <Button label='Save' onClick={this.save} _ref={this.SaveButton} />
              </footer>
            </div>

            <div className='Panel'>
              <Layers ref={this.Layers} app={this} />
              <footer>
                <Button label='Randomize' onClick={this.randomize} />
                <Button label='Clear' onClick={this.clear} />
              </footer>
            </div>

          </main>

        </>) : (
          <Loading app={this} />
        ) }
      </div>
    );
  }

  componentDidMount() {
    const assets = [...this.state.assets];

    return Promise.all(assets.map(asset => {
      return new Promise((resolve, reject) => {

        const url = `${config.assetBasePath}/${asset.name}.png?v4`;

        const options = {
          method: 'GET',
          mode: 'cors',
          cache: 'force-cache'
        };

        fetch(url, options)
        .then((response) => response.blob() )
        .then(blob => {
          asset.src = URL.createObjectURL(blob);

          asset.imgEl = <img
            src={asset.src}
            alt={asset.prettyName}
            className='asset'
            draggable={false}
          />;

          asset.img = document.createElement('img');
          asset.img.onload = (e) => {
            this.setState({ assetsLoaded: this.state.assetsLoaded + 1 });
            resolve();
          };
          asset.img.src = asset.src;

        }).catch(err => {
          console.error(`${url} failed to load`, err);
          reject();
        });

      });
    })).then(() => {
      this.setState({
        assets,
        allAssetsLoaded: true,
      });
      this.randomize();
    });
  }

  findAsset = (name) => {
    return this.state.assets.find(asset => asset.name === name);
  }

  addCustomAsset = (name, src) => {
    name = name.substr(0, name.lastIndexOf('.')).replace(/_|-/g, ' ');
    const prettyName = toTitleCase(name);

    const imgEl = <img
      src={src}
      alt={prettyName}
      className='asset'
      draggable={false}
    />;

    const img = document.createElement('img');

    const asset = {
      name,
      prettyName,
      category: 'custom',
      prettyCategory: 'Custom',
      src,
      imgEl,
      img,
    };

    img.onload = (e) => { 
      const assets = [...this.state.assets];
      assets.unshift(asset);

      this.setState({ assets }, () => {
        this.addLayer(asset.name);
      });
    }

    img.src = src;
  }

  randomize = () => {
    function pick(category) {
      const picks = assets.filter(asset => asset.category === category);
      return picks[Math.floor(Math.random() * picks.length)].name;
    }

    this.clear().then(() => {
      this.addLayer(pick('mouth'));
    
      const eye = pick('eye')
      this.addLayer(eye);
    
      if (Math.random() > 0.5) this.addLayer(eye);
      else this.addLayer(pick('eye'));
    
      if (Math.random() > 0.5) this.addLayer(pick('acc'), Math.random() > 0.5);
    });
  }

  clear = (callback) => {
    const base = this.findBaseLayer();
    const baseAssetName = base ? base.asset.name : 'face_base';

    return new Promise((resolve, reject) => {
      this.setState(
        { layers: [] }, 
        () => { 
          if (baseAssetName) this.addLayer(baseAssetName);
          resolve();
        }
      );
    })
  }

  save = () => {
    const canvas = this.Canvas.current.mainCanvas.current;
    const title = this.Title.current.getTitle();
    const button = this.SaveButton.current;

    button.href = canvas.toDataURL();
    button.download = title.replace(/ /g, '_') + '.png';

    if (window.gtag) {
      window.gtag('event', 'download', { 
        event_category: 'emojibuilder', 
        event_label: title,
      });
    }
  }

  addLayer = (assetName, flipped) => {
    let layers = [...this.state.layers];

    const layer = {
      asset: this.findAsset(assetName),
      flipped,
      transform: {
        translateX: 0,
        translateY: 0,
        scale: 1,
        rotate: 0,
      },
      showTransforms: false,
    };
  
    // Flip any second 'eye' layers or duplicates
    if (flipped === undefined) {
      const eyes = layers.filter(layer => layer.asset.category === 'eye');
      const dups = layers.filter(layer => layer.asset.name === assetName);
  
      layer.flipped = (
        (eyes.length === 1 && !eyes[0].flipped) || 
        (dups.length === 1 && !dups[0].flipped)
      );
    }
  
    // Only allow one 'base' layer
    if (layer.asset.base) {
      layers = layers.filter(layer => !layer.asset.base);
    }
  
    // Add layer at a specific position
    if (layer.asset.position !== undefined && layers.length > 0) {
      const insertIndex = Math.min(layer.asset.position, layers.length - 1);
      layers.splice(insertIndex, 0, layer);
    }
    // Or just at the end
    else {
      layers.push(layer);
    }
  
    this.setState({ layers });
  }
  
  removeLayer = (layer) => {
    let layers = [...this.state.layers];
    const index = layers.indexOf(layer);
    layers.splice(index, 1);
  
    this.setState({ layers });
  }
  
  flipLayer = (layer) => {
    let layers = [...this.state.layers];
    const index = layers.indexOf(layer);
    layers[index].flipped = !layers[index].flipped;

    this.setState({ layers });
  }
  
  toggleLayerTransforms = (layer) => {
    let layers = [...this.state.layers];
    const index = layers.indexOf(layer);
    layers[index].showTransforms = !layers[index].showTransforms;

    this.setState({ layers });
  }

  findBaseLayer = () => {
    return this.state.layers.find(layer => layer.asset.base);
  }
}

export default App;
