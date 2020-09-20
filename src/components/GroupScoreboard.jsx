import React, { useEffect, useState } from 'react';
import { useParams, Switch, Route, useRouteMatch } from 'react-router-dom';
import axios from "../modules/axios";

import {  aggregateScores} from "../modules/score-calculator";

import Scoreboard from './Scoreboard.jsx';
import Hero from './Hero.jsx';

const Group = (props) => {
  const { groupId } = useParams();
  let { path, url } = useRouteMatch();
  const [group, setGroup] = useState([]);
  const [groupScores, setGroupScores] = useState([]);
  const [events, setEvents] = useState([]);

  

  
  useEffect(() => {
    axios.get(`/groups/${groupId}`)
      .then(g => setGroup(g.data))
  }, [groupId]);

  useEffect(() => {
    axios.get(`/events/filter/byComp/${group.competition_id}`)
      .then(evts => setEvents(evts.data));
  }, [group.competition_id]);


  useEffect(() => {
    axios.get(`/scores/filter/byGroup/${groupId}`)
      .then(scores => {
        return aggregateScores(group.competition_id, scores.data, events);
      })
      .then(scores => setGroupScores(scores))
  }, [events, group.competition_id, groupId]);


  const eventHeader = events.sort((a,b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  });

  const eventTitles = eventHeader.map(event => event.event_name.replace(/\s/, '')).join('|');

  return (
    <Switch>
      <Route path={`${url}/:event(${eventTitles})`} exact component={() => <h1>Event page Not found</h1>} />
      <Route path={url} component={() => (
        <React.Fragment>
          <Hero heroText={group.group_name} heroImage={group.logo} bgColor={group.heroColor}/>
          <Scoreboard scores={groupScores} disableLinks={false} groupId={groupId} events={events}/>
        </React.Fragment>
      ) } />
    </Switch>
  );
}

export default Group;