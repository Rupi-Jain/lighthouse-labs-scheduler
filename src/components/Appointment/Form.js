import React, {useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [name, setName] = useState(props.name || "" );
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  const selectInterviewer = (e) => {
  setInterviewer(
    { id:parseInt(e.currentTarget.dataset.id),
      name:e.target.alt,
      avatar: e.target.src})
  }
  function reset() {
    setName("");
    setInterviewer(null);
  }
  function cancel() {
    reset();
    props.onCancel()
  }
  function validate() {
    if (name === "") {
      setError("student name cannot be blank");
      return;
    }
    if(!interviewer) {    
      setError("Please Select the interviewer");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }
  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder= "Enter Student Name"
          value = {name}
          onChange={(e) => setName(e.target.value)}
          data-testid="student-name-input"
          />       
          <section className="appointment__validation">{error}</section> 
      </form>
      
        <InterviewerList interviewers={props.interviewers} selectedInterviewer={interviewer} onChange={selectInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={(e) => cancel()}>Cancel</Button>
        <Button confirm onClick={(e) => validate()}>Save</Button>
      </section>
    </section>
  </main>
  )
}