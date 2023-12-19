import React, { useEffect, useState } from "react";
import EnvTemperature from "../../assets/Env-Temperature.png";
import EnvHumidity from "../../assets/Env-Humidity.png";
import EnvData from "../../assets/EnvData-removebg.png";
import WindSpeed from "../../assets/WindSpeed-removebg.png";
import "./HeadlineForm.css";
//import { I18n } from "i18n-js";
//import * as I18n from "i18n-js";

//import HorizontalScroll from "react-scroll-horizontal";
//import Loginpage from "./Loginpage.css";
//import ScrollArea from "react-scrollbar";
//import { Scrollbars } from "react-custom-scrollbars";
//import Loginpage from "../login/Loginpage";
//import { translate } from "i18n-js";

export default function EnvTabData(props) {
  const [selectedDay, setSelectedDay] = useState("7");
  const [forecast, setForecast] = useState(null);
  const [twentyfourHrsData, setTwentyfourHrsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const openWeatherKey = `d594628e86460018f41bb0299ef7afa9`;
  let url = `https://api.openweathermap.org/data/2.5/onecall?&appid=${openWeatherKey}&units=metric`;

  const loadForecast = async (days) => {
    setRefreshing(true);

    try {
      const getLocation = async () => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      };
      const location = await getLocation();

      let response, address;
      if (props.lat && props.long) {
        response = await fetch(`${url}&lat=${props.lat}&lon=${props.long}`);
      } else {
        response = await fetch(
          `${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
        );
      }
      const data = await response.json();

      const currentTime = Math.floor(Date.now() / 1000);
      const nextTwentyFourHours = currentTime + 24 * 60 * 60;

      if (days === "24") {
        let result = data.hourly.filter((obj) => obj.dt < nextTwentyFourHours);
        console.log("Twenty-four hour data:", result);
        setTwentyfourHrsData(result);
      }

      if (!response.ok) {
        window.alert(`Error retrieving weather data: ${data.message}`);
      } else {
        setForecast(data);
      }
    } catch (error) {
      console.error("Error loading forecast:", error);
    }

    setRefreshing(false);
  };
  const time = (date) => {
    let hour = date.getHours();
    let h = hour % 12 || 12;
    let ampm = hour < 12 || date === 24 ? "AM" : "PM";
    hour = h + ampm;
    return hour;
  };
  function day(date) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = date.getDay();
    return `${days[day]}`;
  }
  function myDate(date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = date.getMonth();
    let mDay = date.getDate();
    return `${mDay} ${months[month]}`;
  }
  useEffect(() => {
    loadForecast("7");
  }, []);

  const onClickDaysTab = (days) => {
    setSelectedDay(days);

    if (days === "7") {
      loadForecast(days);
    } else if (days === "24") {
      // Load 24-hour data
      setTwentyfourHrsData([]);
      const nextTwentyFourHours = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
      const result = forecast.hourly.filter(
        (obj) => obj.dt < nextTwentyFourHours
      );
      setTwentyfourHrsData(result);
    }

    console.log("Selected day:", days);
  };

  const renderDailyItem = (daily) => {
    let date = new Date(daily.dt * 1000);
    let mintemp = Math.round(daily.temp.min);
    let maxtemp = Math.round(daily.temp.max);

    const weather = daily.weather[0];

    return (
      <div>
        <div
          style={{
            marginTop: "-350px",
            marginLeft: "120px",

            //overflowY: "auto",
          }}
        >
          <div style={{ width: "25%" }}>
            <div style={{ height: "10vh", justifyContent: "center" }}>
              {selectedDay === "7" ? (
                <div>
                  <p className={styles.headerText} style={{ color: "#1268B3" }}>
                    {day(date)}

                    <p
                      className={styles.headerText}
                      style={{
                        color: "#1268B3",
                      }}
                    >
                      {myDate(date)}
                    </p>
                  </p>
                  {/*</div>*/}
                  {/*</div>*/}
                </div>
              ) : (
                <div>
                  <p className={styles.headerText}>{myDate(date)}</p>
                  <p className={styles.headerText}>{time(date)}</p>
                </div>
              )}
            </div>
            <br />
            <div className={styles.temp} style={{ height: "25vh" }}>
              {selectedDay === "7" ? (
                <p className={styles.text}>
                  {Math.round((maxtemp + mintemp) / 2)}°C
                </p>
              ) : selectedDay === "24" ? (
                <p className={styles.text}>{Math.round(daily.temp)}°C</p>
              ) : null}
              <p className={styles.text}>{daily.humidity}%</p>
              <p className={styles.text}>{daily.clouds}%</p>
              <p className={styles.text}>{daily.Rain}</p>
              <p className={styles.text}>{daily.wind_speed}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHourlyItem = (hourly) => {
    let date = new Date(hourly.dt * 1000);
    const weather = hourly.weather[0];

    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className={styles.flexContainer}>
            <div
              style={{
                marginTop: "-300px",
                marginLeft: "200px",
              }}
            >
              <div style={{ width: "25%" }}>
                <div style={{ height: "10vh", justifyContent: "center" }}>
                  {/*<p className={styles.headerText}>{day(date)}</p>*/}
                  <p
                    className={styles.headerText}
                    style={{
                      color: "#1268B3",
                    }}
                  >
                    {myDate(date)}
                    <p
                      className={styles.headerText}
                      style={{
                        color: "#1268B3",
                      }}
                    >
                      {time(date)}
                    </p>
                  </p>
                </div>

                <div className={styles.temp} style={{ height: "25vh" }}>
                  <p className={styles.text}>{Math.round(hourly.temp)}°C</p>
                  <p className={styles.text}>{hourly.humidity}%</p>
                  <p className={styles.text}>{hourly.clouds}%</p>
                  <p className={styles.text}>{hourly.rain}</p>
                  <p className={styles.text}>{hourly.wind_speed}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!forecast) {
    return (
      <div style={styles.loading}>{/*<ActivityIndicator size="large" />*/}</div>
    );
  }

  return (
    <div className="schedule-container1">
      {/* Header */}
      <table
        style={{
          width: "60%",
          marginLeft: "20%",
        }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>
              <img
                src={EnvTemperature}
                style={{ ...styles.icon, width: "50px" }}
                alt="Temperature"
              />
              <p
                className={styles.iconTitle}
                style={{
                  color: "#1268B3",
                }}
              >
                {"Temperature"}
              </p>
            </th>

            <th>
              <img
                src={EnvHumidity}
                style={{ ...styles.icon, width: "50px" }}
                alt="Humidity"
              />

              <p
                className={styles.iconTitle}
                style={{
                  color: "#1268B3",
                }}
              >
                {"Humidity"}
              </p>
            </th>
            <th>
              {" "}
              <img
                src={EnvData}
                style={{ ...styles.icon, width: "50px" }}
                alt="CloudCover"
              />
              <p
                className={styles.iconTitle}
                style={{
                  color: "#1268B3",
                }}
              >
                {"CloudCover"}
              </p>
            </th>
            <th>
              {" "}
              <img
                src={EnvData}
                style={{ ...styles.icon, width: "50px" }}
                alt="RainFall"
              />
              <p
                className={styles.iconTitle}
                style={{
                  color: "#1268B3",
                }}
              >
                {"RainFall"}
              </p>
            </th>
            <th>
              <img
                src={WindSpeed}
                style={{ ...styles.icon, width: "50px" }}
                alt="WindSpeed"
              />
              <p
                className={styles.iconTitle}
                style={{
                  color: "#1268B3",
                }}
              >
                {"WindSpeed"}
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Daily Forecast */}
          {selectedDay === "7" &&
            forecast &&
            forecast.daily.map((daily) => (
              <tr key={daily.dt}>
                <td>{myDate(new Date(daily.dt * 1000))}</td>

                <td>{Math.round((daily.temp.max + daily.temp.min) / 2)}°C</td>
                <td>{daily.humidity}%</td>
                <td>{daily.clouds}%</td>
                <td>{daily.rain}</td>
                <td>{daily.wind_speed}</td>
              </tr>
            ))}

          {/* 24-hour Forecast */}
          {selectedDay === "24" &&
            twentyfourHrsData.map((hourly) => (
              <tr key={hourly.dt}>
                <td>
                  {myDate(new Date(hourly.dt * 1000))}{" "}
                  {time(new Date(hourly.dt * 1000))}
                </td>
                <td>{Math.round(hourly.temp)}°C</td>
                <td>{hourly.humidity}%</td>
                <td>{hourly.clouds}%</td>
                <td>0.0%</td>
                <td>{hourly.wind_speed}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Day Selection Buttons */}
      <br />
      <br />
      <div>
        <button
          className="butn"
          onClick={() => onClickDaysTab("24")}
          style={{
            backgroundColor: selectedDay === "24" ? "#1268B3" : "#c0c0c0",
            color: selectedDay === "24" ? "#ffffff" : "#1268B3",
          }}
          //style={{
          //  height: "80%",
          //  borderRadius: 10,
          //  backgroundColor: selectedDay === "24" ? "#1268B3" : "#c0c0c0",
          //  color: selectedDay === "7" ? "#ffffff" : "#1268B3",

          //  width: "10%",
          //  alignItems: "center",
          //  justifyContent: "center",
          //  marginLeft: "350px",
          //  //marginBottom: "-150px",
          //  marginTop: "100px",
          //}}
        >
          1 Day
        </button>
        <div>
          <button
            className="butn1"
            onClick={() => onClickDaysTab("7")}
            style={{
              backgroundColor: selectedDay === "7" ? "#1268B3" : "#c0c0c0",
              color: selectedDay === "7" ? "#ffffff" : "#1268B3",
            }}
            //style={{
            //  height: "80%",
            //  borderRadius: 10,
            //  backgroundColor: selectedDay === "7" ? "#1268B3" : "#c0c0c0",
            //  color: selectedDay === "7" ? "#ffffff" : "#1268B3",

            //  width: "10%",
            //  alignItems: "center",
            //  justifyContent: "center",
            //  //marginLeft: "50%",
            //  marginTop: "-50px",
            //}}
          >
            7 Days
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {};
