import "./ProjectDetails.css"
import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { BiSolidTrashAlt } from 'react-icons/bi'
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import FormatDate from "../component/FormatDate"
import Modal from "../component/Modal"


const ProjectDetails = ({deleteProject} ) => {

  const [isOpen, setIsOpen ] = useState(false)

  const [project, setProject ] = useState({})

  const {id} = useParams()

  const handleIsopen = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:8008/project/${id}`)
    .then(res => {
      console.log(res.data)
      setProject(res.data)

    })
    .catch(err => {
      console.log(err.message)
    })
  }, [id])




  return (

    <>
    <div className="note-container">
  
      <h2 className="title">
        {project.title}
      </h2>
  
      <div className="date-row">
        <span>Créé : {FormatDate(project.created_at)}</span>
        <span>Dernière mise à jour : ...</span>
      </div>
  
      <div className="button-group">
        <button className="custom-btn edit-btn">
        <Link to={`/edit-note/${id}`} style={{textDecoration: "none" , color: "black" }}>
          <FiEdit />
          <span>Modifier</span>
          </Link>
        </button>
  
        <button className="custom-btn delete-btn" style={{ background: "#dc3545"  }}>
          <BiSolidTrashAlt />
          <span style={{color: "black", background: "#dc3545" }} onClick={handleIsopen} >Supprimer</span>
        </button>
      </div>
  
      <div className="description">
      {project.description}
      </div>

      <Link to={`/`} style={{textDecoration: "none" , color: "black" }}>
          <span>Retour</span>
      </Link>
  
    </div>

    {isOpen && <Modal handleIsopen={handleIsopen} deleteProject={deleteProject} project={project} id={id} />}
  
    
  </>


  )
}

export default ProjectDetails
