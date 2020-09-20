import React, { useState, useEffect } from 'react';
import axios from '../modules/axios';

import GroupBanner from '../components/GroupBanner';

const Groups = (props) => {
  const { competition_id } = props;

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get(`/groups/filter/byComp/${competition_id}`)
    .then(groups => setGroups(groups.data))
  }, [competition_id])


  return (
    <section>
      { groups.map(group => <GroupBanner key={`${group.group_name}-${competition_id}`} competition_id={competition_id} {...group}/>) }
    </section>
    
  );
}

export default Groups;
