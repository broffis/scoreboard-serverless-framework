import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Backdrop from './Backdrop';
import Modal from './Modal';

import CountryForm from './CountryFrom';
import EventForm from './EventForm';
import PlayerForm from './PlayerForm';

const SideBarMenu = (props) => {
  let comp_name, groups_dropdown;
  const { groups } = props;
  const [modalType, setModalType] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (groups && groups.length >= 1) {
    groups_dropdown = groups.map(group => {
      return (
        <li className="side-bar-menu__sub-link" key={`group-single-select-${group._id}`}>
          <Link to={`/group/${group._id}`}>{group.group_name}</Link>
        </li>
      )
    })
  }

  if (props.competition && props.competition.name) {
    comp_name = props.competition.name;
  }

  const toggleModal = () =>  {
    const currentModalState = modalIsOpen;
    setModalIsOpen(!currentModalState);

    if (currentModalState) {
      setModalType('');
    }
  }

  const setModalData = (name) => {
    setModalType(name);
    toggleModal();
  }

  let modal_body;

  switch(modalType) {
    case "country":
      modal_body = <CountryForm onComplete={toggleModal}/>
      break;
    case "event":
      modal_body = <EventForm onComplete={toggleModal}/>
      break;
    case "player":
      modal_body = <PlayerForm competition={props.competition} groups={groups} onComplete={toggleModal}/>
      break;
    default:
      modal_body = "<p>Nothing selected</p>";
  }

  return (
    <React.Fragment>
      <Backdrop show={props.showMenu} clicked={props.close} />
      <Modal show={modalIsOpen} header={`Add ${modalType}`} modalClosed={toggleModal}>
        { modal_body }
      </Modal>
      <div className={`side-bar-menu ${ props.showMenu ? 'isVisible' : 'hidden'}`} onClick={props.close}>
        <div className="side-bar-menu__container">
          <span className="side-bar-menu__close-button" onClick={props.close}><img src={`${window.location.origin}/icons/close.svg`} alt=""/></span>
          <p className="side-bar-menu__competition-name">
            <Link to="/">{comp_name}</Link>
          </p>
          <ul className="side-bar-menu__links">
            <li className="side-bar-menu__link">
              <Link to="/scoreboard">Scoreboard</Link>
            </li>
            <li className="side-bar-menu__link">
              <Link to="/scoreboard">Seeding - Update Link</Link>
            </li>
            <li className="side-bar-menu__link">
              <Link to="/roster">Roster</Link>
            </li>
            <li className="side-bar-menu__link">
              <Link to="/scoreboard">Bracket - Update Link</Link>
            </li>
            <li className="side-bar-menu__link side-bar-menu__sub-links-btn">
              <Link to="/groups">Groups</Link>
              <ul className="side-bar-menu__sub-links">
                {
                  groups_dropdown
                }
              </ul>
            </li>
          </ul>
          <div className="side-bar-menu__add-items">
            <p className="side-bar-menu__add-item" onClick={() => setModalData("player")}>+ Add Player +</p>
            <p className="side-bar-menu__add-item" onClick={() => setModalData("event")}>+ Add Event +</p>
            <p className="side-bar-menu__add-item" onClick={() => setModalData("country")}>+ Add Country +</p>
          </div>
        </div>
      </div>
    </React.Fragment>
    
  ); 
}

export default SideBarMenu;