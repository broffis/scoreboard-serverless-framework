import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { calculate_and_sort } from '../modules/score-calculator';

import GroupPlayer from './GroupPlayer';
import Modal from './Modal';
import EventUpdate from './EventUpdate';

const Scoreboard = (props) => {
  const [activeEventData, setActiveEventData] = useState();
  const [showModal, setShowModal] = useState(false);
  let boxStyles = {};

  const eventHeader = props.events.sort((a,b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  })

  const playerScores = props.scores !== undefined ? calculate_and_sort(props.scores) : [];

  const openEventModal = (eventId) => {
    let groupEventData = props.scores.map(player => {
      const [playerScore] = player.event_scores.filter(event => event.event_id === eventId);

      return {
        player_name: player.player_name,
        player_id: player.player_id,
        group_id: player.group_id,
        score: playerScore
      }
    });

    let [eventInfo] = props.events.filter(event => event._id === eventId);

    setActiveEventData({
      event: eventInfo,
      scores: groupEventData
    });

    setShowModal(true);
  };

  const toggleModal = () => {
    const modalIsOpen = showModal;
    setShowModal(!modalIsOpen);
  }

  return (
    <div className="group">
      {
        activeEventData ?
        
          <Modal
            show={showModal}
            modalClosed={toggleModal}
            header={activeEventData ? activeEventData.event.name : ''}
          >
            <EventUpdate {...activeEventData} close={toggleModal}/>
          </Modal> :
          null
      }

      <div className="scoreboard">
        <div className="group__grid group__grid-headers">
          { props.disableLinks ? <p className="group__grid-header group__grid-header--sticky" style={boxStyles}>Player</p> : <Link to="/roster" className="group__grid-header group__grid-header--sticky" style={boxStyles}>Player</Link> }
          { props.disableLinks ? <p className="group__grid-header group__grid-header--scroll u-justify-content-center" style={boxStyles}>Total</p> : <Link to="/scoreboard" className="group__grid-header group__grid-header--scroll u-justify-content-center" style={boxStyles}>Total</Link>}

          { eventHeader.map(event => props.disableLinks ? 
              <p className="group__grid-header group__grid-header--scroll u-justify-content-center" key={`event-${event._id}`} style={boxStyles}>{event.event_name}</p> :
              <p className="group__grid-header group__grid-header--scroll u-justify-content-center" onClick={() => openEventModal(event._id)} key={`event-${event._id}`} style={boxStyles}>{event.event_name}</p>
            )}
        </div>
        <div>
          { playerScores.map(player => <GroupPlayer key={`group-${player.group_id}-player-${player.player_id}`} {...player}/>)}
        </div>
      </div>
    </div>
  );
}

export default Scoreboard;