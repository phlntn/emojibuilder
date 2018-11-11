import React, { Component } from 'react';
import './List.css';
import './Layers.css';

import Button from './Button.js';
import LayerAdjustment from './LayerAdjustment.js';

let App;

const mainRowClassName = 'primary';

class Layers extends Component {
  state = {
    isDragging: false,
    dragTarget: null,
    dragIndex: null,
  };

  constructor(props) {
    super(props);
    App = this.props.app;
  }

  render() {
    return (
      <div 
        className='List Layers'
        onDragOver={this.onDragOver}
        onDragEnd={this.onDragEnd}
      >
        <ul>
          {App.state.layers.map(this.makeItem)}
        </ul>
      </div>
    );
  }
  
  makeItem = (layer, i) => {
    const className = `
      ${ layer.flipped ? 'flipped' : '' }
      ${ layer === this.state.dragLayer ? 'dragged' : '' }
    `;

    return (
      <li 
        key={i}
        data-index={i}
        className={className}
        draggable={true}
        onDragStart={(e) => this.onDragStart(e, layer)}
      >
        <div className={mainRowClassName}>
          {layer.asset.imgEl}
          <span>{layer.asset.prettyName}</span>
          <Button
            icon='position'
            label='Adjust position'
            onClick={() => App.toggleLayerTransforms(layer)}
          />
          <Button
            icon='flip'
            label='Flip'
            onClick={() => App.flipLayer(layer)}
          />
          <Button
            icon='delete'
            label='Delete'
            onClick={() => App.removeLayer(layer)}
          />
        </div>
        { layer.showTransforms ?
          <div className='adjustments'>
            <LayerAdjustment app={App} layer={layer}
              label='X' prop='translateX' />
            <LayerAdjustment app={App} layer={layer}
              label='Y' prop='translateY' />
            <LayerAdjustment app={App} layer={layer}
              label='Scale' prop='scale' step={0.01} />
            <LayerAdjustment app={App} layer={layer}
              label='Rotation' prop='rotate' />
          </div>
        : '' }
      </li>
    );
  }

  onDragStart = (e, dragLayer) => {
    this.setState({
      isDragging: true,
      dragTarget: e.target,
      dragLayer,
    });
  }

  onDragOver = (e) => {
    if (
      this.state.isDragging 
      && e.target
      && e.target !== this.state.dragTarget
      && e.target.className === mainRowClassName
    ) {
      const target = e.target.parentNode;
      const targetIndex = parseInt(target.getAttribute('data-index'));
      const targetRect = target.getBoundingClientRect();
      const targetCenter = targetRect.top + targetRect.height / 2;

      let layers = [...App.state.layers];
      const dragIndex = layers.indexOf(this.state.dragLayer);

      // Insert before target
      if (e.clientY < targetCenter) {
        layers.splice(targetIndex, 0, layers.splice(dragIndex, 1)[0]);
      }
      // Insert after target
      else {
        layers.splice(targetIndex + 1, 0, layers.splice(dragIndex, 1)[0]);
      }

      App.setState({ layers });
    }
  }

  onDragEnd = (e) => {
    this.setState({
      isDragging: false,
      dragTarget: null,
      dragLayer: null,
    });
  }
}

export default Layers;