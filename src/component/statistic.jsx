import React from 'react'

const statistic = ({statistic}) => {
 
if (!statistic) {
    return <p>Chargement des statistiques...</p>;
}

return (
    <>
    <div className="container">

        <div className="stats-grid">

            <div className="stat-card">
                <p>Total des tâches : {statistic.total_taches}</p>
            </div>

            <div className="stat-card">
                <p>Tâches terminées : {statistic.taches_terminees}</p>
            </div>

            <div className="stat-card">
                <p>Respect des délais : {statistic.respect_delai}</p>
            </div>

            <div className="stat-card">
                {statistic && ( <p>Taux de réussite : {statistic.taux_reussite}%</p>)}
            </div>

        </div>

    </div>

      
    </>
  )
}

export default statistic
