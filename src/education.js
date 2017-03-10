import _ from 'lodash';
import mo from 'moment';
import React, { Component } from 'react';

import R from '../data/resume.json'

class Education extends Component {

  render() {
    if (_.isEmpty(R.education)) return null;

    return (
      <section>
        <h2><i className="fa fa-graduation-cap"></i>Education</h2>
        {
          _.map(R.education, x => {
            return (<div key={x.area}>{x.studyType} {x.area}, GPA: {x.gpa} {x.institution} ({mo(x.startDate).year()} - {mo(x.endDate).year()})</div>)
          })
        }

      </section>
    );
  }
}

export default Education;
