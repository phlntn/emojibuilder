import React, { Component } from 'react';
import './LayerAdjustment.css';

let App;

class LayerAdjustment extends Component {
  constructor(props) {
    super(props);
    App = this.props.app;
  }

  render() {
    return (
      <div 
        className='LayerAdjustment'
      >
        <label>{this.props.label}</label>
        <input 
          value={this.props.layer.transform[this.props.prop]}
          type='number'
          onChange={this.onChange}
          step={this.props.step || 1}
        ></input>
      </div>
    );
  }

  onChange = (e) => {
    let layers = [...App.state.layers];
    const index = layers.indexOf(this.props.layer);
    layers[index].transform[this.props.prop] = e.target.value;

    App.setState({ layers });
  }
}

export default LayerAdjustment;