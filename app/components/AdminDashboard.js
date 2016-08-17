import React from 'react';
import ajax from 'superagent';

export default class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      title: ""
    }
  }

  addContent(tagType) {
    const { newText } = this.refs;

    var newState = this.state.article.push({ type: tagType, body: newText.value });

    this.setState({newState});

  }
  addTitle() {
    const { newText } = this.refs;

    this.setState({title: newText.value});
  }
  postRequest() {
          ajax.post("http://localhost:3000/admin/save")
              .send(
                {
                  title: this.state.title,
                  content: this.state.article
                })
              .end((err, res) => {
                if(!err && res) {
                  console.log("yah");
                } else {
                  console.log("breuk");
                }
              })

  }
  render() {

    return (
      <div className="editor">
        <h1>{this.state.title}</h1>
        {

            this.state.article.map((article, i) => {

              if(article.type === "p") {
                return <p key={i}>{article.body}</p>
              } else if (article.type === "h2") {
                return <h2 key={i}>{article.body}</h2>
              }

            })
        }
        <textarea ref="newText" type="text" ></textarea>

        <button onClick={this.postRequest.bind(this)}>Post it</button>
        <button onClick={this.addTitle.bind(this)}>New title</button>
        <button onClick={this.addContent.bind(this, "p")}>Click paragraph</button>
        <button onClick={this.addContent.bind(this, "h2")}>click h2</button>

      </div>

    );
  }
}
