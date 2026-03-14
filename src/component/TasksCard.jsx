import React, { useState } from "react";
import { FiEdit } from 'react-icons/fi'
import { BiSolidTrashAlt } from 'react-icons/bi'
import { Link } from "react-router-dom";
import Modal from "./Modal";

      const TasksCard = ({ task , deleteTask , project}) => {
      
        const statusColor = task.status === "a_faire" ? "red" : task.status === "en_cours" ? "yellow" : "green";
        const description = `${task.description.split(" ").slice(0, 18).join(" ")}...`
        
        const [isOpen, setIsOpen ] = useState(false)

        const handleIsopen = () => {
          setIsOpen(!isOpen)
        }
        
      
        return (

          <>

          
          <div className="card mb-2">
            <div className="card-body">
      
              <div className="d-flex align-items-center">
      
                {/* Titre */}
                <div style={{ width: "15%" }}>
                  <Link to={`/tache/${task.id}`}style={{textDecoration: "none" , color: 'black' }} >
                  <h6>
                    {task.title}
                  </h6>
                  </Link>
                </div>
      
                {/* Description */}
                <div style={{ width: "20%" }}>
                  <p className="text-muted ">
                  {description}
                  </p>
                </div>
      
                {/* Projet */}
                <div style={{ width: "15%" }}>
                  <span style={{padding: "3px 6px", justifyContent: "center" }} className="text-secondary">
                  {task.project_title}
                  </span>
                </div>
      
              
      
                {/* Statut */}
                <div style={{ width: "15%", }}>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: statusColor,
                      padding: "3px 6px",
                      fontSize: "0.75rem",
                      justifyContent: "center"
                    }}
                  >
                    {task.status}
                  </span>
                </div>

                {/* Profil */}
                <div style={{ width: "15%" }}>
                  <span style={{
                      padding: "3px 6px",
                      fontSize: "1rem",
                      justifyContent: "center"
                    }} className="text-dark">
                    for: {task.profile_username}
                  </span>
                </div>


                 {/* action */}
                <div className="d-flex gap-1" style={{width: "15%", textAlign: "right", justifyContent: "center" }}>
                  <Link to={`/edit-tache/${task.id}`} className="custom-btn edit-btn" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <FiEdit />
                  </Link>
                  <button className="custom-btn delete-btn" style={{ display: "flex", alignItems: "center", gap: "4px" }}onClick={handleIsopen} >
                    <BiSolidTrashAlt />
                  </button>
                </div>
      
              </div>
      
            </div>
          </div>

          {isOpen && <Modal handleIsopen={handleIsopen} deleteTask={deleteTask} task={task} project={project}  />}

          </>

  
        );
      };
      
      export default TasksCard;