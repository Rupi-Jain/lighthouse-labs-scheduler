import React, { useEffect, useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import useVisualMode from 'hooks/useVisualMode'

export default function Form(props) {
 // console.log("propsForm", props.interview.interviewer);
 const [name, setName] = useState("" );
 const [interviewer, setInterviewer] = useState({} );

 useEffect(() => {
  if(props.interview) {
    setName(props.interview.student)
    setInterviewer(props.interview.interviewer)
  }
 }, [])
 
 const selectInterviewer = (e) => {
 setInterviewer(
   {id:parseInt(e.currentTarget.dataset.id),
    name:e.target.alt,
    avatar: e.target.src})
}
  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name={name}
          type="text"
          placeholder= "Enter Student Name"
          value = {name}
          onChange={(e) => setName(e.target.value)}
          /> 
      </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer.id} onChange={selectInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={(e) => props.onCancel()}>Cancel</Button>
        <Button confirm onClick={(e) => props.onSave(name, interviewer)}>Save</Button>
      </section>
    </section>
  </main>
  )
}