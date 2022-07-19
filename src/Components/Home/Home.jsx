import "./Home.css"
import axios from "axios"
import Image from "../../Images/location-pin.png"
import Cloudy from "../../Images/cloudy.png"
import Sunny from "../../Images/sunny.png"
import { useEffect, useCallback } from "react";
import { useState } from "react"
import Chart from "react-apexcharts";
import { Second } from "../Secondbox/Second"
import { AddCity } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { State } from "country-state-city";
// const cities = require("all-the-cities");
export const Home = ()=>{
    const [suggestions, setSuggestions] = useState("");

    let cities = State.getStatesOfCountry("IN");
        const debounce = (func) => {
          let timer;
          return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
              timer = null;
              func.apply(context, args);
            }, 500);
          };
        };
             const handleChangee = (value) => {
              console.log(cities, " ye hai cities smjhe")
              if (value.length < 1){
                setSuggestions([]);
                return
              };
let data =   cities.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
console.log(data, " ye hai data")                 
setSuggestions(data)
             };

      const optimizedFn = useCallback(debounce(handleChangee), []);
  

 
const { cityname } = useSelector((state) => state.regState);

const dispatch = useDispatch();
  let [track, setTrack] = useState(false)
  let [currenttemp, setCurrent] = useState("");
  let [pressure, setPressure] = useState("")
  let [humid, setHumid] = useState("")
let [city, SetCity] = useState("pune")
let [hourlyFor, SetHourly] = useState([])
let [data, SetData] = useState([])
let [sunset, SetSunset] = useState("")
let [sunrise, SetSunrise] = useState("");
let [lat, setLat] = useState("");
let [lon, setLon] = useState("");
let [count, setCount] = useState(0) ;
let [clouds, setClouds] = useState(0);
useEffect(()=>{
   setTimeout(()=>{
    setTrack(true)
   }, 3000)
    newData();
},[])

const chartData = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: hourlyFor,
    },
  },

  series: [
    {
      name: "series-1",
      data: [0, 10, 20, 30, 40, 50],
    },
  ],
};

const newData = async ()=>{
  let link
  if (count == 0){
 link =
   "https://api.openweathermap.org/data/2.5/weather?q=" +
   "delhi" +
   "&units=metric&appid=9102fcb602fc2c718391570e2dab5618";
  setCount(count + 1)
  }else {
     link =
       "https://api.openweathermap.org/data/2.5/weather?q=" +
       city.toLowerCase() +
       "&units=metric&appid=9102fcb602fc2c718391570e2dab5618";

  }

 axios.get(link).then((response) => {
  console.log(response, " respooooooonse")
  console.log(response.data.coord.lat, " altttt ", response.data.coord.lon);
  setLat(response.data.coord.lat)
  setLon(response.data.coord.lon)
    dispatch(AddCity(city));
 });
 getData()
}

const getData =async ()=>{
  let link

  console.log(lat, " lat ", lon, " lon")
      if (count == 0){
   link =
     "https://api.openweathermap.org/data/2.5/onecall?lat=" +
     "28.6667" +
     "&lon=" +
     "77.2167" +
     "&exclude=minutely,alerts&units=metric&appid=9102fcb602fc2c718391570e2dab5618";
     setCount(count+1)
      }else {
  link =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,alerts&units=metric&appid=9102fcb602fc2c718391570e2dab5618";
   
      }
         axios.get(link).then((response) => {
        let DailyForecast = response.data.daily;
        let HourlyForecast = response.data.hourly;

        //Data Formatting- Changing the temp and date as required by UI

        DailyForecast.forEach((el, i) => {
          let date = new Date(el.dt * 1000).toDateString();

          DailyForecast[i].day = date.substring(0, 3);
          DailyForecast[i].temp.max = el.temp.max.toPrecision(2);
          DailyForecast[i].temp.min = el.temp.min.toPrecision(2);

          let rise = new Date(
            DailyForecast[i].sunrise * 1000
          ).toLocaleTimeString();
          let set = new Date(
            DailyForecast[i].sunset * 1000
          ).toLocaleTimeString();

          DailyForecast[i].sunrise = rise.substring(0, 4);
          DailyForecast[i].sunset = set.substring(0, 4);
        });

        SetData( DailyForecast);
        
              setCurrent(DailyForecast[0].temp.max);
        console.log(DailyForecast[0], "DFdfdfd");
        setPressure(DailyForecast[0].pressure)
        setHumid(DailyForecast[0].humidity)

        SetSunrise(DailyForecast[0].sunrise);
        SetSunset(DailyForecast[0].sunset)

        let k = []

        for (let i = 0; i < HourlyForecast.length; i++){
          k.push(HourlyForecast[i].temp)
        }
        console.log(k, " k")
SetHourly(k)

      });
  
}
console.log(hourlyFor, "dfdfd")
console.log(data, " data")
console.log(currenttemp, " cureent temp")
const handleClick = ()=>{
 
    newData();
  
}

function doAction(val){
 SetCity(val);
 optimizedFn(val);
}

function handleBtnClick(el){
  document.getElementById("searchbox").value=el.name
}
  return (
    <div id="mainhome">
      {track == false ? (
        <div>.....loading</div>
      ) : (
        <div>
          <div id="box">
            <img src={Image} alt="" id="locsign" />
            {/* <input
              type="text"
              className="search"
              placeholder="Enter something here..."
              onChange={(e) => optimizedFn(e.target.value)}
            /> */}

            <input
              type="text"
              placeholder="Enter something here..."
              onChange={(e) => {
                doAction(e.target.value);
              }}
              id="searchbox"
            />

            <button id="searchbtn" onClick={handleClick}>
              Search
            </button>
          </div>
          <div id="searchsuggestion">
            {suggestions.length > 0 && (
              <div className="autocomplete">
                {suggestions.map((el, i) => (
                  <div key={i} className="autocompleteItems" onClick={()=>{
                    handleBtnClick(el)
                  }}>
                    <span>{el.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div id="secondbox">
            <Second
              data={data}
              Cloudy={Cloudy}
              Sunny={Sunny}
              setCurrent={setCurrent}
              setClouds={setClouds}
            />
          </div>
          <div id="thirdbox">
            <div className="graphbox">
              <b>{currenttemp}° C</b>
              <img
                className="newimgsetting"
                src={clouds >= 50 ? Cloudy : Sunny}
                alt=""
              />
            </div>

            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              width="100%"
            />
          </div>
          <div className="fourthbox">
            <div className="pressure">
              <b>Pressure</b>
              <br />
              <p>{pressure} hpa</p>
            </div>
            <div className="pressure">
              <b>Humidity</b>
              <br />
              <p>{humid}%</p>
            </div>
          </div>
          <div id="fifthbox">
            <div id="firbox">
              <b>Sunrise</b>
              <br />
              <p>{sunrise} am</p>
            </div>
            <div id="secbox">
              <b>Sunset</b>
              <br />
              <p>{sunset} pm</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}