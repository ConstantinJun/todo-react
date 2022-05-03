import React from "react";
import Card from "./Card";
import classes from "./MeteoCard.module.css";

function MeteoCard(props) {
  return (
    <Card>
      <h5>{props.dayOfWeek[1]}</h5>
      <p>{props.time[0]}</p>
      <img src={props.icon} alt={props.precipitatii}></img>
      <h6>{props.temps}</h6>
      <p>{props.precipitatii}</p>
    </Card>
  );
}

export default MeteoCard;
