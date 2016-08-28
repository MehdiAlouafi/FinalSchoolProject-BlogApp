import React from 'react';
import ajax  from 'superagent';
import { Link } from 'react-router';
export default class ArticlePanel extends React.Component {
  constructor() {
    super();
    this.state = {

      active: "",
      published: false

    }
  }
  fetchPublishedstate() {
    ajax
      .get(`${window.location.origin}/api/articles/${this.props.id}`)
      .set('Authorization', window.localStorage.token)
      .end((err,res) => {
        if(!err && res) {
          this.setState({published: res.body.published})
        }
      })
  }
  componentDidMount() {
    this.fetchPublishedstate()
  }
  render() {
    const { title, id } = this.props;
    var obj  = {
      id: id,
      published: this.state.published
    }
    if(this.state.active === "deleted") {
      return (<h4>Deleted</h4>);
    }
    return (
      <div className={"dashboard"}>

        <h4>{title}</h4>
        <ul className="dashboard__controls">

          <li onClick={this.props.publishArticle.bind(this, obj)}>
            {
              this.state.published ? (<i className="fa fa-bookmark" ariaHidden="true"></i>) : (<i className="fa fa-bookmark-o" ariaHidden="true"></i>)

            }
          </li>
          <li><Link to={`admin/edit/${id}`} ><i className="fa fa-pencil" ariaHidden="true"></i></Link></li>
          <li onClick={this.props.deleteArticle.bind(this, id)}><i className="fa fa-trash-o" ariaHidden="true"></i></li>

        </ul>
      </div>
    );
  }
}
