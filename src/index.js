import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Montserrat', 'Abel', 'sans-serif']
  }
});


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
