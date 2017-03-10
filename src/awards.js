import _ from 'lodash';
import React, { Component } from 'react';

import R from '../data/resume.json'

class Awards extends Component {

  render() {
    if (_.isEmpty(R.awards)) return null;
    return (
      <section>
        <h2><i className="fa fa-trophy"></i>Awards and Patents</h2>
        <ul>
          {
            _.map(R.awards, x => {
              return (<li key={x.title}><strong>{x.title}</strong> ({x.awarder}, {x.date}): {x.summary}</li>)
            })
          }
        </ul>
      </section>
    );
  }
}

export default Awards;
