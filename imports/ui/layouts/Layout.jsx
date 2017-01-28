import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Events} from '../../api/events.js'

/* import Widgets... */
import EventsWidget from '../Widgets/EventsWidget.jsx'
import QuotesWidget from '../Widgets/QuotesWidget.jsx'
import AnnouncementWidget from '../Widgets/AnnouncementWidget.jsx'
import HijrahWidget from '../Widgets/HijrahWidget.jsx'
import PrayerTimesWidget from '../Widgets/PrayerTimesWidget.jsx'
import AdminWidget from '../Widgets/AdminWidget.jsx';
import ColorModeWidget from '../Widgets/ColorModeWidget.jsx';


import EventAll from '../NUSEvents/EventAll.jsx'
import LogoutBtn from '../components/LogoutBtn.jsx'

export default class Layout extends TrackerReact(React.Component) {

    constructor() {
        super();
        Tracker.autorun(function(){
           Meteor.subscribe("allEvents");

        });

        this.state = {
            accessToken: '',
            play: true,
            hijrah: '',
            prayer: '',
            currentPrayer: '',
            fasting: '',
        }
    }
    componentDidMount() {
        this.getHijrahDate();
        this.getPrayerTime();

        $('.materialboxed').materialbox();

        this.refs.colorMode.setBgColor()

        // $.getScript( "https://cdn.onesignal.com/sdks/OneSignalSDK.js" )
        var OneSignal = window.OneSignal || [];
        OneSignal.push([
            "init", {
                appId: "3ba1c92b-4e88-49cf-ac32-daf8996231aa",
                autoRegister: true,
                notifyButton: {
                    enable: false/* Set to false to hide */
                }
            }
        ]);

    }

    getHijrahDate() {
      that = this;
      Meteor.call('getHijrahDate', (error, result) => {

        that.setState({
          hijrah: result.hDate,
          fasting: result.fasting,
        })
      })
    }

    getAllEvents() {
      events = Events.find({}).fetch();
      return events;
    }
    getTodayEvents() {
      //{ "ticketnumber.CHG_1234":{ $exists: true } }
      events = Events.find({'today': {$exists: true}}).fetch(); //should return 0
      //'credit.sent': {$exists: true}
      return events;
    }

    getPrayerTime() {
      that = this;
      Meteor.call('getPrayerTime', (error, result) => {

        that.setState({
          prayer: result.displayPrayer,
          currentPrayer: result.currPrayer,
        })
      })
    }

    getBgImage(){
        var totalCount = 31;
        var image = Math.ceil(Math.random() * totalCount);
        return image;
    }

    handleClick(e) {

        e.preventDefault();

        if (this.state.play)
            document.getElementById('audio').play()
        else
            document.getElementById('audio').pause()
        this.setState({
            play: !this.state.play
        })

    }

    render() {

        var events = this.getAllEvents(); //should be reactive cuz i'm using TrackerReact
        var todayEvents = this.getTodayEvents();

        console.log(todayEvents)

        var image = this.getBgImage();


        audioBtn = this.state.play
            ? <a className="material-icons iconAlign white-text large brand" onClick={this.handleClick.bind(this)}>volume_mute</a>
            : <a className="material-icons iconAlign white-text large brand" onClick={this.handleClick.bind(this)}>volume_up</a>

        return (
            <div className="white-text">
                <link rel="manifest" href="/manifest.json"/>

                <div className="topLeft">
                    <audio id="audio" loop>
                        <source src="dzikr_mix2.mp3" type="audio/mpeg"/>
                    </audio>
                    <a href="/" className=" white-text brand">MyNUSMS
                        <span className="betaFont smallFont">Beta</span>
                    </a>

                    &nbsp; {audioBtn}
                    <div className="usefulLinks">
                        <a href="http://facebook.com/nusms" target="_blank" className="socialLink">
                            <i className="fa fa-facebook  " aria-hidden="true"></i>
                        </a>
                        <a href="http://instagram.com/nusms" target="_blank" className="socialLink">
                            <i className="fa fa-instagram " aria-hidden="true"></i>
                        </a>
                        <a href="http://twitter.com/nusms" target="_blank" className="socialLink">
                            <i className="fa fa-twitter  " aria-hidden="true"></i>
                        </a>
                        {/*<p className="smallerFont betaFont noTopGap halfSee white-text">Tech by MSociety</p> */}
                    </div>
                </div>

                <div className="topMiddle center">
                    <PrayerTimesWidget prayer={this.state.prayer} currentPrayer={this.state.currentPrayer}/>
                </div>

                <div className="topAnnouncement center">
                    {/*  */}<AnnouncementWidget events={events}/>
                </div>

                <div className="topRight">
                    <HijrahWidget hijrah={this.state.hijrah} fast={this.state.fasting}/> {/* <HijrahWidget hijrah={this.state.event[0]} /> */}
                    {/* <EventAll event={events}/> */}
                </div>

                <div className="contentDiv container mainContent">
                    {this.props.content()}
                </div>
                <a href="/musollaView" className="bottomLeft formalFont white-text mainLink">
                    <i className="material-icons iconAlign">location_on</i>NUS Musolla</a>
                {/*<img className="materialboxed bottomRight" width="50" src="coe.jpg"  data-caption="Calendar of Events for AY 2016/2017" /> */}

                <div className="bottomCenter">
                    <QuotesWidget/>
                </div>

                <div className="middleLeft formalFont white-text mainLink">
                    {Meteor.userId()
                        ? <AdminWidget/>
                        : ''
                    }
                </div>

                <div className="middleRight formalFont white-text mainLink">
                  <ColorModeWidget ref="colorMode" image={image}/>
                </div>

                <div className="bottomRight">
                    {/*  */}<EventsWidget events={events} todayEvents={todayEvents}/>
                </div>

            </div>
        )
    }
}
