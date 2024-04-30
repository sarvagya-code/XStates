import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {

  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState , setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() =>{
    axios
    .get(`https://crio-location-selector.onrender.com/countries`)
    .then((res)=> setCountry(res.data))
    .catch((err)=> console.error("Can't fetch Countries."))
  },[]);

  useEffect(() =>{
    axios
    .get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
    .then((res)=> {
      setState(res.data);
      setSelectedState('');
      setCity([]);
      setSelectedCity('');
    })
    .catch((err)=> console.error("Can't fetch States."))
  },[selectedCountry]);

  useEffect(() =>{
    axios
    .get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
    .then((res)=> setCity(res.data))
    .catch((err)=> console.error("Can't fetch Cities."))
  },[selectedCountry, selectedState]);


  return (
    <div className="App">
      <div className="city-selector">
        <h1>Select Location</h1>
        <div className='dropdowns'>
          <select value ={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value="" disabled>
              Select Country
            </option>
            {country.map((c) => 
              <option key={c} value={c}>{c}</option>
            )}
          </select>
          <select value ={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="" disabled>
              Select State
            </option>
            {state.map((c) => 
              <option key={c} value={c}>{c}</option>
            )}
          </select>
          <select value ={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="" disabled>
              Select City
            </option>
            {city.map((c) => 
              <option key={c} value={c}>{c}</option>
            )}
          </select>
        </div>
        {selectedCity && (
          <h2> 
            You selected {selectedCity}, {selectedState}, {selectedCountry}
          </h2>
        )}
      </div>
    </div>
  );
}

export default App;
