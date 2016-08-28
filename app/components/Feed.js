import React from 'react';
import ajax  from 'superagent';



export default class Feed extends React.Component {
  static contextTypes = {
    router: function(){ return React.PropTypes.func.isRequired;}
  }
  constructor() {
    super();

    this.state = {
      success: false
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    var newFeed = this.refs.newFeed.value;
    ajax
      .post(`${window.location.origin}/addFeed`)
      .set('Authorization', window.localStorage.token)
      .send({body: newFeed})
      .end((err,res) => {
        if(!err && res) {
          this.setState({success: true})
        } else {
          if (err.status === 401) {
            delete window.localStorage.token
            this.context.router.push('login');

          }
        }
      })
  }
  render() {
    let flashMessage;

    if(this.state.success) {
      flashMessage = (<div className="flash__feed">cool</div>)
    }

    return (
      <div className="feed clearfix">
        {flashMessage}

        <form className="clearfix" onSubmit={this.handleSubmit.bind(this)}>
          <textarea ref="newFeed" placeholder="What's Up ?"></textarea>
          <button type="submit"> Post feed</button>
        </form>
      </div>
    );
  }
}
