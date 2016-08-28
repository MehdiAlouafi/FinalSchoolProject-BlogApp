import React from 'react';
import { Link } from 'react-router';

import ajax  from 'superagent';

import Feed  from './Feed';

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
  publishArticle(obj) {
    var id = obj.id;
    var currentState = obj.published;
    ajax
      .put(`${window.location.origin}/api/articles/${id}`)
      .set('Authorization', window.localStorage.token)
      .send({published: !obj.published})
      .end(( err , res ) => {
        if(!err && res ) {

          this.setState({published: !obj.published});

        }
      })
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
          publishArticle={this.publishArticle}
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
        <Feed />
        <Link to="/admin/add"> <button className="add-article">Ajoutez un article <i className="fa fa-plus" ariaHidden="true"></i></button> </Link>
        {content}
      </div>
    );
  }
}
