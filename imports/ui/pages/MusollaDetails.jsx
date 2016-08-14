import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Musolla} from '../../api/musolla.js'

import MusollaSingle from '../MusollaView/MusollaSingle.jsx';

export default class MusollaDetails extends TrackerReact(React.Component) {
  componentDidMount() {
      document.title = "NUSMS | Musolla Details"
  }

  constructor(props) {
      super(props);

      this.state = {
          subscription: {
              events: Meteor.subscribe("allMusolla")
          },

      }
  }
  showMusolla() {
      return Musolla.findOne({"_id": this.props.musollaId})
  }

  render(){
    musolla = this.showMusolla()
    //alert(this.props.musollaId)
    if (!musolla)
        return <span>loading</span>

      directionSteps = ""
    if (musolla.direction){
      directionSteps = (
          musolla.direction.map((singleStep)=>{
            return (<li>{singleStep}</li>)
          })
      )
    }

    return (
      <div className="topGap">
          <div className="row">
              <div className="col s12">
                  <div className="card-panel hoverable">
                      <h2>
                        {musolla.faculty}, {musolla.building}
                        <span className="eventType right formalFont">
                          {musolla.gender}
                        </span>
                      </h2>

                      <h5>({musolla.description})</h5>
                      
                      <div className="topGap">
                        <h5> Directions: </h5>
                        <ul>
                          {directionSteps}
                        </ul>
                      </div>

                  </div>
              </div>

          </div>

      </div>
    )
  }
}
