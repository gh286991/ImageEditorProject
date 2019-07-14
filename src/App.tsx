import React from 'react'
import './App.css';
import PicBox from './component/PicCard'


const App: React.FC = () => {
  return (
    <div className="App">
      <div style={ {textAlign: "center" , marginTop: "90px" }}>
        <PicBox></ PicBox>
      </div>
    </div>
  );
}

export default App;
