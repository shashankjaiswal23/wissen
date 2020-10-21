import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Task.css"
import * as constants from "../constants";
import Timer from "./Timer";
function Tasks() {
  const [task, setTask] = useState({ tasks: [] });
  const [addTask, setAddTask] = useState("");

  // fetching task
  useEffect(() => {

    fetchData();
  }, []);

  
      const fetchData = async () => {
        const res = await Axios.post(
          `${constants.GRAPHQL_API}`,
          { query: constants.TODOS },
          {
            headers: {
              Authorization: `Bearer ${constants.JWT}`,
            },
          }
        );
        setTask(res.data.data);
      };


  // Mutation


    const addData = async () => {
      const res = await Axios.post(
        `${constants.GRAPHQL_API}`,
        {
          query: `mutation{
  insert_tasks_one(object:{title:"${addTask}"}){
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
     console.log(res)
      
    };
  let submitHandler = (event) => {
    event.preventDefault()
    addData();
    fetchData();
  //  console.log(addTask)
  };
  
  return (
    <div>
      <form onSubmit={submitHandler} className="add_task">
        <input onChange={(e) => setAddTask(e.target.value)} />
        <button type="submit">add task</button>
      </form>
      <h1>Tasks</h1>

      {task.tasks.map((x) => (
        <ul key={x.id} className="task__list">
          <li>
            <h3>
            <strong>{x.title} </strong>
            </h3>
          </li>
          <li>
            <Timer id={x.id} />
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Tasks;
