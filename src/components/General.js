import MeteoCard from "./MeteoCard";
import Wait from "./Wait";
import classes from "./general.module.css";
import { useEffect, useState } from "react";
import moment from "moment";

function General() {
  const [pogoda, setPogoda] = useState(null);
  const [render, setRender] = useState(true);
  const [location, setLocation] = useState();
  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=47.003670&lon=28.907089&units=metric&exclude=hourly,monthly,minutely,current&appid=5898d13a35b771fe9d800d94cc6c46a9"
    )
      .then((reposne) => reposne.json())
      .then((data) => {
        setLocation(data.timezone);
        setPogoda(data.daily.slice(0, 5));
        setRender(false);
      });
  }, []);
  console.log(pogoda);

  const iconSrc = (el) => {
    let src = "";
    if (el.id <= 232) {
      return (src = "http://openweathermap.org/img/wn/11d@2x.png");
    } else if (el.id <= 321) {
      return (src = "http://openweathermap.org/img/wn/09d@2x.png");
    }
    if (el.id <= 531) {
      return (src = "http://openweathermap.org/img/wn/10d@2x.png");
    }
    if (el.id <= 622) {
      return (src = "http://openweathermap.org/img/wn/13d@2x.png");
    }
    if (el.id <= 781) {
      return (src = "http://openweathermap.org/img/wn/50d@2x.png");
    }
    if (el.id <= 810) {
      return (src = "http://openweathermap.org/img/wn/01d@2x.png");
    }
  };

  const workWithDate = (el) => {
    let date = new Date(el * 1000).toString();
    var day = moment(date).format("dddd");
    date = moment(date).format("MMMM Do, h:mm:ss a");
    return [date, day];
  };

  return (
    <div className={classes.app}>
      <div className={classes.title}>
        <h1>5 day forecast</h1>
      </div>
      <div className={classes.second}>
        <div className={classes.header}>
          <p>{location}</p>
        </div>
        <div className={classes.cards}>
          {render && <Wait />}
          {!render &&
            pogoda.map((el) => (
              <MeteoCard
                key={Math.random()}
                dayOfWeek={workWithDate(el.dt)}
                temps={Math.round(el.temp.day)}
                time={workWithDate(el.dt)}
                precipitatii={el.weather[0].description}
                icon={iconSrc(el.weather[0])}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default General;
