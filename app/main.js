import React from 'react';
import ReactDOM from 'react-dom';


// Stylesheet

require('./styles/normalize.css');
require('./styles/main.sass');


// pages

import Layout from './pages/Home.js'



ReactDOM.render(


  <Layout />,

document.getElementById('root'));
