import React from 'react';
import ajax  from 'superagent';

export default class ArticlePanel extends React.Component {
  constructor() {
    super();
    this.state = {

      active: ""

    }
  }

  render() {
    const { title, id } = this.props;
    if(this.state.active === "deleted") {
      return (<h4>Deleted</h4>);
    }
    return (
      <div className={"dashboard"}>

        <h4>{title}</h4>
        <ul className="dashboard__controls">
          <li><i className="fa fa-pencil" aria-hidden="true"></i></li>
          <li onClick={this.props.deleteArticle.bind(this, id)}><i className="fa fa-trash-o" aria-hidden="true"></i></li>
        </ul>
      </div>
    );
  }
}
