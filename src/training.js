import _ from 'lodash';
import React, { Component } from 'react';

import R from '../data/resume.json'

class Training extends Component {

  render() {
    return (
      <section>
        <h2><i className="fa fa-leanpub"></i>Training and Conferences</h2>
        <div className="training-items-container">
          { _.map(R.training, x=> { return (<div className="training-item"key={x}>{x}</div> ) }) }
        </div>
      </section>
    );
  }
}

export default Training;
