import React, { useEffect, useState } from 'react';

import Hero from '../components/Hero';
import RosterPlayer from '../components/RosterPlayer';

import myAxios from '../modules/axios';
import axios from 'axios';

const Roster = () => {
  const [roster, setRoster] = useState([]);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        myAxios.get('/players', { cancelToken: source.token })
          .then(players => setRoster(players.data))
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
      }
    }
    loadData();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="roster">
      <Hero heroText="Roster"/>
      <div className="roster__header">
        <p className="roster__column roster__column--country font-secondary-semibold">Flag</p>
        <p className="roster__column roster__column--player font-secondary-semibold">Player<span className="country-subtext font-secondary-light">Country</span></p>
        <p className="roster__column roster__column--group font-secondary-semibold">Group</p>
      </div>
      { roster.map(player => <RosterPlayer key={`player-${player._id}`} {...player}/>)}
    </div>
  );
};


export default Roster;