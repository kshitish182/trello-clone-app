import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './assets/sass/style.scss';
import Home from './components/Home';
import Header from './components/Header';
import Authorization from './components/AuthComponents';

ReactDOM.render(
  <React.StrictMode>
    {false && (
      <>
        <Header />
        <Home />
      </>
    )}
    <Authorization />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
