import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user= this.state;
    this.props.processForm({user});
  }

  guestLogin(e) {
    e.preventDefault();
    const user = { username: 'guest', password: 'foobar' };
    this.props.processForm({user});
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return(
      <div className="session-form-container">
        <form onSubmit={this.handleSubmit} className="session-form-box">
          <h1 className="session-form-welcome">Welcome to Eventfuls!</h1>
          <br/>
          { this.renderErrors() }
          <h1 className="session-form-type">{this.props.formType}</h1>
          <br/>
          <h1 className="session-form-directions">Enter Your Username and Password</h1>
          <div className="session-form">
            <br/>
            <label>Username:
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="session-input"
              />
            </label>
            <br/>
            <label>Password:
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="session-input"
              />
            </label>
            <br/>
            <input type="submit" value="Submit" />
          </div>
        </form>
        <div>
          <button
            onClick={this.guestLogin}
            className="guest-login-button">Login As Guest</button>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);