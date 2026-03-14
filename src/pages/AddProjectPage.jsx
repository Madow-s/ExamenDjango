import React, { useEffect, useState } from 'react'
import "./AddProjectPage.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const AddProjectPage = ({addProject}) => {


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const navigate = useNavigate()

  const [myprofile, setMyprofile] = useState(null)


  
  
    useEffect(() => {
      axios.get("http://127.0.0.1:8008/my-profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then(res => {
        setMyprofile(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }, [])






  const newProjet = {
    title: title,
    description: description
  }

  const handleSubmit =(e) => {
    e.preventDefault()
    if (!title && !description ){
      return;
    }
    addProject(newProjet)
    navigate('/' , { replace: true })
    window.location.reload()
    console.log(newProjet)
  }



  return (
    <>

<form className="custom-form" onSubmit={handleSubmit}>
  <h4 className="form-title">Ajouter un nouveau Projet</h4>


  <div className="mb-4">
    <label className="form-label">Titre</label>
    <input
      type="text"
      className="form-control custom-input"
      placeholder="Entrer le titre du projet"
      value={title}
      onChange={ (e) => setTitle(e.target.value) }
    />
  </div>

  <div className="mb-4">
    <label className="form-label"> Description</label>
    <textarea
      className="form-control custom-input"
      rows={4}
      placeholder="Entrer une description"
      value={description}
      onChange={ (e) => setDescription(e.target.value) }
    ></textarea>
  </div>
  
  <div className="mb-4">
  <label className="form-label">Créé par</label>
  <input
    className="form-control custom-input"
    value={myprofile?.username || ""}
    readOnly
  />
</div>
  

  <button type="submit" className="custom-btn">
    Ajouter la note
  </button>
  <button className="custom-btn">
    <Link to={`/`} style={{textDecoration: "none" , color: "black" }}>
    Annuler
    </Link>
  </button>
</form>

    </>
  )
}

export default AddProjectPage
