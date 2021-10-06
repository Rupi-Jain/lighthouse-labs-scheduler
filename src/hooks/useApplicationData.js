import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData(props) {
  const [day, setDay] = useState("")
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    interviewer: {}
  });
  //console.log("Main App", state.appointments, "day:", state.day);
  useEffect(() => {
    const one = axios.get("http://localhost:8001/api/days")
    const two = axios.get("http://localhost:8001/api/appointments")
    const three = axios.get("http://localhost:8001/api/interviewers")
    Promise.all([
      Promise.resolve(one),
      Promise.resolve(two),
      Promise.resolve(three),
    ]).then((all) => {
      setState(prev => (
        {...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });   
    }, [])

  function bookInterview(id, interview) {
    //console.log("state.appointments[id]", state.appointments[id])
   // console.log("interview", interview)
    const appointment = {
      ...state.appointments[id],
      interview
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {
      interview
    })
    .then(() => {
      const days = updateSpots(id, appointments);
      return setState({ ...state, appointments, days })
     });
  
  }
  const findDay = (days, id) => {
    for (let day of days) {
      for (let appintmentId of day.appointments) {
        if (appintmentId === id) {
          return day;
        }
      }
    }
  }
  function updateSpots(id, appointments) {
    const foundDay = findDay(state.days, id);
    let remainingSpots = 0;
    for (let appointmentId of foundDay.appointments) {
      if (appointments[appointmentId].interview === null) {
        remainingSpots++;
      }
    }
    foundDay.spots = remainingSpots;
    const foundDayIndex = state.days.findIndex(day => day.id === foundDay.id);
    const days = [...state.days];
    days[foundDayIndex] = foundDay;
    return days;
  }
// function updateSpots(apptDay, appointments) {
//      console.log("ready to update", state.days, apptDay);
//     //const apptDay = state.day
//     const filteredDay = state.days.filter(dayFound => dayFound.name === apptDay); 
//     //console.log("fil", filteredDay[0].appointments) 
//     let remainingSpots = 0;
//       for (let appointmentId of filteredDay[0].appointments) {
//         if (appointments[appointmentId].interview === null) {
//           remainingSpots++;
//         }
//       }
//     const foundDayIndex = state.days.findIndex(day => day.name === apptDay);
//     const day = {
//       ...state.days[foundDayIndex],
//       spots: remainingSpots
//     }
//     //setDay({...state.days[foundDayIndex], day});
//     console.log("day:",day)
//     const days = {
//       ...state.days,
//       [foundDayIndex]: day
//     };
//     return days;
//   }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, {
      interview
    })
    .then(() => {
      const days = updateSpots(id, appointments);
      return setState({ ...state, appointments, days })
      });
  }

  const selectDay = (e) => {
    const selectedDay =  e.currentTarget.dataset.id;
    setState(prev => ({ ...prev, day: selectedDay}));  
  }

  return { state, setDay, bookInterview, cancelInterview, selectDay};

} 