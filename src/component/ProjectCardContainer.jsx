import React from 'react'
import ProjectCard from './ProjectCard'
import Loader from '../component/loader'

const ProjectCardContainer = ({project , loading}) => {
  return (
    <>
    <div className="container-fluid px-4">
      <div className="note-has-grid row">
        
        { loading && <Loader loading={loading} /> }
        { Array.isArray(project) && project.map(p => <ProjectCard key={p.id} project={p} />) }

      </div>
    </div>
    </>
  )
}

export default ProjectCardContainer
