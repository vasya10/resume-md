import _ from 'lodash';
import React, { Component } from 'react';

import R from '../data/resume.json'

class Publications extends Component {

  render() {
    if (_.isEmpty(R.publications)) return null;

    return (
      <section>
        <h2><i className="fa fa-trophy"></i>Awards and Patents</h2>
        <ul>
          {
            _.map(R.publications, x => {
              return (<li key={x.title}><strong>{x.title}</strong> ({x.awarder}, {x.date}): {x.summary}</li>)
            })
          }
        </ul>
      </section>
    );
  }
}

export default Publications;
