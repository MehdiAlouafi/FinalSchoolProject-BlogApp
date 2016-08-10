import React from 'react';
import ReactDOM from 'react-dom';


// Stylesheet

require('./styles/normalize.css');
require('./styles/main.sass');


// pages

import HeroHeader from './components/Hero-Header';
import Layout from './pages/Home.js';


ReactDOM.render(

  <div>
      <Layout>
        <HeroHeader />
      </Layout>
  </div>
,

document.getElementById('root'));
