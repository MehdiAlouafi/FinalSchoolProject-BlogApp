import React from 'react';
import ajax  from 'superagent';
import { withRouter } from 'react-router';

class Login extends React.Component {
  static contextTypes = {
    router: function(){ return React.PropTypes.func.isRequired;}
  }
  constructor() {
    super();
    this.state = {
      success: false,
      message: ""
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    ajax
      .post("http://localhost:3000/login")
      .send({email: email, password: password})
      .end((err,res)=>{
        if(!err && res) {
          if(res.body.success === true) {
            window.localStorage.token = res.body.jwtToken;
            this.setState({success: res.body.success});

          } else {
            delete window.localStorage.token;
            this.setState({message: res.body.message});

          }
        }
      });

  }
  render() {
    let flashMessage;
    flashMessage = this.state.message;
    if (this.state.success === true) {
      this.context.router.push('admin');
    }
    return (
      <div>
        <p>{flashMessage}</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="email" name="email" ref="email" />
          <input type="password" ref="password" />
          <input type="submit" onSubmit={this.test} name="Submit" />
        </form>
      </div>
    )
  }
}



export default Login;
