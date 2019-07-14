import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import '../css/card.sass';


const TextArea = styled.textarea`
  width: 548px;
  box-shadow: 0 1px 1px 1px #dddddd;
  height: 100%;
  height: calc(100vh - 167px);
  padding: 10px;
  margin : 60px;
  margin-top: 0px;
  font-family: monospace;
  color: white;
  background-color: #121b49;
  display: inline-block;
`;

class CoordinateCard extends Component {
  static propTypes = {
    boxData: PropTypes.shape([]).isRequired,
  };


  render() {
    const data = JSON.stringify(this.props.boxData, null, 2);

    return (
      <TextArea value={data} />
    );
  }
}

export default CoordinateCard;
