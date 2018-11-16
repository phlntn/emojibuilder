import React, { Component } from 'react';
import './Canvas.css';

let App;

class Canvas extends Component {
  mainCanvas = React.createRef();
  smallCanvas = React.createRef();

  constructor(props) {
    super(props);
    App = this.props.app;
  }

  render() {
    return (
      <div className='Canvas'>
        <canvas className='main' ref={this.mainCanvas}></canvas>
        <canvas className='small' ref={this.smallCanvas}></canvas>
      </div>
    );
  }

  componentDidMount(nextProps, nextState) {
    [this.mainCanvas, this.smallCanvas].forEach(canvas => {
      canvas.current.width = App.config.compSize;
      canvas.current.height = App.config.compSize;
    })

    this.ctx = this.mainCanvas.current.getContext('2d');
    this.smallCanvas.current.getContext('2d').globalCompositeOperation = 'copy';

    this.draw();
  }

  componentDidUpdate(nextProps, nextState) {
    this.draw();
  }

  draw = () => {
    const base = App.findBaseLayer();
  
    this.ctx.clearRect(0, 0, App.config.compSize, App.config.compSize);
  
    App.state.layers.forEach(layer => {
      if (!layer.asset.base && base) {
        if (base.asset.translate) {
          this.ctx.translate(
            App.config.compSize * base.asset.translate[0], 
            App.config.compSize * base.asset.translate[1]
          );
        }
        if (base.asset.scale) {
          this.ctx.scale(base.asset.scale, base.asset.scale);
        }
      }
  
      this.ctx.translate(App.config.compSize/2, App.config.compSize/2);
      this.ctx.scale(parseFloat(layer.transform.scale), parseFloat(layer.transform.scale));
      this.ctx.rotate(parseFloat(layer.transform.rotate) * Math.PI / 180);
      this.ctx.translate(-App.config.compSize/2, -App.config.compSize/2);
      this.ctx.translate(parseFloat(layer.transform.translateX), parseFloat(layer.transform.translateY));
  
      if (layer.flipped) {
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(layer.asset.img, -App.config.compSize, 0);
      } else {
        this.ctx.drawImage(layer.asset.img, 0, 0);
      }
  
      this.ctx.resetTransform();
    });

    this.smallCanvas.current.getContext('2d').drawImage(this.mainCanvas.current, 0, 0);
  }
}

export default Canvas;