import _ from 'lodash';
import React, { Component } from 'react';

import R from '../data/resume.json'

class Languages extends Component {

  render() {
    if (_.isEmpty(R.languages)) return null;

    return (
      <section>
        <h2>Natural Languages Proficiency</h2>
        <div className="chip-container">
          {skills.map(x => <Chip className="chip-item" key={x}>{x}</Chip>)}
        </div>
      </section>
    );
  }
}

export default Languages;
