import React, { useEffect, useState } from "react"
import axios from "../services/axios"
import "./PrimesPages.css"

const PrimesPages = () => {

  const [primes, setPrimes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("http://127.0.0.1:8008/primes/")
    .then(res => {
      setPrimes(res.data)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
    })

  }, [])



  if(loading){
    return <p>Chargement...</p>
  }




  return (

    
    <div className="primes-container">

      <h2>Liste des Professeurs</h2>

      <table className="primes-table">

        <thead>
          <tr>
            <th>Professeur</th>
            <th>Email</th>
            <th>Prime</th>
          </tr>
        </thead>

        <tbody>

        {primes && primes.map((prof) => (

          <tr key={prof.id}>

            <td>{prof.username}</td>
            <td>{prof.email}</td>

            <td>
              {prof.prime ? (
                <span style={{color: "black"}}  className="prime-yes">Oui</span>
              ) : (
                <span style={{color: "black"}}  className="prime-no">Non</span>
              )}
            </td>

          </tr>

        ))}

        </tbody>

      </table>

    </div>
  )
}

export default PrimesPages