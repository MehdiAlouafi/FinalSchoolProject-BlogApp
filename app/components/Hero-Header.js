import React from 'react';
import Articles from './Articles';


export default class HeroHeader extends React.Component {
  render() {
      return (
        <div>


            <div className="hero-header">

            <div className="hero-header__kicker clearfix">

            <div className="hero-header__avatar"></div>
            <div className="hero-header__feed">
            <p>My first feed</p>
            </div>

            </div>

            </div>
            <Articles />
        </div>
      );
    }
}
