import React from 'react';
import axios from "../modules/axios";
import { useState } from 'react';


const EventUpdate = (props) => {
  const [scores, setScores] = useState(props.scores);

  const updatePlayerScore = (player_id, event) => {
    const abstracted_scores = scores;

    const [single_player] = abstracted_scores.filter(score => score.player_id === player_id);
    const single_player_index = abstracted_scores.indexOf(single_player);
    single_player.score.points = Number(event.target.value);
    abstracted_scores[single_player_index] = single_player;
    setScores(abstracted_scores);
  }

  const sendUpdatedScores = () => {
    scores.forEach(score => {
      if (score.score.score_id) {
        axios.post(`/scores/update/${score.score.score_id}`, score)
      } else {
        axios.post(`/scores/add`, score)
      }
    })
    props.close();
  }

  return (
    <div className="event-update">
      <div className="event-update__header">
        <p className="event-update__header-label-player">Player</p>
        <p className="event-update__header-label-score">Score</p>
      </div>
      <ul className="event-update__players">
        {
          scores.map(playerScore => (
            <li key={`${props.event.event_name.replace(/\s/, '-')}-${playerScore.player_id}`} className="event-update__player-row">
              <span className="event-update__player-name">{playerScore.player_name}</span>
              <span className="event-update__player-score">{playerScore.score.points}</span>
              <select name="points" value={playerScore.score.points} onChange={(e) => updatePlayerScore(playerScore.player_id, e)}>
              { props.event.available_points.map(pts => <option value={pts} key={`${props.event.event_name}-available-points-${pts}`}>{pts}</option>) }
              </select>
            </li>
          ))
        }
      </ul>
      <button className="button --primary --centered" onClick={sendUpdatedScores}>
        Update Scores
      </button>
    </div>
  );
};

export default EventUpdate;