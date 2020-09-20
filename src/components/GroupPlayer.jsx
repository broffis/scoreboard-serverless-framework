import React from 'react';

// import { groupData } from '../assets/dummy-data.json';

const GroupPlayer = (props) => {
  let boxStyles = {
    borderColor: props.border_color,
    backgroundColor: props.background_color
  };


  return (
    <div className="group-player group__grid">
      <div className="group-player__player-info" style={boxStyles}>
        <img src={`${window.location.origin}/${props.country_flag}`} alt={`Flag of ${props.country_name}`} />
        <p className="group-player__player-name font-secondary-semibold">{props.player_name}<span className="country-subtext italics font-secondary-light">{props.country_name}</span></p>
      </div>
      <p className="group-player__score-box u-justify-self-center font-secondary-semibold" style={boxStyles}><span className="group-player__score font-secondary-semibold">{props.total_points}</span></p>
      { props.event_scores.map(event => <p className="group-player__score-box u-justify-self-center font-secondary-semibold" key={`${props.player_id}-${event.event_name}`} style={boxStyles}><span className="group-player__score font-secondary-semibold">{event.points ? event.points : '-'}</span></p>)}
    </div>
  )
};

export default GroupPlayer;