import React from 'react';
import ajax from 'superagent';
import { Link } from 'react-router';

export default class Articles extends React.Component {
  constructor(){
    super();
    this.state = {
      articles: []
    }
  }
  componentDidMount() {
    this.loadsArticles(window.location.origin);
  }
  loader() {
    return (<div className="loader"></div>)
  }
  loadsArticles(baseUrl) {
    ajax.get(`${baseUrl}/api/articles`)
        .end((err, res) => {
          if(!err && res) {
              this.setState({articles: res.body});

          }
        });
  }
  renderArticles() {
    return this.state.articles.map((article,i)=>{
      if(article.published) {
        return (

          <div className="articles clearfix" key={i}>

            <div className="articles__head">
              <h2 className="articles__title">{article.title}</h2>
              <p className="articles__date">{article.createdAt}</p>

            </div>

            <div className="articles__body">
              <p>{article.content[1].body}</p>
              <Link to={`articles/${article._id}`}><button className="articles__button"> Lire la suite </button></Link>
            </div>

          </div>
        );
      }
    })
  }

  render() {
    let content;
    if(this.state.articles.length > 0){
      content = this.renderArticles();
    } else {
      content = this.loader();
    }
    return (
      <div className="wrapper">
        {content}
      </div>
    );
  }
}
