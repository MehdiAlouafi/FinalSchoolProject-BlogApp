import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { browserHistory } from 'react-router';

// Stylesheet

require('./styles/normalize.css');
require('./styles/main.sass');


// pages

import AdminDashboard from './components/AdminDashboard';
import AddNewArticle from './components/AddNewArticle';
import Articles from './components/Articles';
import ArticlesDetail from './components/ArticlesDetail';
import HeroHeader from './components/Hero-Header';

import App from './pages/App';
ReactDOM.render(

    <Router history={browserHistory}>

        <Route path="/" component={ App } >

            <IndexRoute component={HeroHeader} />
            <Route path="articles" component={Articles} />

            <Route path="articles/:id" component={ArticlesDetail} />
            <Route path="admin" component={AdminDashboard} />
            <Route path="admin/add" component={AddNewArticle} />

        </Route>

    </Router>

,

document.getElementById('root'));
