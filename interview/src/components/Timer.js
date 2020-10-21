import React, { useEffect } from "react";
import * as constants from "../constants";
import Axios from "axios";
function Timer(props) {
  const startTimer = async () => {
    const res = await Axios.post(
      `${constants.GRAPHQL_API}`,
      {
        query: `mutation{
  update_tasks_by_pk(_set:{start_time:${new Date().toJSON()}}, pk_columns: {id:${
          props.id
        }}){

    id
    start_time

  }
}`,
      },
      {
        headers: {
          Authorization: `Bearer ${constants.JWT}`,
        },
      }
    );
    console.log(res);
  };
  let timerHandler = (e) => {
    e.preventDefault();
    startTimer();
  };

  // Delete task

  const deleteTask = async () => {
    const res = await Axios.post(
      `${constants.GRAPHQL_API}`,
      {
        query: `mutation{ 
          delete_tasks_by_pk(id: ${props.id}){
    created_at
    title
    id
  
  }
        }`,
      },
      {
        headers: {
          Authorization: `Bearer ${constants.JWT}`,
        },
      }
    );
    console.log(res);
  };
  let deleteHandler = (e) => {
    e.preventDefault();
    deleteTask();
  };
  return (
    <>
      <button onClick={timerHandler}>Start Timer</button>
      <button onClick={deleteHandler}>Delete</button>
    </>
  );
}

export default Timer;
