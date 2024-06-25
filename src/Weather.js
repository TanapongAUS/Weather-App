import React, { useState, useEffect} from 'react';
import './Weather.css'

// Pictures
import cleard from './pictures/1.png';
import clearn from './pictures/2.png';
import fcloudd from './pictures/3.png';
import fcloudn from './pictures/4.png';
import scloud from './pictures/5.png';
import bcloud from './pictures/6.png';
import srain from './pictures/7.png';
import raind from './pictures/8.png';
import rainn from './pictures/9.png';
import storm from './pictures/10.png';
import snow from './pictures/11.png';
import mist from './pictures/12.png';
import wind from './pictures/wind.png';
import humidity from './pictures/humidity.png';

const apiWeather = {
  key: '',
  url: 'https://api.openweathermap.org/data/2.5/' 
}

const apiMap = {
  key: '',
  url: 'https://www.google.com/maps/embed/v1/place?'
}

function App() {
  //Initiate of useEffect
  //@param: location, weather, mapSRC
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');
  let mapSrc;
  if (location === '') { 
    mapSrc = `${apiMap.url}key=${apiMap.key}&q=Adelaide, AU`;
  } else {
    mapSrc = `${apiMap.url}key=${apiMap.key}&q=${location}`;
  }

  //Changing map from specified address
  //@param: location
  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };
  //==========+++++==========

  //Weather check
  //@param: location (city)
  useEffect(() => {
    const firstFetchWeather = () => {
      fetch(`${apiWeather.url}weather?q=Adelaide,AU&units=metric&appid=${apiWeather.key}`)
      .then(res => res.json())
      .then((result) => {setWeather(result);})
    };

    firstFetchWeather();
  }, []);

  const searchCity = () => {
    fetch(`${apiWeather.url}weather?q=${location}&units=metric&appid=${apiWeather.key}`)
    .then(res => res.json())
    .then((result) => {setWeather(result);})
  }
  //==========+++++==========

  return (
    <div className={typeof weather.main === "undefined" ? ("UnidentifiedPage") 
      : (weather.weather[0].icon.charAt(2) === 'd' ? "fullPageDay" : "fullPageNight")}>
      
      <div className="row m-2">
        <p className="col-12 // text-light text-center // fs-1 fst-italic fw-bold">Weather Check App</p>

        <div className="rounded-4 // align-items-center justify-content-center // mt-2 p-2 // col-lg-4 col-md-4 col-sm-12 // ms-lg-3 ms-md-3 // text-center" style={{ backgroundColor: 'rgba(26,26,26, 0.85)' }}>
          <label className="form-label text-light fw-bold">Location:&nbsp;</label>
          <input className="rounded-3" id="location" type="text" value={location} onChange={handleInputChange} placeholder="Enter the location" />

          <button className="submit btn rounded-4 ms-2 d-inline-flex text-light" onClick={searchCity}>Check</button>

          {typeof weather.main === "undefined" ? (
              <div className="text-light">
                <p className="fs-2 fw-bold">Cannot find the location, please search again.</p>
              </div>
            ) : (
              <div className="text-light">
                <p className="fs-2 fst-italic"><b>{weather.name}</b></p>
                <img  src={ weather.weather[0].icon === '01d' ? cleard : weather.weather[0].icon === '01n' ? clearn : 
                            weather.weather[0].icon === '02d' ? fcloudd : weather.weather[0].icon === '02n' ? fcloudn :
                            weather.weather[0].icon === '03d' ? scloud : weather.weather[0].icon === '03n' ? scloud :
                            weather.weather[0].icon === '04d' ? bcloud : weather.weather[0].icon === '04n' ? bcloud :
                            weather.weather[0].icon === '09d' ? srain : weather.weather[0].icon === '09n' ? srain :
                            weather.weather[0].icon === '10d' ? raind : weather.weather[0].icon === '10n' ? rainn :
                            weather.weather[0].icon === '11d' ? storm : weather.weather[0].icon === '111' ? storm :
                            weather.weather[0].icon === '13d' ? snow : weather.weather[0].icon === '13n' ? snow :
                            weather.weather[0].icon === '50d' ? mist : weather.weather[0].icon === '50n' ? mist : cleard
                          } 
                      alt=''/>
                <p className="fs-4 fw-bold"><b>{weather.weather[0].main}</b></p>
                <p className="fs-4 fw-bold"><b>{weather.main.temp} °C</b></p>
                
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Humidity</th>
                      <th scope="col">Wind</th>
                    </tr>
                  </thead>
                    <tr>
                      <td><img src={humidity} alt=''/> <b>{weather.main.humidity} %</b></td>
                      <td><img src={wind} alt=''/> <b>{weather.wind.speed} Km/h</b></td>
                    </tr>
                  <tbody>


                  </tbody>
                </table>
              </div>
            )
          }
        </div>
        
        <div className="rounded-4 // d-flex align-items-center justify-content-center // col-lg-7 col-md-7 col-sm-12 // ms-lg-3 ms-md-2 // mt-2" style={{ backgroundColor: 'rgba(26,26,26, 0.85)' }}>
          <iframe className="image"
            // width= "800"
            // height= "800"
            // style= {{ border: 0 }}
            loading= "lazy"
            allowFullScreen
            referrerPolicy= "no-referrer-when-downgrade"
            src = {mapSrc}
            title= "Google Maps"
          />
        </div>
      </div>


    </div>
  );
}

export default App;