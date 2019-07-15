import React, { Component } from "react";
import Header from "../Header";
import { Container, Row, Button } from "reactstrap";
import axios from "axios";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment-timezone';
import { getEvents } from './BigCalendar';

const localizer = momentLocalizer(moment);

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        }
    }

    componentWillMount() {
        getEvents((events) => {
            this.setState({ events }, () => {
                console.log(events);
            })
        })
    }

    responseGoogle = (response) => {
        console.log(response);
        localStorage.setItem('access_token', response.accessToken);
    }

    // getting events from google calendar
    handleGetEvent = () => {
        const calendarId = 'em92gos3b78c1reguio5mks45c@group.calendar.google.com';
        const YOUR_API_KEY = 'AIzaSyDUdWXOvgTuJYuNvD6gP1DF3Nna6xwzBe0';

        let access_token = localStorage.getItem('access_token');
        axios({
            headers: { "Authorization": "Bearer " + access_token },
            method: "get",
            url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${YOUR_API_KEY}`
        })
            .then(response => {
                console.log(response.data.items);
            }).catch(error => {
                console.log(error.response)
            })
    }

    // adding events in google calendar
    handleInsertEvent = (slotinfo) => {
        const title = window.prompt('Enter New Event');
        
        let addEvent = {
            summary: title,
                start: { 
                    dateTime: slotinfo.start.toISOString() ,
                    // timeZone: 'America/Los_Angeles'
                    },
                end: 
                { 
                dateTime: slotinfo.end.toISOString(),
                // timeZone: 'America/Los_Angeles'
            }
        }
       

            const calendarId = 'em92gos3b78c1reguio5mks45c@group.calendar.google.com';
            const YOUR_API_KEY = 'AIzaSyDUdWXOvgTuJYuNvD6gP1DF3Nna6xwzBe0';
            let access_token = localStorage.getItem('access_token');
        axios({
            headers: { "Authorization":"Bearer " + access_token},
            method: "post",
            url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${YOUR_API_KEY}`,
            data: addEvent
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response.data);
        })
    }

    // adding multiple events in a calendar
    handleInsertMultipleEvent = () => {
        const calendarId = 'em92gos3b78c1reguio5mks45c@group.calendar.google.com';
        const YOUR_API_KEY = 'AIzaSyDUdWXOvgTuJYuNvD6gP1DF3Nna6xwzBe0';

        let EVENT = [
            {
                "end": {
                    "date": "2019-07-13",
                    "dateTime": "2019-07-13T12:30:00",
                    "timeZone": "America/Los_Angeles"
                },
                "start": {
                    "date": "2019-07-13",
                    "dateTime": "2019-07-13T11:00:00",
                    "timeZone": "America/Los_Angeles"
                },
                "summary": "testing 7"
            },
            {
                "end": {

                    "dateTime": "2019-07-13T17:30:00",
                    "timeZone": "America/Los_Angeles"
                },
                "start": {
                    "date": "2019-07-13",
                    "dateTime": "2019-07-13T16:45:00",
                    "timeZone": "America/Los_Angeles"
                },
                "summary": "testing 8"
            },
            {
                "end": {
                    "date": "2019-07-13",
                    "dateTime": "2019-07-13T22:30:00",
                    "timeZone": "America/Los_Angeles"
                },
                "start": {
                    "date": "2019-07-13",
                    "dateTime": "2019-07-13T21:00:00",
                    "timeZone": "America/Los_Angeles"
                },
                "summary": "testing 9"
            },
        ]


        let access_token = localStorage.getItem('access_token');
        axios({
            headers: { "Authorization": "Bearer " + access_token },
            method: "post",
            url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${YOUR_API_KEY}`,
            data: EVENT
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }

    // deleting events from google calendar
    handleDeleteEvent = (eventinfo) => {
        const calendarId = 'em92gos3b78c1reguio5mks45c@group.calendar.google.com';
        // const eventId = 'n66dc5fk3bitpctd7guflocea4';
        const YOUR_API_KEY = 'AIzaSyDUdWXOvgTuJYuNvD6gP1DF3Nna6xwzBe0';

        let access_token = localStorage.getItem('access_token');
        axios({
            headers: { "Authorization": "Bearer " + access_token },
            method: "delete",
            url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventinfo.id}?key=${YOUR_API_KEY}`
        })
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error.response.data);
            });
    }

    logout = () => {
        console.log('successfully logout');
    }

    render() {
        return (
            <>
                <Header />

                <div className="container">
                    <h2>--------------- Login with Calendar ---------------</h2>
                    <Row>
                        <GoogleLogin
                            clientId='635404068668-v9fsah943gr8et7b9pu2arkem2irf630.apps.googleusercontent.com'
                            scope="https://www.googleapis.com/auth/calendar.events profile email"
                            responseType="access_token permission"
                            accessType="online"
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />

                        <GoogleLogout
                            buttonText="Logout"
                            onLogoutSuccess={this.logout}
                        >
                        </GoogleLogout>
                    </Row>
                    <h4>---------------------------------------------</h4>
                    <Row>
                        <h4>Get Events from Calendar = = > </h4> <Button color="warning" onClick={this.handleGetEvent}>Get Event</Button>
                    </Row>
                    <h4>---------------------------------------------</h4>
                    <Row>
                        <h4>Add Events in Calendar  = = = = = > </h4> <Button color="warning" onClick={this.handleInsertEvent}>Insert Event</Button>
                    </Row>
                    <h4>---------------------------------------------</h4>
                    <Row>
                        {/* <h4>Add Multiple Events in Calendar  = = = = = > </h4> <Button color="warning" onClick={this.handleInsertMultipleEvent}>Add Multiple Event</Button> */}
                    </Row>
                    <h4>---------------------------------------------</h4>
                    <Row>
                        <h4>Delete Events from Calendar  = = = = = > </h4> <Button color="warning" onClick={this.handleDeleteEvent}>Delete Event</Button>
                    </Row>
                    <h4>---------------------------------------------</h4>
                </div>

                <Container>
                    <Row>
                        <div className="col">
                            <Calendar
                                selectable
                                localizer={localizer}
                                popup
                                // defaultDate={new Date('Tue, 10 Jan 2017 17:33:00 UTC +00:00')}
                                defaultView='month'
                                events={this.state.events}
                                // step={60}
                                timeslots={4}
                                startAccessor='start'
                                endAccessor='end'
                                style={{ height: "80vh" }}
                                onSelectEvent={(eventinfo) => this.handleDeleteEvent(eventinfo)}
                                onSelectSlot={(slotinfo) => this.handleInsertEvent(slotinfo)}
                                onSelecting={this.handleInsertEvent}
                            />
                        </div>
                    </Row>
                </Container>

            </>
        );
    }
}

export default Event;