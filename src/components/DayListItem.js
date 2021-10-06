import React from "react";
import "./DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  const { name, spots, selected, setDay} = props;
  const dayClass = classnames("day-list__item" , {
    "day-list__item--selected" : selected,
    "day-list__item--full": ! spots 
  })

  const formatSpots = () => {
    if (!spots) {
      return `no spots remaining`;
    } 
    if (spots === 1) {
      return `${spots} spot remaining`;
    } 
      return `${spots} spots remaining`;   
  }
  return (
    <li onClick={setDay} className={dayClass} data-id={name}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  )
}