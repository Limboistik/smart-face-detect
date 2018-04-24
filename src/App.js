import React, { Component } from 'react';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import tachyons from 'tachyons';
import Particles from 'react-particles-js';

// const particlesOptions = {
//   particles: {
//     number: {
//       value: 10,
//       density: {
//         enable: true,
//         value_area: 500
//       }
//     }
//   }
// }
// instantiate a new Clarifai app passing in your api key.
const app = new Clarifai.App({
  apiKey: 'c3e859710813481f957fc5e636910cfd'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    } 
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    });
    // predict the contents of an image by passing in a url
    app.models
      .predict(
          Clarifai.FACE_DETECT_MODEL, 
          this.state.input)
      .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        console.error(err);
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>     
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
