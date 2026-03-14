import React, { useEffect, useState } from "react"
import axios from "axios"
import "./Profile.css"

const Profile = () => {

  const [myprofile, setMyprofile] = useState(null)

  const [editMode, setEditMode] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    axios.get("http://127.0.0.1:8008/my-profile/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    .then(res => {
      setMyprofile(res.data)
      setUsername(res.data.username)
      setEmail(res.data.email)
    })
  }, [])


  const updateProfile = () => {
    axios.put("http://127.0.0.1:8008/my-profile/", {
      username: username,
      email: email
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("access_token")}`
      }
    })
    .then(res=>{
      setMyprofile(res.data)
      setEditMode(false)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  

  if(!myprofile){
    return <p>Chargement du profil...</p>
  }

  
  return (
    <>

<div className="profile-actions">

{editMode ? (
<button onClick={updateProfile}>
Sauvegarder
</button>
) : (
<button onClick={()=>setEditMode(true)}>
Modifier
</button>
)}

</div>

  <div className="profile-container">
    <h4>{myprofile.role} {myprofile.username} </h4>
    <div className="profile-info">

<p>
<span>Utilisateur :</span>

{editMode ? (
<input
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>
) : (
myprofile.username
)}

</p>


<p>
<span>Email :</span>

{editMode ? (
<input
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
) : (
myprofile.email
)}

</p>

<p><span>Role :</span> {myprofile.role}</p>

</div>
  </div>

  

  </>

  )
}

export default Profile