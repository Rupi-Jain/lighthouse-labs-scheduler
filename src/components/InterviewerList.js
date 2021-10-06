import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";


export default function InterviewerList(props) {
  const {interviewers, value, onChange} = props;
  //console.log("selectedInter", props.selected)
  const parsedInterviewers = interviewers.map(interviewer => {
    return <InterviewerListItem key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      //setInterviewer={(event) => onChange(interviewer.id)}
      onChange={onChange}
      selected={value === interviewer.id}
     // selected={parseInt(props.selected) === interviewer.id}
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