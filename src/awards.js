import _ from 'lodash';
import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

import R from '../data/resume.json';

class Awards extends Component {

  render() {
    if (_.isEmpty(R.awards) && _.isEmpty(R.patents)) return null;
    return (
      <section>
        <h2><i className="fa fa-trophy"></i>Awards and Patents</h2>
        {
          _.map(R.awards, x => {
            return (<Paper style={{height: 100, width: 100, textAlign: 'center', display: 'inline-block'}} key={x.title} rounded={true}>{x.title}</Paper>)
          })
        }
        {/* <ul>
          {
            _.map(R.awards, x => {
              return (<li key={x.title}><strong>{x.title}</strong> ({x.awarder}, {x.date}): {x.summary}</li>)
            })
          }
          {
            _.map(R.patents, x => {
              return (<li key={x.title}><strong>{x.title}</strong> ({x.company}, {x.date}): {x.summary}</li>)
            })
          }
        </ul> */}
      </section>
    );
  }
}

export default Awards;
