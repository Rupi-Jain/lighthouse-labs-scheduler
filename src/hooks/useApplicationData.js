import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    interviewer: {}
  });

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
      const days = updateSpots(state.day, appointments);
      return setState({ ...state, appointments, days })
     });
  
  }
  function getDay(days, apptDay) {
    for(let day of days) {
      if(day.name === apptDay) {
        return day;
      }
    }
  }
  function updateSpots(apptDay, appointments) {
    const filteredDay = getDay(state.days, apptDay);
    const appointmentIds = filteredDay.appointments; 
    let remainingSpots = 0;
    for (let appointmentId of filteredDay.appointments) {
    if (appointments[appointmentId].interview === null) {
      remainingSpots++;
    }
    }
    filteredDay.spots = remainingSpots;
    const foundDayIndex = state.days.findIndex(day => day.id === filteredDay.id);
    const days = [...state.days];
    days[foundDayIndex] = filteredDay;
    return days;
  }

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
      const days = updateSpots(state.day, appointments);
      return setState({ ...state, appointments, days })
      });
  }

  const selectDay = (e) => {
    const selectedDay =  e.currentTarget.dataset.id;
    setState(prev => ({ ...prev, day: selectedDay}));  
  }

  return { state, bookInterview, cancelInterview, selectDay};

} 

    