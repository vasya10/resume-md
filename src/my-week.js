import _ from 'lodash';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const d3 = require('d3')
require('d3-scale')

import R from '../data/resume.json'

const width = 180;
const height = 220;
const radius = Math.min(width, height) / 2;
const color = d3.scaleOrdinal(d3.schemeCategory20);
const donutWidth = 30;
const legendRectSize = 18;
const legendSpacing = 4;

const dataset = R.myweek

class MyWeek extends Component {

  createPieChart() {
    var svg = d3.select('#myweek-chart')
              .append('svg')
              .attr('width', width*2)
              .attr('height', height)
              .append('g')
              .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

    var pie = d3.pie()
      .value(function(d) { return d.percent; })
      .sort(null);

    var path = svg.selectAll('path') /* eslint no-unused-vars: 0 */
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d) {
        return color(d.data.name);
      });

    var legend = svg.selectAll('.legend') /* eslint no-unused-vars: 0 */
         .data(color.domain())
         .enter()
         .append('g')
         .attr('class', 'legend')
         .attr('transform', function(d, i) {
           var height = legendRectSize + legendSpacing;
           var offset =  height * color.domain().length / 2;
           var horz = -2 * legendRectSize;
           var vert = i * height - offset;
           return 'translate(' + 110 + ',' + vert + ')';
         });

   legend.append('rect')
     .attr('width', legendRectSize)
     .attr('height', legendRectSize)
     .style('fill', color)
     .style('stroke', color);

   legend.append('text')
     .attr('x', legendRectSize + legendSpacing)
     .attr('y', legendRectSize - legendSpacing)
     .text(function(d) { return d; });
  }

  componentDidMount() {
    this.createPieChart()
  }

  render() {
    return (
      <Paper id="myweek">
        <h2><i className="fa fa-circle-o-notch" style={{marginLeft: '0.5rem'}}></i>My week in a wheel</h2>
        <section>
          <div id="myweek-chart" className="myweek-chart">
          </div>
        </section>
      </Paper>
    );
  }
}

export default MyWeek;
