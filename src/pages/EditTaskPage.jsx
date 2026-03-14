import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FormatDateForInput from "../component/formatDateForInput"
import axios from "axios"

const EditTaskPage = ({ updateTask, profile }) => {

  const navigate = useNavigate()
  const { id } = useParams()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dateLimit, setDateLimit] = useState("")
  const [status, setStatus] = useState("a_faire")
  const [selectedProfile, setSelectedProfile] = useState("")
  const [projectId, setProjectId] = useState(null)

  // Préremplir le formulaire avec les données existantes
  useEffect(() => {
    axios.get(`http://127.0.0.1:8008/tache/${id}`)
      .then(res => {
        setTitle(res.data.title)
        setDescription(res.data.description)
        setDateLimit(FormatDateForInput(res.data.date_limit)) // 🔹 format ISO pour datetime-local
        setStatus(res.data.status)
        setSelectedProfile(res.data.profile) // l'id du profil
        setProjectId(res.data.project) // id du projet
        
      })
      .catch(err => console.log(err.message))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description || !dateLimit || !selectedProfile) return

    const updatedTask = {
      title,
      description,
      date_limit: dateLimit,
      status,
      profile: selectedProfile,
      project: projectId // 🔹 obligatoire si le backend attend le projet
    }

    console.log("Payload envoyée :", updatedTask)
    updateTask(updatedTask, id)
    navigate(`/list-taches/${projectId}`)
    window.location.reload()
  }

  return (
    <form className="custom-form" onSubmit={handleSubmit}>
      <h4 className="form-title">Modifier la tâche</h4>

      <div className="mb-4">
        <label className="form-label">Titre</label>
        <input type="text" className="form-control custom-input"
          placeholder="Titre de la tâche" value={title}
          onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="mb-4">
        <label className="form-label">Description</label>
        <textarea className="form-control custom-input" rows={4}
          placeholder="Description de la tâche" value={description}
          onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>

      <div className="mb-4">
        <label className="form-label">Date limite</label>
        <input type="datetime-local" className="form-control custom-input"
          value={dateLimit} onChange={(e) => setDateLimit(e.target.value)} />
      </div>

      <div className="mb-4">
        <label className="form-label">Status</label>
        <select className="form-control custom-input" value={status}
          onChange={(e) => setStatus(e.target.value)}>
          <option value="a_faire">À faire</option>
          <option value="en_cours">En cours</option>
          <option value="termine">Terminé</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label">Assigné à</label>
        <select className="form-control custom-input" value={selectedProfile}
          onChange={(e) => setSelectedProfile(e.target.value)}>
          <option value="">Choisir un profil</option>
          {profile.map(p => (
            <option key={p.id} value={p.id}>{p.username}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="custom-btn">Mettre à jour</button>
    </form>
  )
}

export default EditTaskPage