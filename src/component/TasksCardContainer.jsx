import React from "react";
import TasksCard from "./TasksCard";
import Loader from "../component/loader";
import { Link } from "react-router-dom";

const TasksCardContainer = ({tasks , loading, deleteTask , project}) => {
  return (
    <div className="container-fluid px-4">

      {loading && <Loader loading={loading} />}

      <div className="d-flex flex-column gap-3">

        {Array.isArray(tasks) &&
          tasks.map(task => (
            <TasksCard key={task.id} task={task} deleteTask={deleteTask} project={project} />
          ))}

      <Link to={`/`} style={{textDecoration: "none" , color: "black" }}>
          <span>Retour</span>
      </Link>

      </div>

    </div>


  )
}

export default TasksCardContainer;