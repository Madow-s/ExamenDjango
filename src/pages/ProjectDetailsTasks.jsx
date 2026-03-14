import React from 'react'
import TasksCardContainer from '../component/TasksCardContainer'
import Filter from '../component/Filter'
import { Link, useParams } from 'react-router-dom';
import { FaSquarePlus } from 'react-icons/fa6';

const ProjectDetailsTasks = ({tasks , deleteTask, project, handleFilter}) => {
    const { id } = useParams();

    const projectTasks = tasks.filter(task => task.project == id);
  
    return (
      <>
      {/* Add Button */}
      <div className="mt-2">
      <Link to={`/add-tasks/${id}`} style={{ textDecoration: "none" }}>
      <button
        className="btn"
        type="button"
        style={{
          backgroundColor: "#a00050",
          color: "white",
          padding: "5px 12px",
          borderRadius: "28px",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "0 0px 0px rgba(160,0,80,0.3)",
        }}
      >
        <FaSquarePlus size={18} />
        Nouvelle Tache
      </button>
    </Link>
      </div>
        <Filter handleFilter={handleFilter} />
        <TasksCardContainer deleteTask={deleteTask} tasks={projectTasks}  project={project}/>
      </>
    );
}

export default ProjectDetailsTasks
