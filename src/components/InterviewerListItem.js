import React from "react";
import "./InterviewerListItem.scss";
import classnames from "classnames";

export default function InterviewerListItem(props) {
  const {id, name, avatar, selected, setInterviewer} = props;
  const listClass = classnames("interviewers__item-image", {
    "interviewers__item--selected": selected
  })
  return (
    <li className={listClass} onClick={props.onChange} data-id={id}>
      <img
        className={listClass}
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}