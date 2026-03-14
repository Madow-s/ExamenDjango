import "./ProjectDetails.css"
import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { BiSolidTrashAlt } from 'react-icons/bi'
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import FormatDate from "../component/FormatDate"
import Modal2 from "../component/Modal2"


const TaskDetails = ({deleteTask}) => {

  const [isOpen, setIsOpen ] = useState(false)


  const [task, setTask ] = useState({})

  const {id} = useParams()

  const handleIsopen = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:8008/tache/${id}`)
    .then(res => {
      console.log(res.data)
      setTask(res.data)

    })
    .catch(err => {
      console.log(err.message)
    })
  }, [id])


  const statusColor = task.status === "a_faire" ? "red" : task.status === "en_cours" ? "yellow" : task.status === "termine" ? "green" : "black";




  return (

    <>
    <div className="note-container">
  
      <h2 className="title">
        {task.title}
      </h2>
  
      <div className="date-row">
        <span>DATE limite : {FormatDate(task.date_limit)}</span>
        <span>Crée par : {task.created_by}</span>
      </div>
  

      <div className="profile_username">
      Attribué a :{task.profile_username}
      </div>

      <div className="project_title">
      Appartient au projet : {task.project_title}
      </div>

      <div className="description">
      Infos : {task.description}
      </div>

      <div className="status" style={{color : statusColor}}>
      Status : {task.status}
      </div>

      <div className="button-group" >
        <button className="custom-btn edit-btn" style={{ background: "#dc3545"  }}>
        <Link to={`/edit-tache/${id}`} style={{textDecoration: "none" , color: "black" }}>
          <FiEdit />
          <span>Modifier</span>
          </Link>
        </button>
  
        <button className="custom-btn delete-btn">
          <BiSolidTrashAlt />
          <span style={{color: "black"}} onClick={handleIsopen} >Supprimer</span>
        </button>
      </div>


      <Link to={`/`} style={{textDecoration: "none" , color: "black" }}>
          <span>Retour</span>
      </Link>

    </div>

    {isOpen && <Modal2 handleIsopen={handleIsopen} deleteTask={deleteTask} id={id} />}
  
    
  </>


  )
}

export default TaskDetails
