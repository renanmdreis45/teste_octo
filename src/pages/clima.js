import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/clima.css';
import celsius from 'kelvin-to-celsius'
import clima from "../../src/assets/weather.png"



export default function Clima() {
  const [location, setLocation] = useState(false);
  const [description, setDescription] = useState(false);
  const [weather, setWeather] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(false);

   //solicitando a localização do usuário
   useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
        setLocation(true);
    })
  }, [])
  
  let getWeather = async (lat, lon) => {
   try {
    let response = await axios({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
          lat: lat,
          lon: lon,
          lang: 'pt',
          mode: 'json',
          appid: '5855b49050773c5a2ddc7094563be691'
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });
    setDescription(response.data.weather[0].description);
    setWeather(response.data.main)
   } catch(error) {
     console.log(error);
     setError(true);
     setLoading(false);
   }
  }

  //solicitando a localização do usuário
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
    })
  }, [])


    return (
    <>
      <div className="w-full max-w-2xl m-auto bg-blue-dark">
        <h1 className="text-white desktop:text-6xl mr-3 my-4 mb-0 pt-5 mobile:text-4xl font-bold ">Weather App</h1>
        {
          !loading && !error &&  (
            <section className="p-3 mobile:-p-4 desktop:p-5 rounded-md bg-blue-dark">
              <div className="desktop:flex desktop:justify-between my-5">
                <div className="desktop:flex-grow desktop:basis-0">
                  <div className="p-3 rounded-md bg-gray-light">
                    <div className="mb-8 mt-4 grid grid-cols-2 "> 
                      <div className="py-2 px-2 col-span-1 grow"> <img src={clima} height="100%" width="75%" alt=""/> </div>
                      <div className="py-2 px-2 col-span-1 grow desktop:mt-16 mobile:mt-12"> <strong className="desktop:text-6xl text-black-700 mobile:text-5xl"> {celsius(parseInt(weather.temp))} ºC </strong> </div>
                    </div>
                    <ul className="grid grid-rows-4">
                      <li className="text-black-700 row-span-1 leading-7 font-bold my-3">
                        <strong>Descrição: </strong> {description}
                      </li>
                      <li className="text-black-700 row-span-1 leading-7 font-bold my-3">
                        <strong>Sensação térmica: </strong> {celsius(parseInt(weather.feels_like))} ºC  
                      </li>
                      <li className="text-black-700 row-span-1 leading-7 font-bold my-3">
                        <strong>Temperatura máxima: </strong> {celsius(parseInt(weather.temp_max))} ºC
                      </li>
                      <li className="text-black-700 row-span-1 leading-7 font-bold my-3">
                      <strong>Temperatura mínima: </strong> {celsius(parseInt(weather.temp_min))} ºC
                      </li>
                      <li className="text-black-700 row-span-1 leading-7 font-bold my-3">
                      <strong>Umidade: </strong> {weather.humidity} %
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )
        }
  
        {
          !loading && error && (
            <div className="text-gray-dark text-center text-2xl font-bold break-words my-20">No Result</div>
          )
        }
  
        {
          !loading && error && (
            <div className="text-gray-dark text-center my-20">
              <div className="flex items-center justify-center">
                <span className="bouncing-animation w-4 h-4block my-8 mx-1 bg-gray-dark rounded-full" />
                <span className="bouncing-animation bouncing-animation_delay-2 w-4 h-4 block tw-my-8 tw-mx-1 bg-gray-dark rounded-full" />
                <span className="bouncing-animation bouncing-animation_delay-4 w-4 h-4 block tw-my-8 tw-mx-1 bg-gray-dark rounded-full" />
              </div>
              <div className="text-2xl font-bold break-words">Carregando...</div>
            </div>
          )
        }
      </div>
    </>
    );
            
}