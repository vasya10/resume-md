import _ from 'lodash';
import mo from 'moment';
import React, { Component } from 'react';
import vis from 'vis'

import './app.css';
require('../node_modules/vis/dist/vis.min.css')
require('../node_modules/vis/dist/vis-network.min.css')
require('../node_modules/vis/dist/vis-timeline-graph2d.min.css')

import R from '../data/resume.json'

import { formatDate } from './utils'

const workHistory = _.map(R.work, (x, index) => {
  return {
    id: index, content: x.company, start: x.startDate, end: (x.endDate || Date.now())
  }
})

const eventsHistory = _.map(R.globalEvents, (x, index) => {
  return {
    id: workHistory.length + index, content: x.name, start: x.date, type: 'point', className: 'orange'
  }
})

const dataset = [...workHistory, ...eventsHistory]

const startYear = mo(_.minBy(workHistory, "start").start).year()

const options = {
    height: '275px',
    min: new Date(startYear, 1, 1),
    max: new Date(mo().year(), 12, 31),
    zoomMin: 1000 * 60 * 60 * 24 * 31 * 6,
    zoomMax: 1000 * 60 * 60 * 24 * 31 * 12 * 20,
    clickToUse: true
};

class ProjectTimeline extends Component {
  state = { pIndex: 0 }

  componentDidMount() {
    let timeline = new vis.Timeline(this.refs.projectTimeline, dataset, options);
    timeline.on('select', (properties) => {
      this.setState({pIndex: properties.items[0]})
    })
  }

  render() {
    if (_.isEmpty(R.work)) return null;

    const projectDescription = (pIndex) => {
      return (
        <div className="project-item">
          <div className="project-company">
            {R.work[pIndex].company}, {R.work[pIndex].position},
            {formatDate(R.work[pIndex].startDate)} to {formatDate(R.work[pIndex].endDate)}</div>
          <div className="project-summary">{R.work[pIndex].summary}</div>
          <ul className="inset">
            {_.map(R.work[pIndex].highlights, x=> { return (<li key={x}>{x}</li>) })}
          </ul>
        </div>
      )
    }

    return (
      <section>
        <h2><i className="fa fa-calendar"></i>Project Timelines</h2>
        <div id="projectTimeline" ref="projectTimeline"></div>
        <div className="project-container">
          {projectDescription(0)}
          {this.state.pIndex > 0  ? projectDescription(this.state.pIndex) : null}
        </div>
      </section>
    );
  }
}

export default ProjectTimeline;
