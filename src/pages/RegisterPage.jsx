import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import "./form.css"




export default function RegisterPage() {

        const [username, setUsername] = useState("")
        const [email, setEmail] = useState("")
        const [password1, setPassword1] = useState("")
        const [password2, setPassword2] = useState("")
        const [role, setRole] = useState("ETUDIANT")

        const navigate = useNavigate()

      
        const handleSubmit = (e) => {
          e.preventDefault()
          axios.post("http://127.0.0.1:8008/register/", {
            username,
            email,
            password1,
            password2,
            role
          })
          .then(res =>
             console.log("Utilisateur créé !"),
             navigate("/login")
            )

          .catch(err => {
            console.log(err.response.data) // 🔥 Très important pour debug
            alert("Erreur lors de l'inscription")
          })
        }
      
        return (
          <div className="custom-form">

<h2 className="form-title">Inscription</h2>

<form onSubmit={handleSubmit}>

<div className="input-group">
<input className="custom-input" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
</div>

<div className="input-group">
<input className="custom-input" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
</div>

<div className="input-group">
<input className="custom-input" type="password" placeholder="Mot de passe" onChange={(e)=>setPassword1(e.target.value)} />
</div>

<div className="input-group">
<input className="custom-input" type="password" placeholder="Confirmer mot de passe" onChange={(e)=>setPassword2(e.target.value)} />
</div>

<div className="input-group">
<select className="custom-input" onChange={(e)=>setRole(e.target.value)} value={role}>
<option value="ETUDIANT">Etudiant</option>
<option value="PROFESSEUR">Professeur</option>
</select>
</div>

<button className="custom-btn" type="submit">
S'inscrire
</button>

</form>
            <Link
              to="/login"
              className="nav-link text-white"
              style={{ borderRadius: "8px" }}
            >
              Vous avez deja un compte ??
            </Link>

</div>
        )
      }