import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import "./form.css"


function LoginPage() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    
   // login
axios.post("http://127.0.0.1:8008/api/token/", {
  username,
  password
}).then(res => {
  localStorage.setItem("access_token", res.data.access);
  localStorage.setItem("refresh_token", res.data.refresh);
  axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
  navigate("/" , { replace: true });
});
  }

  return (

    <div className="custom-form">

      <h2 className="form-title">Connexion</h2>

      <form onSubmit={handleLogin}>

        <div className="input-group">
          <input
            className="custom-input"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            className="custom-input"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>

        <button className="custom-btn" type="submit">
          Login
        </button>

      </form>
          <Link
            to="/register"
            className="nav-link text-white"
            style={{ borderRadius: "8px" }}
          >
            Pas encore de compte ??
          </Link>

    </div>
  )
}

export default LoginPage