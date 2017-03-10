import React from 'react';
import ReactDOM from 'react-dom';

import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './index.css';
import App from './app';
import Theme from '../data/theme-purple'

const muiTheme = getMuiTheme(Theme);

const MaterialUiApp = () => (
  <MuiThemeProvider  muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(
  <MaterialUiApp />,
  document.getElementById('root')
);
