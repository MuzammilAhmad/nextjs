import classes from "./MeetupDetail.module.css";
import { Fragment } from "react";

function MeetUpDetail(props) {
  return (
    <section className={classes.detail}>
      <img src={props.img} alt={props.title}></img>
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}

export default MeetUpDetail;
