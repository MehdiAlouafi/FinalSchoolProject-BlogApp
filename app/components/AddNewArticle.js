import React from 'react';
import ajax from 'superagent';

export default class AddNewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      article: [],
      title: ""
    }
  }

  addContent(tagType) {

    const { newText } = this.refs;

    var newState = this.state.article.push({ tag: tagType, body: newText.value });

    this.setState({newState});

  }
  addTitle() {
    const { newText } = this.refs;

    this.setState({title: newText.value});
  }

  postRequest() {
          ajax.post(`${window.location.origin}/admin/add`)
              .set('Authorization', window.localStorage.token)
              .send(
                  {
                    title: this.state.title,
                    content: this.state.article,
                    published: true
                  }
              )
              .end((err, res) => {
                if(!err && res) {
                  if(res.status === 200) {
                    this.setState({saved: true});
                  }
                }
              })
  }
  render() {
    if(this.state.saved === true) {
      return (<div className="article-saved"><p>Article posté avec succés</p></div>)
    }
    return (
      <div className="editor">
        <h1>{this.state.title}</h1>
        {

            this.state.article.map((article, i) => {

              if(article.tag === "p") {
                return <p key={i}>{article.body}</p>
              } else if (article.tag === "h2") {
                return <h2 key={i}>{article.body}</h2>
              }

            })
        }
        <textarea ref="newText" type="text" ></textarea>
        <div className="editor__controls">
          <button onClick={this.postRequest.bind(this)}>Post it</button>
          <button onClick={this.addTitle.bind(this)}>New title</button>
          <button onClick={this.addContent.bind(this, "p")}>Click paragraph</button>
          <button onClick={this.addContent.bind(this, "h2")}>click h2</button>
        </div>
      </div>

    );
  }
}
