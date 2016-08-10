import React from 'react';


export default class Articles extends React.Component {

  renderArticles() {
    return this.props.data.map((article,i)=>{

      return (

        <div className="articles"key={i}>
        
          <div className="articles__head">
            <h2 className="articles__title">{article.title}</h2>
            <p className="articles__date">{article.createdAt}</p>
          </div>

          <div className="articles__body">
            <p>{article.preview}</p>
          </div>

        </div>
      );

    })
  }

  render() {
    return (
      <div className="wrapper">
        {this.renderArticles()}
      </div>
    );
  }
}
