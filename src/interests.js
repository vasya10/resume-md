import _ from 'lodash';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import vis from 'vis'

import './app.css';
require('../node_modules/vis/dist/vis.min.css')
require('../node_modules/vis/dist/vis-network.min.css')
require('../node_modules/vis/dist/vis-timeline-graph2d.min.css')

import R from '../data/resume.json'

let index = 0
let nodes = [], edges = []
_.each(R.interests, (x, group) => {
  const rootIndex = ++index
  nodes = nodes.concat({id: rootIndex, label: x.name, group})
  _.each(x.keywords, (k) => {
    const keyIndex = ++index;
    nodes = nodes.concat({id: keyIndex, label: k, group})
    edges = edges.concat({from: rootIndex, to: keyIndex, title: k })
  })
})

console.log("NODes", nodes)
const options = {
 nodes: {
   shape: 'dot',
   size: 8,
   font: {
     size: 28
   }
 },
 edges: {
   smooth: true
 }
};

class Interests extends Component {

  componentDidMount() {
    new vis.Network(this.refs.interests, {nodes, edges}, options);
  }

  render() {
    if (_.isEmpty(R.interests)) return null;

    return (
      <Paper id="interests" style={{marginLeft: '1rem'}} className="charts-item">
        <h2><i className="fa fa-thumbs-o-up" style={{marginLeft: '0.5rem'}}></i>Interests</h2>
        <div id="interests" ref="interests" className="interest-chart">
        </div>
      </Paper>
    );
  }
}

export default Interests;
