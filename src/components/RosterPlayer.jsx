import React from 'react';
import { Link } from 'react-router-dom';

// import { groupData } from '../assets/dummy-data.json';

const Player = (props) => {
  let boxStyles = {
    borderColor: props.border_color,
    backgroundColor: props.background_color
  };

  return (
    <div className="roster__player" style={boxStyles}>
      <img className="roster__column--country" src={props.country_flag} alt={`Flag of ${props.country_name}`} />
      <p className="roster__column--player player-name font-secondary-semibold">{props.name} <span className="country-subtext font-secondary-light">{props.country_name}</span></p>
      <Link className="roster__column--group roster__column--link font-secondary-semibold" to={`/group/${props.group_id}`}>{props.group_name}</Link>
    </div>
  );
};

export default Player;