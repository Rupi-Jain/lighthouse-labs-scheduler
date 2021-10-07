import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment"
import useApplicationData  from "hooks/useApplicationData"
import { getAppointmentsForDay, getInterviewForDay, getInterview} from "helpers/selectors";

export default function Application() {
  
  const {
    state,
    bookInterview,
    cancelInterview,
    selectDay
  } = useApplicationData();

  const interviewers = getInterviewForDay(state, state.day); 
  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay= {selectDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key={"last"} time={"12pm"} />
      </section>
    </main>
  );
}
