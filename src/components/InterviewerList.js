import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

function InterviewerList(props) {
  const {interviewers, selectedInterviewer, onChange} = props;
  //console.log("selectedInter", props.selected)
  let id ;
  //if(Object.keys(selectedInterviewer).length === 0){
  if(!selectedInterviewer){
    id = -1;
  } else {
    id = selectedInterviewer.id;
  }
  const parsedInterviewers = interviewers.map(interviewer => {
    return <InterviewerListItem key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      onChange={onChange}
      selected={id === interviewer.id}
    />  
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  )

}

export default InterviewerList;