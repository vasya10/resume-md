import _ from 'lodash';
import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'

import R from '../data/resume.json'

class Profile extends Component {

  render() {
    return (
      <div className="card-container">
        <div className="card-item">
          <address><i className="fa fa-address-card-o"></i>{R.basics.location.address} {R.basics.location.city} {R.basics.location.postalCode}</address>
          <phone><i className="fa fa-phone"></i>{R.basics.phone}</phone>
        </div>
        <div className="card-item">
          {
            _.map(R.basics.profiles, x => {
              return (
                <a key={x.network} href={x.url} target="_blank">
                  <Avatar style={{marginLeft: '1rem'}} icon={<FontIcon className={`avatar fa fa-${x.network}`} />} />
                </a>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Profile;
