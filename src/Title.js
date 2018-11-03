import React, { Component } from 'react';
import './Title.css';

let App;

class Title extends Component {
  currentTitle = '';

  constructor(props) {
    super(props);
    App = this.props.app;
  }

  render() {
    return (
      <div className='Title'>
        {this.getTitle()}
      </div>
    );
  }

  getTitle = () => {
    const base = App.findBaseLayer();

    const adjectives = App.state.layers.reduce((acc, layer) => {
      if (layer.asset.adjective && acc.indexOf(layer.asset.adjective) < 0)
        acc.push(layer.asset.adjective);
      return acc;
    }, []);

    const modifiers = App.state.layers.reduce((acc, layer) => {
      if (layer.asset.modifier && acc.indexOf(layer.asset.modifier) < 0) {
        acc.push(layer.asset.modifier);
      } else if (layer.asset.modifier && acc.indexOf(layer.asset.modifier) >= 0) {
        acc[acc.indexOf(layer.asset.modifier)] += 's';
      }
      return acc;
    }, []);

    const titleComponents = [
      adjectives.join(' '),
      base ? base.asset.base : null,
      modifiers.length ? 'with' : null,
      modifiers.join(' and ')
    ];

    const title = titleComponents.filter(c => c).join(' ').trim();
    return title;
  }
}

export default Title;