import _ from 'lodash';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const d3 = require('d3')
require('d3-scale')

import R from '../data/resume.json'

const width = 180;
const height = 180;

/* Green - Understand Speech (0), Pink: Native Speaker (5) */
const RainMeter = ["#AED581", "#FFB74D", "#FFF176", "#E57373", "#64B5F6", "#F06292"]
const RainBoxY = 10;
const RainBoxWidth = 50;
const RainBoxHeight = 20;

class Languages extends Component {

  appendText(svg, x, y, text) {
    svg.append('text').attr('x', x).attr('y', y).text(text)
  }

  createLanguageChart() {

    /* setup svg */
    var svg = d3.select('#language-chart')
              .append('svg')
              .attr('width', 400)
              .attr('height', height)
              .append('g')
              .attr('transform', 'translate(' + (width / 6) + ',' + (height / 8) + ')');

    /* draw rain meter */
    var rects = svg.selectAll("rect").data(R.languages).enter().append("rect")
    rects.attr("x", (d,index) => { return index * RainBoxWidth })
                    .attr("y", RainBoxY)
                    .attr("width", RainBoxWidth)
                    .attr("height", RainBoxHeight)
                    .style("fill", (d, index) => { return RainMeter[index] } )

    var boundary = svg.append("g")
    /* set boundary text */
    this.appendText(boundary, -30, RainBoxY / 2, "Understand")
    this.appendText(boundary, 275, RainBoxY / 2, "Native Speaker")

    /* write text labels */
    var lines = svg.selectAll("line").data(R.languages).enter().append("line");
    lines.attr('x1', (d, index) => {return d.level*RainBoxWidth+(RainBoxWidth/2)})
                    .attr('y1', (d, index) => {return RainBoxY+RainBoxHeight})
                    .attr('x2', (d, index) => {return d.level*RainBoxWidth+(RainBoxWidth/2)})
                    .attr('y2', (d, index) => {return RainBoxY+RainBoxHeight+((1+index)*4*d.level)})
                    .style('stroke', '#ccc')
                    .style('stroke-width', 1)

    var texts = svg.selectAll("text.labels").data(R.languages).enter().append("text");
    texts.attr("x", (d,index) => { return d.level * RainBoxWidth })
                          .attr("y", (d,index) => { return RainBoxY+RainBoxHeight+22+((1+index)*4*d.level) })
                          .attr("class", "labels")
                          .text((d) => { return d.name })
  }

  componentDidMount() {
    this.createLanguageChart()
  }

  render() {
    if (_.isEmpty(R.languages)) return null;

    return (
      <Paper id="language" style={{marginLeft: '1rem'}}>
        <h2><i className="fa fa-language" style={{marginLeft: '0.5rem'}}></i>Spoken Languages</h2>
        <div id="language-chart" className="language-chart"></div>
      </Paper>
    );
  }
}

export default Languages;
