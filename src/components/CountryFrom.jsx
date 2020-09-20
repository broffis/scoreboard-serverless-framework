import React, { useState } from 'react';

import axios from "../modules/axios";

import flags from "../data/flag-data.json";

const CountryForm = ({country, onComplete}) => {

  const[countryName, setCountryName] = useState("");
  const[countryFlag, setCountryFlag] = useState("");

  if (country !== undefined) {
    setCountryName(country.name)
    setCountryFlag(country.flag);
  }

  let flags_display = [];

  const isActiveFlag = (c) => {
    return country !== undefined && c.name === country.name
  }

  for (const [key, value] of Object.entries(flags)) {
    flags_display.push({ name: key, flag: value})
  }

  const sumbitCountryData = () => {
    const data ={
      name: countryName,
      flag: countryFlag
    }

    if (country !== undefined) {
      axios.post(`/countries/update/${country._id}`, data)
        .then(() => onComplete());
    } else {
      axios.post('/countries/add', data)
        .then(() => onComplete())
    }
  }

  return (
    <div className="country-form">
      <div className="country-form__input-container">
        <label className="country-form__input-label" htmlFor="country-name">* Name:</label>
        <input className="country-form__input" name="name" id="country-name" onChange={(e) => setCountryName(e.target.value)} value={countryName} />
      </div>

      <div className="country-form__input-container">
        <label className="country-form__input-label" htmlFor="country-flag">Flag: </label>
        <ul className="country-form__flag-select">
          { 
            country !== undefined &&
              <li className="country-form__single-flag --is-active">
                <img src={countryFlag} alt={`${countryName} flag`}/>
              </li>
          }
          { flags_display.sort(( a, b) => {
              if(a.name > b.name) return 1;
              if(a.name < b.name) return -1;
              return 0;
            })
            .map((flag, index) => <li key={`${flag.name}-flag-${index}`} className={`country-form__single-flag ${ isActiveFlag(flag) && '--is-active'}`} onClick={() => setCountryFlag(flag.flag)}><img src={flag.flag} alt={`${flag.name} flag`} /></li>) }
        </ul>
      </div>
      <button className="button --primary --centered u-margin-t-20" onClick={sumbitCountryData}>
        Submit
      </button>
    </div>
  )
}

export default CountryForm;