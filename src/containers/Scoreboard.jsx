import React, { useState, useEffect } from 'react';
import axios from '../modules/axios';

import Scoreboard from '../components/Scoreboard';
import Hero from '../components/Hero';

import { aggregateScores } from "../modules/score-calculator";

const FullScoreboard = (props) => {
  const {competition_id, events} = props;

  const [activeTab, setActiveTab] = useState('scoreboard');
  const [scores, setScores] = useState();
  const tabs = [
    {
      label: 'Scoreboard',
      value: 'scoreboard'
    },
    {
      label: 'Seeding',
      value: 'seeding'
    }
  ];

  useEffect(() => {
    if(events !== undefined) {
      axios.get(`/scores/filter/byComp/${competition_id}`)
      .then(s => {
        return aggregateScores(competition_id, s.data, events);
      })
      .then(s => setScores(s));
    }

    
  }, [competition_id, events])

  let display = <h2>Nothing selected</h2>;

  switch(activeTab) {
    case 'scoreboard':
      display = <Scoreboard scores={scores} disableLinks events={events}/>;
      break;
    case 'seeding':
      display = <h2>Seeding selected</h2>
      break;
    default:
  };

  return (
    <div>
      <Hero heroText="Scoreboard"/>      
      <ul className="scoreboard__buttons">
        { tabs.map(tab =><li key={`scoreboard_tabs--${tab.value}`} className={`scoreboard__button ${ tab.value === activeTab ? '--is-active' : ''}`} onClick={() => setActiveTab(tab.value)}>{tab.label}</li>)}
      </ul>
      {
        display
      }
      
    </div>
  );
}

export default FullScoreboard;