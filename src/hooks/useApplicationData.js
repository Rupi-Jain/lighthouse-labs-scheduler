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
    .then(()=> setState({
        ...state,
        appointments
    }));
  
  }
  
  // function updateSpots(apptDay) {
  //   // console.log("ready to update", state.days, apptDay);
  //   const filteredDay = state.days.filter(dayFound => dayFound.name === apptDay); 
  //   const appointments = getAppointmentsForDay(state, apptDay)
  //   //console.log("apointments", appointments)
  //   let counter = filteredDay.spots;
  //   appointments.forEach(appointment =>{
  //     if (!appointment.interview) counter -= 1
  //   })
  //   // const noOfSpots = appointments.reduce((counter, appointment) => {
  //   // if (!appointment.interview) counter -= 1
  //   //   return counter;
  //   // }, filteredDay.spots); 
  //   console.log("spots:", counter);
  //   const day = {
  //     ...state.days[apptDay],
  //     spots:counter
  //   }
  //   const days = {
  //     ...state.days,
  //     [apptDay]: day
  //   };
  //   return axios.get(`/api/days`, {
  //     day
  //   })
  //   .then((res)=> setState({
  //     ...state,
  //     days
  //   }));
  // }

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
      .then(()=> setState({
        ...state,
        appointments
      }));
  }

  const selectDay = (e) => {
    const selectedDay =  e.currentTarget.dataset.id;
    setState(prev => ({ ...prev, day: selectedDay}));  
  }

  return { state, setDay, bookInterview, cancelInterview, selectDay};

} 