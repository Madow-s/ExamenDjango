import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaHome, FaProjectDiagram, FaUser } from "react-icons/fa";
import axios from "axios";

const Sidebar = ({}) => {

  const navigate = useNavigate()
  function logout(){
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
  
    navigate("/login", { replace: true })
  }


    
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




  return (
    <div
      className="d-flex flex-column p-3 text-white"
      style={{
        width: "200px",
        height: "100vh",
        backgroundColor: "#a00050",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto"
        
        
      }}
    >
      <h4 className="mb-4  text-center" style={{ color: "white" }}>
        Menu
      </h4>
      

      <ul className="nav nav-pills flex-column mb-auto mt-4">
        <li>
        <div className="sidebar-profile">

     {myprofile && (
     <>
      <h4>{myprofile.username}</h4>
      <p>{myprofile.role}</p>
    </>
  )}
</div>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/"
            className="nav-link text-white"
            style={{ borderRadius: "8px" }}
          >
            <FaHome className="me-2" />
            Accueil
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to={`/add-notes`}
            className="nav-link text-white"
            style={{ borderRadius: "8px" }}
          >
            <FaProjectDiagram className="me-2" />
            Ajouter Projets
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/primes"
            className="nav-link text-white"
            style={{ borderRadius: "8px" }}
          >
            <FaProjectDiagram className="me-2" />
            Prime
          </Link>
        </li>


        <li className="nav-item mb-2">
          <Link
            to="/profile"
            className="nav-link text-white"
            style={{ borderRadius: "8px" }}
          >
            <FaUser className="me-2" />
            Profil
          </Link>
        </li>

        <li className="nav-item mb-2">
            <button className="nav-link text-white"
            style={{ borderRadius: "8px" }}
            onClick={logout}>Deconnexion</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;