import { Component } from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import ParticlesBackground from '../components/ParticlesBackground/ParticlesBackground';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  signedIn: false,
  route: 'sign-in',
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  loadUser = (user) => {
    const { id, name, email, entries, joined } = user;
    this.setState({
      user: {
        id,
        name,
        email,
        entries,
        joined
      }
    }, () => console.log('App, loadUser', this.state.user));
  }

  addUser = (user) => {
    this.setState({
      user: user
    }, () => console.log('App, addUser', this.state.user));
  }

  updateEntries = () => {
    fetch('https://heroku-fra.herokuapp.com/image', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
    .then(res => res.json())
    .then(entriesCount => this.setState(Object.assign(this.state.user, { entries: entriesCount})
    , () => console.log("App, updateEntries", this.state.user)))
    .catch(console.log)
  }

  calculateFaceLocation = (obj) => {
    const clarifaiFace = obj.outputs[0].data.regions[0].region_info.bounding_box;
    const { top_row, right_col, bottom_row, left_col } = clarifaiFace;
    const inputImage = document.getElementById('input-image');
    const inputImageWidth = Number(inputImage.width);
    const inputImageHeight = Number(inputImage.height);
    const faceDetectionBoxPosition = {
      topRow: top_row * inputImageHeight,
      rightCol: inputImageWidth - (right_col * inputImageWidth),
      bottomRow: inputImageHeight - (bottom_row * inputImageHeight),
      leftCol: left_col * inputImageWidth
    }
    return faceDetectionBoxPosition;
  }

  updateBox = (faceDetectionBoxPosition) => {
    this.setState({
      box : faceDetectionBoxPosition
    });
  }
 
  onInputChange = (event) => {
    const { value } = event.target;
    this.setState({
      input: value
    });
  }
  
  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    });
    fetch('https://heroku-fra.herokuapp.com/image/clarifaiApiCall', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res) {
        this.updateEntries();
        this.updateBox(this.calculateFaceLocation(res));
      }
    })
    .catch(console.log)
  }
  
  onKeyDownHandler = e => {
    if (e.keyCode === 13) {
      this.onButtonSubmit();
    }
  };

  updateRoute = (route) => {
    if (route === "home") {
      this.setState({
        signedIn: true
      });
    }
    else if (route === "sign-out") {
      this.setState(initialState);
    }
    this.setState({
      route: route
    });
  }

  render() {
    const { route, signedIn, imageUrl, box, user: { name, entries } } = this.state;

    return (
      <div className='App'>
        <Navigation updateRoute={this.updateRoute} signedIn={signedIn} />
        {
            route === 'sign-in'
          ? <SignIn updateRoute={this.updateRoute} loadUser={this.loadUser} />
          : route === 'home'
          ? <>
              <Logo />
              <Rank name={name} entries={entries} />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                onKeyDownHandler={this.onKeyDownHandler}
              />
              <FaceRecognition
                imageUrl={imageUrl}
                faceDetectionBox={box}
              />
            </>
          : route === 'sign-out'
          ? <SignIn updateRoute={this.updateRoute} loadUser={this.loadUser} />
          : <Register updateRoute={this.updateRoute} addUser={this.addUser} />
        }
        <ParticlesBackground />
      </div>
    )
  }
}

export default App;


