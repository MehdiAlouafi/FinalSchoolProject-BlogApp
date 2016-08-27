import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { browserHistory } from 'react-router';
import { getToken } from './auth';
// Stylesheet

require('./styles/normalize.css');
require('./styles/main.sass');


// pages

import AdminDashboard from './components/AdminDashboard';
import AddNewArticle from './components/AddNewArticle';
import Articles from './components/Articles';
import ArticlesDetail from './components/ArticlesDetail';
import EditArticle from './components/EditArticle';
import NotFound    from './components/NotFound';
import Login from './components/Login';

import HeroHeader from './components/Hero-Header';

import App from './pages/App';

import auth from './auth';
function isAuthenticate(nextState, replace) {

  if(!auth.loggedIn()) {
    console.log("nothing to do here");
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname}
    })
  } 
}
ReactDOM.render(

    <Router history={browserHistory}>

        <Route path="/" component={ App } >

            <IndexRoute component={HeroHeader} />

            <Route path="articles" component={Articles} />
            <Route path="articles/:id" component={ArticlesDetail} />

            <Route path="admin" component={AdminDashboard} onEnter={isAuthenticate} />
            <Route path="admin/add" component={AddNewArticle} />
            <Route path="admin/edit/:id" component={EditArticle} />

            <Route path="login" component={Login} />
            <Route path="*" component={NotFound} />

        </Route>

    </Router>

,

document.getElementById('root'));
