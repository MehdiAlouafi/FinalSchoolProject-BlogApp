import React from 'react';
import ajax  from 'superagent';

class Title extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false
    }
  }
  edit() {
    this.setState({editing: true});
  }
  save() {
    this.props.saveNewTitle(this.refs.newTitle.value, this.props.id);

    this.setState({editing: false});
    console.log("hey")
  }
  render() {
    if(this.state.editing === false ){
      return (
        <h1 onClick={this.edit.bind(this)}>{this.props.children}</h1>
      );
    } else {
      return (
        <div>

          <textarea ref="newTitle" defaultValue={this.props.children}></textarea>
          <button onClick={this.save.bind(this)} >save</button>

        </div>
      );
    }
  }
}
class Head extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false
    }
  }
  edit() {
    this.setState({editing: true});
  }
  save() {

    this.props.saveNewText(this.refs.newText.value, this.props.index);

    this.setState({editing: false});
  }
  render() {

    if(this.state.editing === false ){
      return (
        <h2 onClick={this.edit.bind(this)}>{this.props.children}</h2>
      );
    } else {
      return (
        <div>

          <textarea ref="newText" defaultValue={this.props.children}></textarea>
          <button onClick={this.save.bind(this)} >save</button>

        </div>
      );
    }
  }
}
class Paragraph extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false
    }
  }
  edit() {
    this.setState({editing: true});
  }
  save() {

    this.props.saveNewText(this.refs.newParagraph.value, this.props.index);

    this.setState({editing: false});
  }

  render() {
    if (this.state.editing === false) {
      return (<p onClick={this.edit.bind(this)}>{this.props.children}</p>);
    } else {
      return (
        <div>
          <textarea ref="newParagraph" defaultValue={this.props.children}></textarea>
          <button onClick={this.save.bind(this)}> save </button>
        </div>
      );
    }
  }
}
export default class EditArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      article: {},
      articleSaved: {}
    }
  }
  saveNewText(newText, index) {
    var newState = this.state.article;
    newState.content[index].body = newText;

    this.setState({newState});
    ajax
      .post(`http://localhost:3000/admin/edit/${newState._id}`)
      .set('Authorization', window.localStorage.token)
      .send({element: newState.content[index]._id, newText: newText})
      .end((err,res)=>{
        if(!err && res) {
          console.log(res.body);
        }
      })

  }
  saveNewTitle(newText, id) {
    var newState = this.state.article;
    newState.title = newText;

    this.setState({newState});
    ajax
      .put(`http://localhost:3000/api/articles/${id}`)
      .send({title: newText})
      .end((err,res) => {
        if(!err && res) {
          console.log("success");
        }
      })
  }
  renderPreview() {
    return this.state.article.content.map((elem,i)=> {
      if(elem.tag === "h2") {
        return <Head index={i} saveNewText={this.saveNewText.bind(this)} key={i}>{elem.body}</Head>
      } else {
        return <Paragraph  index={i} key={i} saveNewText={this.saveNewText.bind(this)}> { elem.body } </Paragraph>
      }
    })
  }

  fetchArticle(id) {
    ajax
      .get(`http://localhost:3000/api/articles/${id}`)
      .end((err,res) => {
        if(!err && res) {
          this.setState({article: res.body});
        }
      })
  }
  componentDidMount() {
    this.fetchArticle(this.props.params.id);
  }
  render() {
    let content;
    if (this.state.article.title) {
      content = this.renderPreview();
    } else {
      content = "Loading"
    }

    return (
      <div className="wrapper">
        <div className="preview">
          <Title id={this.state.article._id} saveNewTitle={this.saveNewTitle.bind(this)}>{this.state.article.title}</Title>
          {content}
        </div>
        <button> Save </button>
      </div>
    );
  }
}
