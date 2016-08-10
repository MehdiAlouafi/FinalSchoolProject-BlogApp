import React from 'react';

export default class HeroHeader extends React.Component {
  render() {
      return (
        <div className="hero-header">

          <div className="hero-header__kicker clearfix">

              <div className="hero-header__avatar"></div>
              <div className="hero-header__feed">
                <p>My first feed</p>
              </div>

          </div>

        </div>
      );
    }
}
