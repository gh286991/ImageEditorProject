import React, { Component } from 'react';
import RectangleSelection from 'react-rectangle-selection';
import styled from 'styled-components';
import CoordinateCard from './CoordinateCard';
import Box from './Box';
import { ReactComponent as Imgs } from '../img/image.svg';

import '../css/card.sass';


const UploadBox = styled.div`
  text-align : center;
  width: 90%;
  margin: auto
  border-radius: 10px
  border: 3px solid #A9A9A9;
  padding: 10px;
  font-family: monospace;
  color: white;
  background-color: #F5F5F5;
`;


class PicCard extends Component {
  constructor() {
    super();
    this.state = {
      origin: [],
      target: [],
      boxData: [],
      isSelect: false,
      isImage: false,
      preview: '',
    };
  }


  onMouseUp =() => {
    const { boxData, origin, target, isSelect } = this.state;

    if (!isSelect) {
      return;
    }

    let x = origin[0];
    let y = origin[1];
    let width = target[0] - origin[0];
    let height = target[1] - origin[1];

    if (width < 0 && height < 0) {
      x = target[0];
      y = target[1];
      width = Math.abs(width);
      height = Math.abs(height);
    } else if (width < 0) {
      x = target[0];
      width = Math.abs(width);
    } else if (height < 0) {
      y = target[1];
      height = Math.abs(height);
    }


    const data = {
      x,
      y,
      width,
      height,
    };

    this.setState({
      boxData: [...boxData, data],
      isSelect: false,

    });
  }

  onDelect =(e) => {
    const { boxData } = this.state;
    const index = e.target.id;
    if (!index) {
      return;
    }


    boxData.splice(index, 1);

    this.setState({
      boxData: [...boxData],
    });
  }


changePath = (e) => {
  const files = e.target.files;
  if (!files) {
    return;
  }
  const preview = [];
  Array.from(files).forEach((file) => {
    let src; const type = file.type;

    if (/^image\/\S+$/.test(type)) {
      src = URL.createObjectURL(file);
      preview.push(<div className="preview" >  <br /> <img src={src} alt="" /> </div>);
    }

    this.setState({ path: file.name, data: files, preview, isImage: true });
  });
}

render() {
  const boxs = [];
  let box;

  const { boxData, preview, isImage } = this.state;

  boxData.forEach((value, index) => {
    box = <Box value={value} index={index} onDelect={this.onDelect} />;
    boxs.push(box);
  });

  const imgStyle = {
    width: '30%',
    height: '30%',
    marginTop: '25px',
    marginBottom: '-10px',
    fill: '#C0C0C0',
  };

  const imgText = {
    marginBottom: '25px',
    color: '#C0C0C0',
  };

  return (
    <div>
      <div className="picCard" onMouseUp={this.onMouseUp}>
        <div className="top" >
          <div className="circle" />
        </div>
        <div className="picWindow">
          {isImage ? null : <UploadBox>
            {<label className="upload_cover" htmlFor="picInput" >
              <input className="upload_input" id="picInput" type="file" accept="image/* " onChange={this.changePath} />
              <Imgs className="upload-img" alt="logo" style={imgStyle} />
              <div style={imgText} >Upload image</div>
            </label>}
          </UploadBox> }


          <RectangleSelection
            onSelect={(e, coords) => {
              this.setState({
                origin: coords.origin,
                target: coords.target,
                isSelect: true,
              });
            }}

            style={{
              backgroundColor: '',
              borderColor: '#007FFF',
            }}
          >
            <div className="App" />

            {boxs}
            {preview}
          </RectangleSelection>

        </div>

        <h1>{this.state.text}</h1>
      </div>

      <CoordinateCard boxData={this.state.boxData} />
    </div>
  );
}
}

export default PicCard;
