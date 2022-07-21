import "./Home.css";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import GoogleMapReact from "google-map-react";

import Image from "../../Images/location-pin.png";
import Cloudy from "../../Images/cloudy.png";
import Sunny from "../../Images/sunny.png";
import { useEffect, useCallback } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import { Second } from "../Secondbox/Second";
import { AddCity } from "../../Redux/actions";

// const cities = require("all-the-cities");
export const Home = () => {
  // AIzaSyDM2jKrhYnPsQ-dHg-g9cvjmd_vSRiF4Wg;
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geoloaction not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };
  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  let cities = [
    {
      name: "Andaman and Nicobar Islands",
      isoCode: "AN",
      countryCode: "IN",
      latitude: "11.74008670",
      longitude: "92.65864010",
    },
    {
      name: "Andhra Pradesh",
      isoCode: "AP",
      countryCode: "IN",
      latitude: "15.91289980",
      longitude: "79.73998750",
    },
    {
      name: "Arunachal Pradesh",
      isoCode: "AR",
      countryCode: "IN",
      latitude: "28.21799940",
      longitude: "94.72775280",
    },
    {
      name: "Assam",
      isoCode: "AS",
      countryCode: "IN",
      latitude: "26.20060430",
      longitude: "92.93757390",
    },
    {
      name: "Bihar",
      isoCode: "BR",
      countryCode: "IN",
      latitude: "25.09607420",
      longitude: "85.31311940",
    },
    {
      name: "Chandigarh",
      isoCode: "CH",
      countryCode: "IN",
      latitude: "30.73331480",
      longitude: "76.77941790",
    },
    {
      name: "Chhattisgarh",
      isoCode: "CT",
      countryCode: "IN",
      latitude: "21.27865670",
      longitude: "81.86614420",
    },
    {
      name: "Dadra and Nagar Haveli and Daman and Diu",
      isoCode: "DH",
      countryCode: "IN",
      latitude: "20.39737360",
      longitude: "72.83279910",
    },
    {
      name: "Delhi",
      isoCode: "DL",
      countryCode: "IN",
      latitude: "28.70405920",
      longitude: "77.10249020",
    },
    {
      name: "Goa",
      isoCode: "GA",
      countryCode: "IN",
      latitude: "15.29932650",
      longitude: "74.12399600",
    },
    {
      name: "Gujarat",
      isoCode: "GJ",
      countryCode: "IN",
      latitude: "22.25865200",
      longitude: "71.19238050",
    },
    {
      name: "Haryana",
      isoCode: "HR",
      countryCode: "IN",
      latitude: "29.05877570",
      longitude: "76.08560100",
    },
    {
      name: "Himachal Pradesh",
      isoCode: "HP",
      countryCode: "IN",
      latitude: "31.10482940",
      longitude: "77.17339010",
    },
    {
      name: "Jammu and Kashmir",
      isoCode: "JK",
      countryCode: "IN",
      latitude: "33.27783900",
      longitude: "75.34121790",
    },
    {
      name: "Jharkhand",
      isoCode: "JH",
      countryCode: "IN",
      latitude: "23.61018080",
      longitude: "85.27993540",
    },
    {
      name: "Karnataka",
      isoCode: "KA",
      countryCode: "IN",
      latitude: "15.31727750",
      longitude: "75.71388840",
    },
    {
      name: "Kerala",
      isoCode: "KL",
      countryCode: "IN",
      latitude: "10.85051590",
      longitude: "76.27108330",
    },
    {
      name: "Ladakh",
      isoCode: "LA",
      countryCode: "IN",
      latitude: "34.22684750",
      longitude: "77.56194190",
    },
    {
      name: "Lakshadweep",
      isoCode: "LD",
      countryCode: "IN",
      latitude: "10.32802650",
      longitude: "72.78463360",
    },
    {
      name: "Madhya Pradesh",
      isoCode: "MP",
      countryCode: "IN",
      latitude: "22.97342290",
      longitude: "78.65689420",
    },
    {
      name: "Maharashtra",
      isoCode: "MH",
      countryCode: "IN",
      latitude: "19.75147980",
      longitude: "75.71388840",
    },
    {
      name: "Manipur",
      isoCode: "MN",
      countryCode: "IN",
      latitude: "24.66371730",
      longitude: "93.90626880",
    },
    {
      name: "Meghalaya",
      isoCode: "ML",
      countryCode: "IN",
      latitude: "25.46703080",
      longitude: "91.36621600",
    },
    {
      name: "Mizoram",
      isoCode: "MZ",
      countryCode: "IN",
      latitude: "23.16454300",
      longitude: "92.93757390",
    },
    {
      name: "Nagaland",
      isoCode: "NL",
      countryCode: "IN",
      latitude: "26.15843540",
      longitude: "94.56244260",
    },
    {
      name: "Odisha",
      isoCode: "OR",
      countryCode: "IN",
      latitude: "20.95166580",
      longitude: "85.09852360",
    },
    {
      name: "Puducherry",
      isoCode: "PY",
      countryCode: "IN",
      latitude: "11.94159150",
      longitude: "79.80831330",
    },
    {
      name: "Punjab",
      isoCode: "PB",
      countryCode: "IN",
      latitude: null,
      longitude: null,
    },
    {
      name: "Rajasthan",
      isoCode: "RJ",
      countryCode: "IN",
      latitude: "27.02380360",
      longitude: "74.21793260",
    },
    {
      name: "Sikkim",
      isoCode: "SK",
      countryCode: "IN",
      latitude: "27.53297180",
      longitude: "88.51221780",
    },
    {
      name: "Tamil Nadu",
      isoCode: "TN",
      countryCode: "IN",
      latitude: "11.12712250",
      longitude: "78.65689420",
    },
    {
      name: "Telangana",
      isoCode: "TG",
      countryCode: "IN",
      latitude: "18.11243720",
      longitude: "79.01929970",
    },
    {
      name: "Tripura",
      isoCode: "TR",
      countryCode: "IN",
      latitude: "23.94084820",
      longitude: "91.98815270",
    },
    {
      name: "Uttar Pradesh",
      isoCode: "UP",
      countryCode: "IN",
      latitude: "26.84670880",
      longitude: "80.94615920",
    },
    {
      name: "Uttarakhand",
      isoCode: "UT",
      countryCode: "IN",
      latitude: "30.06675300",
      longitude: "79.01929970",
    },
    {
      name: "West Bengal",
      isoCode: "WB",
      countryCode: "IN",
      latitude: "22.98675690",
      longitude: "87.85497550",
    },
  ];

  console.log(cities, " ue hai cities");
  const handleChangee = (value) => {
    console.log(cities, " ye hai cities smjhe");
    if (value.length < 1) {
      setSuggestions([]);
      return;
    }
    let data = cities.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(data, " ye hai data");
    setSuggestions(data);
  };

  //

  const { cityname } = useSelector((state) => state.regState);

  const dispatch = useDispatch();
  let [track, setTrack] = useState(false);
  let [currenttemp, setCurrent] = useState("");
  let [pressure, setPressure] = useState("");
  let [humid, setHumid] = useState("");
  let [city, SetCity] = useState("pune");
  let [hourlyFor, SetHourly] = useState([]);
  let [data, SetData] = useState([]);
  let [sunset, SetSunset] = useState("");
  let [sunrise, SetSunrise] = useState("");
  let [lat, setLat] = useState("");
  let [lon, setLon] = useState("");
  let [count, setCount] = useState(0);
  let [clouds, setClouds] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setTrack(true);
    }, 3000);
    newData();
  }, []);

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

  const newData = async () => {
    let link;
    if (count == 0) {
      link =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        "delhi" +
        "&units=metric&appid=9102fcb602fc2c718391570e2dab5618";
      setCount(count + 1);
    } else {
      console.log(city, " dfdskfjsdkfjsiodfjsdiofjsdkfskdfdidfjdskfdskfdks");
      link =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city.toLowerCase() +
        "&units=metric&appid=9102fcb602fc2c718391570e2dab5618";
    }

    axios.get(link).then((response) => {
      console.log(response, " respooooooonse");
      console.log(response.data.coord.lat, " altttt ", response.data.coord.lon);
      setLat(response.data.coord.lat);
      setLon(response.data.coord.lon);
      dispatch(AddCity(city));
    });
    getData();
  };

  const getData = async () => {
    let link;

    console.log(lat, " lat ", lon, " lon");
    if (count == 0) {
      link =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        "28.6667" +
        "&lon=" +
        "77.2167" +
        "&exclude=minutely,alerts&units=metric&appid=9102fcb602fc2c718391570e2dab5618";
      setCount(count + 1);
    } else {
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
        let set = new Date(DailyForecast[i].sunset * 1000).toLocaleTimeString();

        DailyForecast[i].sunrise = rise.substring(0, 4);
        DailyForecast[i].sunset = set.substring(0, 4);
      });

      SetData(DailyForecast);

      setCurrent(DailyForecast[0].temp.max);
      console.log(DailyForecast[0], "DFdfdfd");
      setPressure(DailyForecast[0].pressure);
      setHumid(DailyForecast[0].humidity);

      SetSunrise(DailyForecast[0].sunrise);
      SetSunset(DailyForecast[0].sunset);

      let k = [];

      for (let i = 0; i < HourlyForecast.length; i++) {
        k.push(HourlyForecast[i].temp);
      }
      console.log(k, " k");
      SetHourly(k);
    });
  };
  console.log(hourlyFor, "dfdfd");
  console.log(data, " data");
  console.log(currenttemp, " cureent temp");
  const handleClick = () => {
    newData();
  };

  function doAction(val) {
    console.log(val, "val");
    SetCity(val);
    if (val.length < 1) {
      setSuggestions([]);
      return;
    }
    handleChangee(val);
  }

  function handleBtnClick(el) {
    document.getElementById("searchbox").value = el;
    SetCity(el);
    setSuggestions([]);
  }

  return (
    <div id="mainhome">
      {track == false ? (
        <div>.....loading</div>
      ) : (
        <div>
          <div id="box">
            <img src={Image} alt="" id="locsign" />

            <input
              type="text"
              placeholder="Enter something here..."
              onChange={(e) => {
                doAction(e.target.value);
              }}
              id="searchbox"
            />

            <button id="searchbtn" onClick={handleClick}>
              Search (Press 2 times)
            </button>
          </div>
          <div id="searchsuggestion">
            {suggestions.length > 0 && (
              <div className="autocomplete">
                {suggestions.map((el, i) => (
                  <div
                    key={i}
                    className="autocompleteItems"
                    onClick={() => {
                      handleBtnClick(el.name);
                    }}
                  >
                    <span>{el.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div id="latlan">
            <p>Current Location</p>
            <b style={{ "margin-top": "20px" }}>
              Lat:{" "}
              {location.loaded
                ? JSON.stringify(location.coordinates.lat)
                : "Not available"}
            </b>
            &nbsp;&nbsp;&nbsp;
            <b>
              Long:{" "}
              {location.loaded
                ? JSON.stringify(location.coordinates.lng)
                : "Not available"}
            </b>
          </div>
          ;
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
};
