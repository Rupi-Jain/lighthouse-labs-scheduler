import  React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  let days;
  if(typeof(props.days)) {
    days = Object.values(props.days)
  } else {
    days = props.days
  }
  const parsedDays = days.map(day => {
   return <DayListItem key={day.name} 
   name={day.name} 
   spots={day.spots} 
   selected={day.name === props.day}
   setDay={props.setDay} />
  })

  return (
    <ul>
      {parsedDays}
    </ul>
  )
}