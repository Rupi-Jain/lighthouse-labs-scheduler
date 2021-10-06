import React, {useState} from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from 'hooks/useVisualMode'

export default function Appointment(props) {
 // console.log('props:', props)
  //const {id , time , interview,interviewers, bookInterview} = props;
  //console.log("appt", props.interview)
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETE = 'DELETE';
  const CONFIRM = 'CONFIRM';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
  const EDIT = 'EDIT';

  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //console.log("interview", props.interview, "mode:", mode)
  
  function saveHandle(name, interviewer) {
    //console.log("day", props.day);
    const interview = {
      student: name,
      interviewer: interviewer.id
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
     // .then(() => props.updateSpots(props.day))
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
      // props.updateSpots(props.day)
      // .then(() => transition(SHOW))
   }
  function cancelHandle() {
   back();
  } 
  function deleteHandle() {
    transition(CONFIRM);
  }
  function confirmDeleteHandle() {
    const interview = null;
    transition(DELETE, true);
    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }
  const updateHandle = (name, interviewer) => {
    transition(EDIT);
  } 
  // function confirmDeleteHandle() {
  //   const interview = null;
  //   transition(DELETE);
  //   props.cancelInterview(props.id, interview)
  //   .then(() => transition(EMPTY))
  // }

 
  return (
    <article className="appointment">    
      {<Header time={props.time} />}
     {mode === EMPTY && <Empty onAdd={() => transition('CREATE')} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {deleteHandle}
          onEdit = {updateHandle}
          cancelInterview={props.cancelInterview}
        />
      )}   
      {mode === CREATE  && 
      <Form 
        interviewers={props.interviewers} 
        onSave={saveHandle} 
        onCancel={cancelHandle} 
        bookInterview={props.bookInterview}
      />}
      { mode === EDIT  && 
      <Form 
        interviewers={props.interviewers} 
        onSave={saveHandle} 
        onCancel={cancelHandle} 
        bookInterview={props.bookInterview}
        interview={props.interview}
      />}
      {mode === SAVING &&
        <Status message="Saving" />
      }
      {mode === DELETE &&
        <Status message="Deleting" />
      }
      {mode === CONFIRM &&
        <Confirm 
        message="Delete"
        onConfirm={confirmDeleteHandle}
        onCancel={cancelHandle}
        />
      }
      {mode === ERROR_SAVE &&
        <Error message="Error Saving" onCancel={cancelHandle}/>
      }
      {mode === ERROR_DELETE &&
        <Error message="Error DELETING" onCancel={cancelHandle}/>
      }

    </article>
  )
}