import React from 'react';
import ajax  from 'superagent';
export default class AdminDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: []
    }
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
  componentDidMount() {
    this.loadsArticles(window.location.origin);
  }
  test(e) {
    ajax
      .del(`http://localhost:3000/api/articles/${e}`)
      .end((err,res)=>{
        if(!err && res) {

        }
      })

  }
  renderArticles() {
    return this.state.articles.map((element, i) => {
      return (
          <div key={element._id} className="dashboard">
            <h4>{element.title}</h4>
            <div className="dashboard--controls">
              <ul>
                <li></li>
                <li><i className="fa fa-pencil" aria-hidden="true"></i></li>
                <li onClick={this.test.bind(this, element._id) }><i className="fa fa-trash" aria-hidden="true"></i></li>

              </ul>
            </div>
          </div>
      );
    })
  }
  render() {
    let content;
    if (this.state.articles.length > 0) {
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
