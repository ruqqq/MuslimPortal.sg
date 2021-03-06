import React from 'react';

import {Events} from '../../api/events.js';

export default class EventForm extends React.Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      //  var date = $('#datepicker').datepicker({ dateFormat: 'dd-mm-yy' }).val();
        //load jQuery for datePicker
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year
            format: 'dd-mm-yyyy'
        });
    }

   
    handleSubmit(e) {
      e.preventDefault()

      var name = this.refs.name.value.trim();
      var url = this.refs.url.value.trim();

      var dateStart = this.refs.dateStart.value.trim();
      var timeStart = this.refs.start.value.trim();
      var dateEnd = this.refs.dateEnd.value.trim();
      var timeEnd = this.refs.end.value.trim();


        properDateStart = dateStart;
        properDateStartFormat = dateStart.split("-");
        finalisedStart = properDateStartFormat[2] + "-" + properDateStartFormat[1] + "-" + properDateStartFormat[0] + "T" + timeStart + ":00"

        dateStart = new Date(finalisedStart)

        dateStart = dateStart.toISOString();

        //dateEnd
        properDateEnd = dateEnd;
        properFormat = dateEnd.split("-");
        finalised = properFormat[2] + "-" + properFormat[1] + "-" + properFormat[0] + "T" + timeEnd + ":00"

        dateEnd = new Date(finalised)

        dateEnd = dateEnd.toISOString();

        Meteor.call('addEvent', name, dateStart, dateEnd, url, (error,data) => {
            if(error){
                Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
            } else {
                Materialize.toast('Event Added Successfully!', 4000)
                FlowRouter.go("/")

            }
        })
      

      // /* what */
      // var name = this.refs.name.value.trim();

      // /* when */
      // var dateStart = this.refs.dateStart.value.trim();
      // var timeStart = this.refs.start.value.trim();
      // var dateEnd = this.refs.dateEnd.value.trim();
      // var timeEnd = this.refs.end.value.trim();

      // console.log(dateStart)

      // Meteor.call('addEvents', name, dateStart, timeStart, dateEnd, timeEnd, (error,data) => {
      // if(error){
      //     Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
      // } else {
      //     Materialize.toast('Event Added Successfully!', 4000)
      //     FlowRouter.go("/eventsView")

      //   }
      // })
    }

    render() {
        return (

                <div className="row topGap bottomGap grey-text text-darken-3">
                  <div className="col s12 m10 offset-m1">
                    <div className="card-panel">

                        <h2> Add Event </h2>
                        <form onSubmit={this.handleSubmit.bind(this)} className="topGap">
                          <div className="topGap">
                            {/*<h4> What ? </h4>*/}
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="name" type="text" className="validate" ref="name"/>
                                    <label htmlFor="name" className="active">Title</label>
                                </div>
                            </div>

                        </div>

                        <div className="topGap">
                            <div className="row">
                                <div className="input-field col m3">
                                    <input type="date" className="datepicker" id="dateStart" ref="dateStart"/>
                                    <label htmlFor="dateStart">Start Date</label>
                                </div>
                                <div className="input-field col m3">
                                    <input type="time" id="start" ref="start" />
                                </div>

                                <div className="input-field col m3">
                                    <input type="date" className="datepicker" id="dateEnd" ref="dateEnd"/>
                                    <label htmlFor="dateEnd">End Date</label>
                                </div>

                                <div className="input-field col m3">
                                    <input type="time" id="end" ref="end" />
                                </div>
                            </div>
                        </div>

                        <div className="topGap">
                        
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="url" type="text" className="validate" ref="url" placeholder="e.g: http://bit.ly/eventRSVP"/>
                                    <label htmlFor="url" className="active">Event URL</label>
                                </div>
                            </div>

                        </div>

                            <div className="topGap"></div>

                            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                <i className="material-icons right">send</i>
                            </button>

                        </form>

                    </div>
                  </div>
                </div>

        )
    }
}
