import React, { useState, useEffect } from 'react';

import axios from "../modules/axios";

const PlayerForm = (props) => {
  const {player, onComplete, groups, competition} = props;
  const [playerName, setPlayerName] = useState('');
  const [playerCountry, setPlayerCountry] = useState({ name: '', id: ''});
  const [playerGroup, setPlayerGroup] = useState({ name: '', id: ''});
  const [countries, setCountries] = useState([])

  useEffect(() =>  {
    axios.get('/countries')
      .then(countries => setCountries(countries.data))
  }, [])


  if (player !== undefined) {
    setPlayerName(player.name);

    let [playerCountry] = countries.filter(country => country._id === player.country_id);
    setPlayerCountry(playerCountry);

    let [playerGroup] = groups.filter(group => group._id === player.group_id);
    setPlayerGroup(playerGroup);
  }

  const updateName = (value) => {
    setPlayerName(value)
  }

  const updateCountry = (country_id) => {
    let [selectedCountry] = countries.filter(country => country._id === country_id);
    setPlayerCountry({ name: selectedCountry.name, id: selectedCountry._id})
  }

  const updateGroup = (group_id) => {
    let [selected_group] = groups.filter(group => group._id === group_id)
    setPlayerGroup({ name: selected_group.group_name, id: selected_group._id });
  }

  const submitPlayerData = () => {
    const data = {
      name: playerName,
      country_id: playerCountry.id,
      group_id: playerGroup.id,
      competition_id: "5f481e84691a987f93f9bfb0"
    };

    if (player !== undefined) {
      axios.post(`/players/update/${player._id}`, data)
        .then(() => onComplete());
    } else {
      axios.post('/players/add', data)
        .then(() => onComplete())
    }
  }


  return (
    <div className="player-form">
      <div className="player-form__input-container">
        <label className="player-form__input-label" htmlFor="player-name">* Name:</label>
        <input className="player-form__input" name="name" type="text" id="player-name" onChange={(e) => updateName(e.target.value)} value={playerName} />
      </div>

      <div className="player-form__input-container">
        <label className="player-form__input-label" htmlFor="player-country">* Country:</label>
        <select onChange={(e) => updateCountry(e.target.value)} className="player-form__input" name="country" id="player-country" defaultValue="">
          <option value="">Select a country</option>
          {
            countries.map(country => <option key={`country-${country.name}-${country._id}`} value={country._id}>{country.name}</option>)
          }
        </select>
      </div>

      <div className="player-form__input-container">
        <label className="player-form__input-label" htmlFor="player-group">* Group:</label>
        <select onChange={(e) => updateGroup(e.target.value)} className="player-form__input" name="group" id="player-group" defaultValue="">
          <option value="">Select a group</option>
          {
            groups.map(group => <option key={`group-${group.group_name}-${group._id}`} value={group._id}>{group.group_name}</option>)
          }
        </select>
      </div>

      <button className="button --primary --centered u-margin-t-20" onClick={submitPlayerData}>
        Submit
      </button>
    </div>
  );
}

export default PlayerForm;
