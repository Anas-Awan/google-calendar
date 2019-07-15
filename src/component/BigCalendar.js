import request from 'superagent';

const calendarId = 'em92gos3b78c1reguio5mks45c@group.calendar.google.com';
const YOUR_API_KEY = 'AIzaSyDUdWXOvgTuJYuNvD6gP1DF3Nna6xwzBe0';
let url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${YOUR_API_KEY}`;

export function getEvents (callback) {
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        // console.log("events", resp.text);
        JSON.parse(resp.text).items.forEach((event) => {
          events.push({
            start: new Date(event.start.dateTime),
            end: new Date(event.end.dateTime),
            title: event.summary,
            id: event.id
            // resource: calendarUsers
          })
        })
      return  callback(events)
      }
    })
}