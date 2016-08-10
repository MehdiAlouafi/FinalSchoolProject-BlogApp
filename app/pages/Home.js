import React from 'react';
import ajax  from 'superagent';

import Articles from '../components/Articles';
import Header from '../components/Header';

export default class Layout extends React.Component {
  constructor(){
    super();
    this.state = {
      articles: []
    }
  }
  loadsArticles(baseUrl) {
    ajax.get(`${baseUrl}/articles`)
        .end((err, res) => {
          if(!err && res) {
            this.setState({articles: res.body});
          } else {
            console.log("There was an error fetching data " + err);
          }
        });
  }
  componentDidMount() {

    this.loadsArticles(window.location.origin);

  }
  loader() {
    return (<div className="loader"></div>)
  }
  render() {
    let content;

    if(this.state.articles.length > 0) {
      content = <Articles data={this.state.articles} />;
    } else {
      content = this.loader();
    }
    return (
      <div>
        <Header />
        {this.props.children}
        <div className="articles__container">{content}</div>
      </div>
    );
  }
}
