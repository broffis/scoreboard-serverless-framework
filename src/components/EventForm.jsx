import React, { useState } from 'react';

import axios from "../modules/axios";

const EventForm = (props) => {
  const { event, onComplete } = props; 
  const [eventName, setEventName] = useState("");
  const [eventPoints, setEventPoints] = useState([]);

  if (event !== undefined) {
    setEventName(event.event_name);
    setEventPoints(event.available_points);
  }

  const updateEventPoints = (e) => {
    let inputPoints = e.split(" ");
    inputPoints = inputPoints.filter(input => input !== "");
    inputPoints = inputPoints.map(input => Number(input.replace(",", "")))

    setEventPoints(inputPoints)
  }

  const submitEventData = () => {
    const data = {
      event_name: eventName,
      available_points: eventPoints
    }

    if (event !== undefined) {
      axios.post(`/events/update/${event._id}`, data)
        .then(() => onComplete())
    } else {
      axios.post('/events/add', data)
        .then(() => onComplete())
    }
  }

  return (

    <div className="event-form">
      <div className="event-form__input-container">
        <label className="event-form__label" htmlFor="event-name">* Name</label>
        <input className="event-form__input" id="event-name" type="text" required defaultValue={eventName} onChange={(e) => setEventName(e.target.value)}/>
      </div>

      <div className="event-form__input-container">
        <label className="event-form__label" htmlFor="event-points">* Available Points</label>
        <input className="event-form__input" id="event-points" type="text" required onChange={(e) => updateEventPoints(e.target.value)}/>
      </div>

      <button className="button --primary --centered u-margin-t-20" onClick={submitEventData}>
        Submit
      </button>
    </div>
  );
}

export default EventForm