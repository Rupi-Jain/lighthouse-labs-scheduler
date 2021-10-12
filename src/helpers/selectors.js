
export function getInterview(state, interview) {
  
  if(!interview) return null

  const interviewers = Object.values(state.interviewers);
  const filteredInterviewer = interviewers.filter(interviewerFound => interviewerFound.id === parseInt(interview.interviewer)); 

  if (!filteredInterviewer) return null
  
  const interviewer = Object.assign({}, ...filteredInterviewer);
  return {student: interview.student, interviewer: interviewer};
}

export function getAppointmentsForDay(state, day) {  
 
  if (state.days.length === 0) return [];

  const filteredDay = state.days.filter(dayFound => dayFound.name === day); 
  
  if(filteredDay.length === 0) return [];

  const apptDays = filteredDay[0].appointments;
  const results = [];
  apptDays.forEach(apptDay => {
    if(state.appointments[apptDay]) {
      results.push(state.appointments[apptDay]);
    } else {
      results.push({});
    }
    return (results)
  })
 
  return results;

}

export function getInterviewForDay(state, day) {  
 
  if (state.days.length === 0) return [];

  const filteredDay = state.days.filter(dayFound => dayFound.name === day); 

  if(filteredDay.length === 0) return [];

  const interviewers = filteredDay[0].interviewers;
  const results = [];
  interviewers.forEach(interviewDay => {
    if(state.interviewers[interviewDay]) {
      results.push(state.interviewers[interviewDay]);
    } else {
      results.push({});
    }
    return (results)
  })
 
  return results;

}


