import _ from 'lodash';
import React, { Component } from 'react';

import Chip from 'material-ui/Chip';

import R from '../data/resume.json'

class Skills extends Component {

  render() {
    if (_.isEmpty(R.skills)) return null;

    return (
      <section>
        <h2><i className="fa fa-tags"></i>What I think I know</h2>
        {
          _.map(R.skills, x => {
            return (
              <div key={x.name} className="skills-container">
                <div className="skill-header">
                  {x.name}
                </div>
                <div className="skill-items-container">
                  {_.map(x.keywords, y => {return (<Chip className="skill-item" key={y}>{y}</Chip>)})}
                </div>
              </div>
            )
          })
        }
      </section>
    );
  }
}

export default Skills;
