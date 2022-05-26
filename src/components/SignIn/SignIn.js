import { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  updateEmail = (event) => {
    this.setState({
      email: event.target.value
    });
  }

  updatePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  }
  
  handleSignIn = () => {
    fetch('https://fra-server.herokuapp.com/signin', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(user => {
      if (user.id) {  //  does the user exist? did we receive a user with a property of id?
        this.props.loadUser(user);
        this.props.updateRoute('home');
      }
    })
    .catch(console.log)
  }

  onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      this.handleSignIn();
    }
  }

  render() {
    const { updateRoute } = this.props;
    const { email, password } = this.state;
    return (
      <div className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-3">
        <main className="pa4 black-80">
          <div className="measure tc">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address" 
                  value={email} 
                  onChange={this.updateEmail}  
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password" 
                  value={password} 
                  onChange={this.updatePassword}
                  onKeyDown={this.onKeyDownHandler}
                />
              </div>
            </fieldset>
            <div className="">
              <input className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="submit" value="Sign in" onClick={this.handleSignIn} />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => updateRoute('register')} href="#0" className="f6 pointer b dim black db">Register</p>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default SignIn;