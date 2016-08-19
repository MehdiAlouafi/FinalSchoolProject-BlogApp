import React from 'react';
import ajax from 'superagent';
import Remarkable from 'remarkable';

export default class ArticleDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      article: []
    }

  }
  fetchArticle() {
    ajax.get(`${window.location.origin}/api/articles/${this.props.params.id}`)
        .end((err, res) => {
          if(!err && res) {
            this.setState({article: res.body})
          } else {
            console.log("big fail bruh");
          }
        })
  }
  componentDidMount() {
    this.fetchArticle();
  }
  renderArticle(article) {
    console.log(article);
      return (
          <div>
            <h1>{article.title}</h1>
            {
              article.content.map((text, i) => {
                if(text.tag === "h2") {

                  return (<h2 key={text._id}>{text.body}</h2>);

                } else {

                  return (<p key={text._id}>{text.body}</p>);

                }
              })
            }
          </div>


      );
    }
  render() {
    let content;
    if(typeof(this.state.article.title) === "undefined") {
      content = "Loading";
    } else {
      content = this.renderArticle(this.state.article);
    }
    return (
      <div>

        {content}

      </div>
    );
  }
}
