import React from "react";
import "../css/login.css";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleUserNameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.username}
              onChange={(e) => this.handleUserNameChange(e)}
            />
          </label>

          <label>
            Password:
            <input
              type="text"
              value={this.state.password}
              onChange={(e) => this.handlePasswordChange(e)}
            />
          </label>
          <input type="submit" value="Submit" disabled={!this.validateForm()} />
        </form>
      </div>
    );
  }
}
