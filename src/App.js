import React, { useEffect, useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import axios from './modules/axios';

// import './assets/style/all.scss';
import './style/all.scss';

import Roster from './containers/Roster';
import Group from './components/GroupScoreboard';
import Groups from './containers/Groups';
import FullScoreboard from './containers/Scoreboard';
import SidebarMenu from './components/SideBarMenu';

function App() {
  const competitionId = "5f481e84691a987f93f9bfb0";
  const [competition, setCompetition] = useState();
  const [showSideBarMenu, toggleShowSideBarMenu] = useState(false);
  const [groups, setGroups] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`/groups/filter/byComp/${competitionId}`)
      .then(groups => setGroups(groups.data))

    axios.get(`/comps/${competitionId}`)
      .then(comps => setCompetition(comps.data))

      axios.get(`/events/filter/byComp/${competitionId}`)
      .then(evts => setEvents(evts.data))
  }, [competitionId]);

  

  let competitionName = '';

  if (competition && competition.name) {
    competitionName = competition.name
  }

  return (
    <div className={`App ${showSideBarMenu && 'side-bar-open'}`}>
      <nav className="nav-bar">
        <ul className="nav">
          <div className="hamburger-container" onClick={() => toggleShowSideBarMenu(!showSideBarMenu)} >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <li className="nav__link nav__link--text">
            <Link to="/scoreboard">{competitionName}</Link>
          </li>
        </ul>
      </nav>
      <SidebarMenu competition={competition} groups={groups} showMenu={showSideBarMenu} close={() => toggleShowSideBarMenu(!showSideBarMenu)}/>
      <Switch>
        <Route path="/scoreboard/" component={() => <FullScoreboard competition_id={competitionId} events={events}/>}/>
        <Route path="/roster/" component={Roster} />
        <Route path="/groups/" exact component={() => <Groups competition_id={competitionId}/>}/>
        <Route path="/group/:groupId" component={Group}/>
        <Route path="/"  exact component={() => <FullScoreboard competition_id={competitionId} events={events}/> }/>
        <Route render={() => <h1>Home Page Not Found</h1>}/>
      </Switch>
    </div>
  );
}

export default App;
