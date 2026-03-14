import React from 'react'
import { FaSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";


const NavBar = ({search, handleSearch}) => {
  return (


<>
<nav
  className="navbar navbar-expand-lg bg-white shadow-sm"
  style={{
    padding: "15px 50px",
    fontFamily: "Arial, sans-serif",
  }}>

  <div className="container-fluid d-flex align-items-center justify-content-between">

   
    <a
      className="navbar-brand m-0"
      href="/"
      style={{ textDecoration: "none" }}
    >
      <h4
        className="m-0"
        style={{
          fontWeight: "700",
          letterSpacing: "1px",
          color: "#a00050",
        }}
      >
        ESMT | Gestion des projets
      </h4>
    </a>


{/* Barre de recherche */}
<div
  className="d-flex align-items-center flex-grow-1 mx-4"
  style={{ maxWidth: "480px" }}
>
  <input
    type="search"
    placeholder="Rechercher un projet..."
    className="form-control"
    style={{
      borderRadius: "30px 0 0 30px",
      border: "1px solid #eee",
      height: "42px",
      paddingLeft: "18px",
      boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
      borderRight: "none"
    }}
    value={search}
    onChange={(e) => handleSearch(e.target.value) }

  />

  <button
    className="btn"
    style={{
      backgroundColor: "#a00050",
      color: "white",
      borderRadius: "0 30px 30px 0",
      padding: "0 22px",
      height: "42px",
      fontWeight: "500",
      border: "1px solid #a00050",
      transition: "0.2s"
    }}
    onMouseOver={(e)=> e.currentTarget.style.opacity = "0.85"}
    onMouseOut={(e)=> e.currentTarget.style.opacity = "1"}
  >
    Rechercher
  </button>
</div>

   

    {/* Add Button */}
    <Link to="/add-notes" style={{ textDecoration: "none" }}>
      <button
        className="btn"
        type="button"
        style={{
          backgroundColor: "#a00050",
          color: "white",
          padding: "10px 24px",
          borderRadius: "28px",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "0 5px 14px rgba(160,0,80,0.3)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 18px rgba(160,0,80,0.35)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 5px 14px rgba(160,0,80,0.3)";
        }}
      >
        <FaSquarePlus size={18} />
        Nouveau projet
      </button>
    </Link>
  </div>
</nav>
</>


  )
}

export default NavBar
