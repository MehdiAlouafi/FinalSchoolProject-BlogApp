import React from 'react';
import Articles from './Articles';

import ajax  from 'superagent';

export default class HeroHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      feed: []
    }
  }
  fetchFeed() {
    ajax
      .get(`${window.location.origin}/api/feed`)
      .end((err,res) => {
        if(!err && res) {
          var feed = res.body;
          feed = feed.reverse();
          this.setState({feed: feed})
        }
      })
  }
  componentDidMount() {
    this.fetchFeed()
  }
  render() {
      return (
        <div>


            <div className="hero-header">

            <div className="hero-header__kicker clearfix">

            <div className="hero-header__avatar"></div>
            <div className="hero-header__feed">
            <p>{
              this.state.feed.length > 0 ? (this.state.feed[0].body) : ("Loading")
            }</p>
            </div>

            </div>

            </div>
            <Articles />
        </div>
      );
    }
}
