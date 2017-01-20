import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Musolla} from '../../api/musolla.js'

import MusollaAll from '../MusollaView/MusollaAll.jsx'

export default class MusollaView extends TrackerReact(React.Component) {
  constructor() {
      super();

      this.state = {
          subscription: {
              musolla: Meteor.subscribe("allMusolla")
          }
      }
  }

  showMusolla() {

      musolla = Musolla.find({}).fetch();

      return musolla
  }
  
  render(){

    musolla = this.showMusolla()

    if (!musolla)
        return <span>loading</span>
      
    return(
      <div className="lessMarginTop">
        <h1 className="center ">
          Musolla in NUS
        </h1>
        <p className="betaFont belowCaption center">(Scrollable List)</p>
        <MusollaAll musolla={musolla}/>

      </div>
    )
  }
}
