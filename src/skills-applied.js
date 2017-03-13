import _ from 'lodash';
import React, { Component } from 'react';

import R from '../data/resume.json'

class SkillsApplied extends Component {

  render() {
    if (_.isEmpty(R.skills)) return null;

    const workFilter = _.reduce(R.work, (result, x) => {
      const highlights = x.highlights.filter(h0 => h0.match(new RegExp(this.props.skill, 'gi')))
      if (highlights.length > 0) {
        result = result.concat(_.map(highlights, h => `${h} (${x.company})`))
      }
      return result
    }, [])

    const awardFilter = _.reduce(R.awards, (result, x) => {
      const award = x.summary.match(new RegExp(this.props.skill, 'gi'))
      if (award) {
        result = result.concat(`${x.summary} (Award, ${x.awarder})`)
      }
      return result
    }, [])

    const patentFilter = _.reduce(R.patents, (result, x) => {
      const patent = x.summary.match(new RegExp(this.props.skill, 'gi'))
      if (patent) {
        result = result.concat(`${x.summary} (Patent, ${x.company})`)
      }
      return result
    }, [])

    const skillsApplied = [...workFilter, ...awardFilter, ...patentFilter]
    return (
      <div id="skillsApplied" className="skills-applied-container">
        <h2><i className="fa fa-check-circle-o"></i>Skills Applied</h2>
        <ul className="inset">
          {
            _.map(skillsApplied, x => {
              return (<li>{x}</li>)
            })
          }
        </ul>
      </div>
    );
  }
}

SkillsApplied.PropTypes = {
  skill: React.PropTypes.string.isRequired
}

export default SkillsApplied;
