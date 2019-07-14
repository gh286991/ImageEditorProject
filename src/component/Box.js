import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Del from '../img/delete.svg';
import '../css/card.sass';


class Box extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.oneOf(['x', 'y', 'width', 'height']).isRequired,
    onDelect: PropTypes.func.isRequired,
  };

  render() {
    const { onDelect, value, index } = this.props;
    const style = {
      position: 'absolute',
      width: `${value.width}px`,
      height: `${value.height}px`,
      left: `${value.x}px`,
      top: `${value.y}px`,
      border: '3px dotted #007FFF',
      pointerEvents: 'none',
    };

    const Delstyle = {
      position: 'absolute',
      width: '25px',
      height: '25px',
      left: `${value.x + value.width + 5}px`,
      top: `${value.y}px`,
      border: '2px #C0C0C0 solid',
      stroke: '#CD5C5C',
      backgroundColor: '#FFFFFF',
    };
    return (
      <div>
        {React.createElement('div', { style })}
        {React.createElement('div', { id: index, onClick: e => onDelect(e) }, <img id={index} style={Delstyle} src={Del} alt="Dle" />)}
      </div>

    );
  }
}

export default Box;
