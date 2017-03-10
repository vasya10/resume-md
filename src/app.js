import React, { Component } from 'react';
import './app.css';

import AppBar from 'material-ui/AppBar';

import R from '../data/resume.json'

import AboutMe from './about-me';
import ProjectTimeline from './project-timeline';
import Education from './education';
import Training from './training';
import Awards from './awards';
import Skills from './skills';
import MyWeek from './my-week';
import Profile from './profile';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title={R.basics.name} style={{position: 'fixed'}} />
        <div className="main">
          <AboutMe />
          <ProjectTimeline />
          <Awards />
          <Skills />
          <MyWeek />
          <Training />
          <Education />
        </div>
        <footer className="footer">
          <Profile />
        </footer>
      </div>
    );
  }
}

export default App;
