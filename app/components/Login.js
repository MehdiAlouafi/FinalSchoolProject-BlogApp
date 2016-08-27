import React from 'react';
import ajax  from 'superagent';

export default class Login extends React.Component {
  render() {
    return (
      <form action="/login" method="POST">
        <input type="email" name="email" />
        <input type="password" name="password" />
        <input type="submit" name="Submit" />
      </form>
    )
  }
}
