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
      message: ""
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    ajax
      .post(`${window.location.origin}/login`)
      .send({email: email, password: password})
      .end((err,res)=>{
        if(!err && res) {
          if(res.body.success === true) {
            window.localStorage.token = res.body.jwtToken;
            this.setState({success: true});

          } else {
            delete window.localStorage.token;
            this.setState({success: false})
            this.setState({message: res.body.message});

          }
        }
      });

  }
  render() {
    let flashMessage;
    // if (this.state.success === true) {
    //   this.context.router.push('admin');
    // }
    if (this.state.success) {
      this.context.router.push('admin');
    } else if(this.state.success === false) {
      flashMessage = (<div className="authorization-error">{this.state.message}</div>);
    }
    return (
      <div className="wrapper">
        {flashMessage}

        <form className="login" onSubmit={this.handleSubmit.bind(this)}>
          <input className="login__input" type="email" ref="email" placeholder="email@exemple.com"/>
          <input className="login__input" type="password" ref="password" placeholder="password"/>
          <input className="login__submit" type="submit" onSubmit={this.test} name="Submit" />
        </form>
      </div>
    )
  }
}



export default Login;
