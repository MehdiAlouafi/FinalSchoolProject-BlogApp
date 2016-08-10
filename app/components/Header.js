import React from 'react';
// mettre les styles du wrapper ici pour éviter des pb de DOM REACT
export default class Header extends React.Component {
  render() {
    return (
    <div className="wrapper">
      <header className="main_header clearfix">
          <div className="logo">
              <h1>MehdiA</h1>
          </div>
          <nav className="nav">
              <a href="#">Home</a>
              <a href="#">Articles</a>
              <a href="#">Contact</a>
              <a href="#">Login</a>
          </nav>
      </header>
    </div>
    );
  }
}
