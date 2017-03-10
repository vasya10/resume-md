import _ from 'lodash';
import React, { Component } from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

import R from '../data/resume.json'

class AboutMe extends Component {

  render() {
    return (
      <section className="card-container">
        {
          _.map(R.aboutme, x => {
            return (
              <Card key={x.title} className="card-item">
                <CardHeader title={x.title} subtitle={x.subtitle} avatar={<Avatar icon={<FontIcon className={`avatar ${x.icon}`} />} />}>
                  <CardText>
                    <ul className="inset">
                      { _.map(x.items, y => { return ( <li key={y}>{y}</li> ) }) }
                    </ul>
                  </CardText>
                </CardHeader>
              </Card>
            )
          })
        }
      </section>
    );
  }
}

export default AboutMe;
