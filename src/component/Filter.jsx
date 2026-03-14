import React from 'react'

const Filter = ({handleFilter}) => {
  return (
    <div className="container" style={{width: "500px", margin: "5px auto"}}>
        <select className="form-select" aria-label="Default select example" 
        style={{height: "50px"}} 
        onChange={(e) => handleFilter(e.target.value)} 
        >
        <option value="all">Tout</option>
        <option value="a_faire">À faire</option>
        <option value="en_cours">En cours</option>
        <option value="termine">Terminé</option>
        </select>
      </div>
    
  )
}

export default Filter
