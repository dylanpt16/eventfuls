import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import moment from 'moment';
import { isEmpty } from 'lodash';
import Datetime from 'react-datetime';
import CalendarBox from '../../util/calendar_box';
import MapContainer from '../map/map';
import AttendanceIndex from './attendance_index';

class EventShow extends React.Component {
  constructor(props) {
    super(props);
    this.handleAttendButton = this.handleAttendButton.bind(this);
  }

  componentWillMount() {
    this.props.fetchEventDetails(this.props.eventId);
  }

  handleAttendButton(e) {
    e.preventDefault();
    const hasJoined = this.props.event.joined_by_current_user;
    const attendance = { event_id: this.props.eventId};
    if (!this.props.joined_by_current_user) {
      this.props.createAttendance({attendance});
    }else {
      this.props.destroyAttendance({attendance});
    }
  }

  renderJoinButton() {
    const isOwner = this.props.event.owned_by_current_user;
    if(!isOwner) {
      return (
        <div className="attend-button">
          <button
            className={ this.props.joined_by_current_user ? "attended" : "unattended"}
            onClick={this.handleAttendButton}
          >{ !this.props.joined_by_current_user ? "Attend!" : "Unattend"}
          </button>
        </div>
      );
    }
  }

  eventShowShort() {
    const {
      name,
      description,
      picture_url,
      date,
      lat,
      lng,
      event_location,
      host,
    } = this.props.event;

    return (
      <div className="row event-info row-eq-height">
        <div className="col-sm-8" id="event-info-left">
          <img className="img-thumbnail" src={picture_url}/>
        </div>
        <div className="col-sm-4" id="event-info-right">
          <span className="event-show-name">
            { name }
          </span>
          <br />
          <span className="event-show-host">
            Hosted by { host }
          </span>
          <br />
          <span className="event-show-time">
            { moment(date).format("HH:mm") }
          </span>
          <br />
          <span className="event-calendar-container">
            <CalendarBox
              date={ date }
            />
          </span>
          <br />
          <span className="event-show-people">
            { this.props.attendees.length } people going
          </span>
          <br />
          { this.renderJoinButton() }
        </div>
      </div>
    )
  }

  render() {
    if( !isEmpty(this.props.event) ) {
      const {
        name,
        description,
        picture_url,
        date,
        event_location,
        host,
      } = this.props.event;

      const attendees = this.props.attendees;

      return (
        <div className="event-show-container">
          { this.eventShowShort() }
          <div className="row event-details-container">
            <div className="col-sm-4 event-details" id="event-details-left">
              <div className="time event-details">
                <span>
                  <CalendarBox
                    date={ date }
                  />
                </span>
                <div className="time right event-details">
                  { moment(date).format("ddd HH:mm") }
                </div>
              </div>
              <div className="map-event-details">
                <MapContainer
                  center={event_location}
                  putMarker={true}
                />
              </div>
              <div className="attendee-container">
                <AttendanceIndex
                  attendees={attendees}
                />
              </div>
            </div>
            <div className="col-sm-8" id="event-details-right">
              <div>
                <h2 className="event-show-time">
                  Description
                </h2>
              </div>
              <br />
              <p>
                { description }
              </p>
            </div>
          </div>
        </div>
      );
    }else {
      return (
        <div className="event-show-container">
        </div>
      )
    }
  }
}

export default withRouter(EventShow);
