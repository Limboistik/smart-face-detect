import React, { Component } from 'react';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
      box: {},
      route: 'signIn',
      isSignedIn: '',
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: '',
        joined: ''
      }
    } 
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onImageSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    });
    fetch('http://localhost:8888/image', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id,
        entries: this.state.user.entries++
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.entries++;
      }
    })
    .catch(err => console.log(err));
    console.log('User entries', this.state.user.entries);
    console.log('State entries', this.state.user.entries);
    // predict the contents of an image by passing in a url
    app.models
      .predict(
          Clarifai.FACE_DETECT_MODEL, 
          this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({
        isSignedIn: false
      })
    } else if (route === 'home') {
      this.setState({
        isSignedIn: true
      })
    }
    this.setState({
      route: route
    });
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit} />     
              <FaceRecognition imageUrl={imageUrl} box={box} />
            </div>
          : (
              route === 'signin'
              ?  <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              :  <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )
        }
      </div>
    );
  }
}

export default App;
