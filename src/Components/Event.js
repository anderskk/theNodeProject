import React from 'react';

/* Todo: this is not very useful now, suggestions to improvements as an exercise
  2. render useful information about the event
  3. are you e.g. registered to this event?
  4. if you are an admin to this event, maybe you should be able to modify it, too?
  5. later (redux exercise) - fetch event with eventId
 */
class Event extends React.Component {
  render() {
    const { eventId } = this.props.params;

    return (
      <div>You are viewing an event with id {eventId}!</div>
    )
  }
}

export default Event;