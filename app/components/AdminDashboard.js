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

  addArticle(e) {
    const { newText } = this.refs;

    var newState = this.state.article.push({ type: e, body: newText.value });

    this.setState({newState});
    console.log(this.state.article);

  }
  addTitle() {
    this.setState({title: "First Dynamic Article"});
  }
  postRequest() {
        var data = JSON.stringify(this.state.article);
        console.log(data);
        //
        // this.state.article.map((article, i) => {
        //   ajax.put("http://localhost:3000/api/articles/57b2617c5ca1678213025dec")
        //       .set('Content-Type', 'application/json')
        //       .send({
        //           content: JSON.stringify()
        //       })
        //       .end((err, res) => {
        //         if(!err && res) {
        //           console.log("yah");
        //         } else {
        //           console.log("breuk");
        //         }
        //       })
        // })
          //
          ajax.post("http://localhost:3000/admin")
              .send(
                
                  this.state.article
              )
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
        <button onClick={this.addArticle.bind(this, "p")}>Click paragraph</button>
        <button onClick={this.addArticle.bind(this, "h2")}>click h2</button>

      </div>

    );
  }
}
