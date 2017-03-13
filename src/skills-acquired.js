import _ from 'lodash';
import React, { Component } from 'react';

import Chip from 'material-ui/Chip';

import R from '../data/resume.json'

import SkillsApplied from './skills-applied'

class SkillsAcquired extends Component {
  state = { skill: '' }

  onChipClick(skill) {
    //if same skill was clicked again, toggle
    this.setState({skill: (skill === this.state.skill) ? '' : skill})
  }

  render() {
    if (_.isEmpty(R.skills)) return null;

    return (
      <section>
        <div className="skills-container">
          <div className="skills-acquired-container">
            <h2><i className="fa fa-tags"></i>Skills Acquired</h2>
            {
              _.map(R.skills, x => {
                return (
                  <div key={x.name} className="skills-acquired-content">
                    <div className="skill-acquired-header">
                      {x.name}
                    </div>
                    <div className="skill-acquired-items">
                      {_.map(x.keywords, y => {return (<Chip className="skill-acquired-item" key={y} onTouchTap={this.onChipClick.bind(this, y)}>{y}</Chip>)})}
                    </div>
                  </div>
                )
              })
            }
          </div>
          {this.state.skill && <SkillsApplied skill={this.state.skill} />}
        </div>
      </section>
    );
  }
}

export default SkillsAcquired;
