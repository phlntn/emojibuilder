import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    return (
      // eslint-disable-next-line
      <a 
        className='Button'
        onClick={this.props.onClick}
        ref={this.props._ref}
        title={this.props.label}
      >
        {
          this.props.icon
          ? <img 
              src={`icons/${this.props.icon}.svg`}
              alt={this.props.label}
            />
          : this.props.label
        }
      </a>
    );
  }
}

export default Button;