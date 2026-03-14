import { useNavigate, useParams } from "react-router-dom"
import "./Modal.css"

import React from 'react'
import { toast } from "react-toastify"

const Modal = ({handleIsopen , deleteProject , id}) => {


    const navigate = useNavigate()


    const handledeleteProject = () => {
        console.log(id)
        deleteProject(id)
        navigate(`/`)
        toast.success("Projet supprimé avec succes !")
        window.location.reload()

    }


  return (
    <>
    <div className="c-modal-overlay">
      <div className="c-modal">
        <button className="close-button" onClick={handleIsopen} >×</button>
        <div className="c-modal-content">
          <h2>Supprimer</h2>
          <p>Etes vous sur de vouloir supprimer ???</p>
          <span className="d-flex justify-content-center">
            <button className="btn btn-danger me-3" onClick={handledeleteProject} >Supprimer</button>
            <button className="btn btn-primary " onClick={handleIsopen} >Annuler</button>
          </span>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default Modal
