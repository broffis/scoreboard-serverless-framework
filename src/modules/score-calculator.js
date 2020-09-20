export const aggregateScores = (competition_id, scores, events) => {
  // Reduces returned scores by player
  let filtered_players = scores.reduce((acc, current) => {
    const x = acc.find(item => item.player_id === current.player_id);
    if (!x) {
      return acc.concat([{
        player_id: current.player_id,
        player_name: current.player_name,
        country_name: current.country_name,
        country_flag: current.country_flag,
        group_id: current.group_id,
        event_scores: [],
        background_color: current.background_color,
        border_color: current.border_color
      }]);
    } else {
      return acc
    }
  }, [])

  // Aggregate scores by player
  scores.forEach(score => {
    let [scoring_player] = filtered_players.filter(player => player.player_id === score.player_id);
    let scoring_player_index = filtered_players.indexOf(scoring_player);

    filtered_players[scoring_player_index].event_scores.push({
      score_id: `${score._id}`,
      competition_id: score.competition_id,
      event_name: score.event_name,
      points: score.points,
      event_id: score.event_id
    })
  })

  // Add 0s for missing events
  filtered_players.forEach(player => {
    const event_scores = events.map(e => {
      let [player_score] = player.event_scores.filter(ps => ps.event_id === `${e._id}`);
      let player_score_index = player.event_scores.indexOf(player_score);


      let new_score = {
        score_id: null,
        event_id: e._id,
        event_name: e.event_name,
        points: 0,
        competition_id: competition_id
      }

      if (player_score_index >= 0) {
        new_score.points = player.event_scores[player_score_index].points;
        new_score.score_id = player.event_scores[player_score_index].score_id;
        new_score.competition_id = player.event_scores[player_score_index].competition_id;
      }

      return new_score
    });


    player.event_scores = event_scores.sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });
  });

  return filtered_players
};

export const calculate_and_sort = (scores, filter) => {
  let all_scores = scores.map(player => {
    let pointTotal = 0;

    player.event_scores.forEach(score => {
      pointTotal += score.points;
    });

    return {
      total_points: pointTotal,
      ...player
    }
  })
  .sort((a, b) => {
    if (a.total_points > b.total_points) return -1;
    if (a.total_points < b.total_points) return 1;
    return 0;
  });

  // if (filter >= 1) {
  //   all_scores = all_scores.slice(0, filter);
  // }

  return all_scores;
}

export default {
  aggregateScores,
  calculate_and_sort
};