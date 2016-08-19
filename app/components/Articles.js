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
          } else {
            console.log("There was an error fetching data " + err);
          }
        });
  }
  renderArticles() {
    return this.state.articles.map((article,i)=>{

      return (

        <div className="articles"key={i}>

          <div className="articles__head">
            <h2 className="articles__title">{article.title}</h2>
            <p className="articles__date">{article.createdAt}</p>

          </div>

          <div className="articles__body">
            <p>{article.preview}</p>
            <Link to={`articles/${article._id}`}> CLICK </Link>
          </div>

        </div>
      );

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
