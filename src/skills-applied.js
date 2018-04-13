import _ from 'lodash';
import React, { Component } from 'react';

import R from '../data/resume.json'

const item = x => {
  return { __html: x }
}

class SkillsApplied extends Component {

  render() {
    if (_.isEmpty(R.skills)) return null;

    const skillWords = this.props.skill.split(' ').filter(x => !_.includes([',', '/', '&'], x))

    const workFilter = _.reduce(R.work, (result, x) => {
      const highlights = _(skillWords).map(sw => x.highlights.filter(h0 => h0.match(new RegExp('\\s' + sw, 'gi')))).flatten().uniq().valueOf()
      if (highlights.length > 0) {
        result = result.concat(_.map(highlights, h => {return {company: x.company, text: h}}))
      }
      return result
    }, [])

    const awardFilter = _.reduce(R.awards, (result, x) => {
      const award = _(skillWords).map(sw => x.summary.match(new RegExp('\\s' + sw, 'gi'))).flatten().uniq().reject(_.isNull).reject(_.isEmpty).valueOf()
      if (award.length > 0) {
        result = result.concat({company: `${x.awarder}`, text: `(Award) ${x.summary}`})
      }
      return result
    }, [])

    const patentFilter = _.reduce(R.patents, (result, x) => {
      const patentSummary = _(skillWords).map(sw => x.summary.match(new RegExp('\\s' + sw, 'gi'))).flatten().uniq().reject(_.isNull).reject(_.isEmpty).valueOf()
      const patentTitle = _(skillWords).map(sw => x.title.match(new RegExp('\\s' + sw, 'gi'))).flatten().uniq().reject(_.isNull).reject(_.isEmpty).valueOf()
      if (patentSummary.length > 0 || patentTitle.length > 0) {
        result = result.concat({company: `${x.awarder}`, text: `(Patent) ${x.summary}`})
      }
      return result
    }, [])

    const trainingFilter = _.reduce(R.training, (result, x) => {
      const training = _(skillWords).map(sw => x.name.match(new RegExp(sw, 'g'))).flatten().uniq().reject(_.isNull).reject(_.isEmpty).valueOf()
      if (training.length > 0) {
        result = result.concat({company: x.company, text: `(Training) ${x.name}`})
      }
      return result
    }, [])

    // const trainingFilter = _(R.training).filter(x => { return x.match(new RegExp(this.props.skill, 'gi')) })
    //                         .map(x => {return {company: '', text: x}})
    //                         .value()

    const skillsApplied = [...workFilter, ...awardFilter, ...patentFilter, ...trainingFilter]

    if (skillsApplied.length <= 0) return null;

    return (

      <div id="skillsApplied" className="skills-applied-container">
        <h2><i className="fa fa-check-circle-o"></i>Skills Applied</h2>
        <ul className="inset">
          {
            _.map(skillsApplied, x => {
              return (<li key={x.text}><span className="award-title">{`@${x.company}: `}</span><span dangerouslySetInnerHTML={item(x.text)}></span></li>)
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
