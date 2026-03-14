import React, { useEffect, useState } from 'react'
import "./AddProjectPage.css"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


const ProjectEditPage = ({updateProject}) => {



  
    const [title, setTitle ] = useState({})
    const [description, setDescription ] = useState({})

    const navigate = useNavigate()

  
    const {id} = useParams()
  
    useEffect(() => {
      axios.get(`http://127.0.0.1:8008/project/${id}`)
      .then(res => {
        console.log(res.data)
        setTitle(res.data.title)
        setDescription(res.data.description)
  
      })
      .catch(err => {
        console.log(err.message)
      })
    }, [id])


    
  const editProjet = {
    title: title,
    description: description
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title && !description ){
      return;
    }
    updateProject(editProjet, id)
    navigate(`/`)
    console.log(editProjet)
  }
  

  
  return (
    <>

    
<form className="custom-form" onSubmit={handleSubmit}>
  <h4 className="form-title">Editer une note</h4>

  <div className="mb-4">
    <label className="form-label">Titre</label>
    <input
      type="text"
      className="form-control custom-input"
      placeholder="Editer le titre du projet"
      value={title}
      onChange={ (e) => setTitle(e.target.value) }

    />
  </div>

  <div className="mb-4">
    <label className="form-label">Contenu</label>
    <textarea
      className="form-control custom-input"
      rows={4}
      placeholder="Modifier la description"
      value={description}
      onChange={ (e) => setDescription(e.target.value) }

    ></textarea>
  </div>


  <button type="submit" className="custom-btn">
    Editer la note
  </button>
</form>


      
    </>
  )
}

export default ProjectEditPage
