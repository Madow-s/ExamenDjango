import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const AddTaskPage = ({profile, addTask }) => {

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



  const { id } = useParams()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dateLimit, setDateLimit] = useState("")
  const [status, setStatus] = useState("a_faire")
  const [selectedProfile, setSelectedProfile] = useState("")
  
  const newTask = {
    title: title,
    description: description,
    date_limit: dateLimit,
    status: status,
    profile: selectedProfile,
    project: id
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title && !description && !dateLimit && !profile ){
      return;
    }
    addTask(newTask)
    navigate(`/list-taches/${id}` , { replace: true })
    window.location.reload()
    console.log(newTask)
  }

  return (

<form className="custom-form" onSubmit={handleSubmit}>

<h4 className="form-title">Ajouter une tâche</h4>

<div className="mb-4">
<label className="form-label">Titre</label>
<input
type="text"
className="form-control custom-input"
placeholder="Titre de la tâche"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>
</div>

<div className="mb-4">
<label className="form-label">Description</label>
<textarea
className="form-control custom-input"
rows={4}
placeholder="Description de la tâche"
value={description}
onChange={(e) => setDescription(e.target.value)}
></textarea>
</div>

<div className="mb-4">
<label className="form-label">Date limite</label>
<input
type="datetime-local"
className="form-control custom-input"
value={dateLimit}
onChange={(e) => setDateLimit(e.target.value)}
/>
</div>

<div className="mb-4">
<label className="form-label">Status</label>
<select
className="form-control custom-input"
value={status}
onChange={(e) => setStatus(e.target.value)}
>
<option value="a_faire">À faire</option>
<option value="en_cours">En cours</option>
<option value="termine">Terminé</option>
</select>
</div>

<div className="mb-4">
<label className="form-label">Assigné à</label>
<select
className="form-control custom-input"
value={selectedProfile}
onChange={(e) => setSelectedProfile(e.target.value)}
>

<option value="">Choisir un profil</option>

{Array.isArray(profile) && profile.map((p) => (
  <option key={p.id} value={p.id}>
    {p.username ?? "x"}
  </option>
))}

</select>
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
Ajouter la tâche
</button>

<button className="custom-btn">
  <Link to={`/`} style={{textDecoration: "none" , color: "black" }}>
  Annuler
  </Link>
</button>

</form>

  )
}

export default AddTaskPage