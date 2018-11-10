import React, { Component } from 'react';
import './Loading.css';

let App;

class Loading extends Component {
  constructor(props) {
    super(props);
    App = this.props.app;
  }

  render() {
    return (
      <div className="Loading">
        <p>Loading…</p>
        <progress 
          max={App.state.assets.length}
          value={App.state.assetsLoaded}
        />
      </div>
    );
  }
}

export default Loading;
