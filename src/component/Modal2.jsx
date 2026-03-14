import { useNavigate, useParams } from "react-router-dom"
import "./Modal.css"

import React from 'react'
import { toast } from "react-toastify"

const Modal2 = ({handleIsopen , deleteTask , id}) => {


    const navigate = useNavigate()


    const handledeleteTask = () => {
        console.log(id)
        deleteTask(id)
        navigate(`/`)
        toast.success("Tache supprimé avec succes !")
        window.location.reload()

    }


  return (
    <>
    <div className="c-modal-overlay">
      <div className="c-modal">
        <button className="close-button" onClick={handleIsopen} >×</button>
        <div className="c-modal-content">
          <h2>Supprimer Tache</h2>
          <p>Etes vous sur de vouloir supprimer ???</p>
          <span className="d-flex justify-content-center">
            <button className="btn btn-danger me-3" onClick={handledeleteTask} >Supprimer</button>
            <button className="btn btn-primary " onClick={handleIsopen} >Annuler</button>
          </span>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default Modal2
