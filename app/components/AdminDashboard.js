import React from 'react';
import { Link } from 'react-router';

import ajax  from 'superagent';

import ArticlePanel from './ArticlePanel';
export default class AdminDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: []
    }
  }
  loader() {
    return (<div className="loader"></div>)
  }

  loadsArticles(baseUrl) {
    ajax.get(`${baseUrl}/api/articles`)
        .set('Authorization', window.localStorage.token)
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

  deleteArticle(id) {

    var choice = confirm("sure ?");

    if(choice === true) {
      ajax
        .del(`${window.location.origin}/api/articles/${id}`)
        .set('Authorization', window.localStorage.token)
        .end(( err , res ) => {
          if(!err && res ) {

            this.setState({active: "deleted"});

          }
        })
    }

  }

  renderArticles() {
    return this.state.articles.map((element, i) => {
      return (
        <ArticlePanel
          key={i}
          id={element._id}
          class="dashboard"
          title={element.title}
          deleteArticle={this.deleteArticle}
        />
      );
    })
  }
  render() {
    let content;
    if (this.state.articles.length > 0) {
      content = this.renderArticles();
    } else {
      content = this.loader();
    }

    return (
      <div className="wrapper">
        <Link to="/admin/add"> New Post </Link>
        {content}
      </div>
    );
  }
}
