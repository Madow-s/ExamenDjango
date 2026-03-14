import React from 'react'
import NavBar from '../component/NavBar'
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../component/sidebar';
import "./MainLayout.css"





const MainLayout = ({project , myprofile, search, handleSearch}) => {
  return (
    <>
    <div className="page-wrapper">
    <Sidebar project={project} myprofile={myprofile} />
    <NavBar search={search} handleSearch={handleSearch} />
    <div className="page-content">
    <ToastContainer />
      <Outlet />
    </div>
</div>
    
      
    </>
  )
}

export default MainLayout
