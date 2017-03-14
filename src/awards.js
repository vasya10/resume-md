import _ from 'lodash';
import React, { Component } from 'react';

import {formatDate} from './utils'

import R from '../data/resume.json';

class Awards extends Component {

  render() {
    if (_.isEmpty(R.awards) && _.isEmpty(R.patents)) return null;
    return (
      <section>
        <h2><i className="fa fa-trophy"></i>Awards and Patents</h2>
        <ul>
          {
            _.map(R.awards, x => {
              return (<li key={x.title}><span className="award-title">{x.title}</span> ({x.awarder}, {formatDate(x.date)}): {x.summary}</li>)
            })
          }
          {
            _.map(R.patents, x => {
              return (<li key={x.title}><span className="award-title">{x.title}</span> ({x.awarder}, {formatDate(x.date)}): {x.summary}</li>)
            })
          }
        </ul>
      </section>
    );
  }
}

export default Awards;
