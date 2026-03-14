import React from 'react'
import Filter from '../component/Filter'
import ProjectCardContainer from '../component/ProjectCardContainer'
import Statistic from '../component/statistic'
import "./HomePage.css"



const HomePage = ({ project , loading , statistic }) => {
  return (
    <>
      <Statistic  statistic={statistic} />
      <h3 className=" mt-4 mb-4" style={{marginLeft: "auto", color: "#a00050" }}></h3>
      <ProjectCardContainer project={project} loading={loading} />
    </>
  )
}

export default HomePage
