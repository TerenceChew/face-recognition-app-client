import { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  updateName = (event) => {
    this.setState({
      name: event.target.value
    });
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

  handleRegister = () => {
    fetch('https://heroku-fra.herokuapp.com/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(user => {
      if (user.id) {
        this.props.addUser(user);
        this.props.updateRoute('home');
      }
    })
    .catch(console.log)
  }

  onKeyDownHandler = (e) => {
    if(e.keyCode === 13) {
      this.handleRegister();
    }
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-3">
        <main className="pa4 black-80">
          <div className="measure tc">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 center">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="name"  
                  id="name"
                  value={name}
                  onChange={this.updateName}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email"  
                  id="email"
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
              <input 
                className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="submit" 
                value="Register"
                onClick={this.handleRegister}
              />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Register;