import React, { useState, useEffect } from 'react';

import axios from '../modules/axios';
import { aggregateScores, calculate_and_sort } from '../modules/score-calculator';


const GroupBanner = (props) => {
  const [scores, setScores] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`/events/filter/byComp/${props.competition_id}`)
      .then(evts => setEvents(evts.data));
  }, [props.competition_id]);

  useEffect(() => {
    axios.get(`/scores/filter/byGroup/${props._id}`)
      .then(s => {
        return aggregateScores(props.competition_id, s.data, events);
      })
      .then(s => {
        return calculate_and_sort(s);
      })
      .then(s => setScores(s))
  }, [events, props._id, props.competition_id, props.groupId]);

  let display = <h3>No current leader</h3>

  if (scores && scores.length >= 0) {
    display = <img className="group-banner__leader-flag" src={scores[0].country_flag} alt={`${scores[0].country_name}`}/>
  }

  const heroColor = props.heroColor ? props.heroColor : '#55789b';


  return (
    <article className="group-banner" style={{backgroundColor: `${heroColor}`}}>
      <img onClick={() => window.location.href = `/group/${props._id}` } className="group-banner__logo" src={props.logo} alt={`${props.group_name} Logo`} />
      <a className="group-banner__name" href={`/group/${props._id}`} style={{ textShadow: `-1px 0 ${heroColor}, 0 1px ${heroColor}, 1px 0 ${heroColor}, 0 -1px ${heroColor}`}}>{props.group_name}</a>
      { display }
    </article>
  );
}

export default GroupBanner;
