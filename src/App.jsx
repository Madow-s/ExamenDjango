import React, { useEffect, useState } from 'react'
import { Navigate } from "react-router-dom";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import AddProjectPage from './pages/AddProjectPage'
import ProjectDetails from './pages/ProjectDetails'
import ProjectEditPage from './pages/ProjectEditPage'
import axios from "./services/axios";
import { toast } from 'react-toastify';
import ProjectDetailsTasks from './pages/ProjectDetailsTasks'
import AddTaskPage from './pages/AddTaskPage'
import EditTaskPage from './pages/EditTaskPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TaskDetails from './pages/TaskDetails'
import Profile from './pages/Profile'
import PrimesPages from './pages/PrimesPages';



const App = () => {

  const [tasks , setTasks] = useState([])
  const [project, setProject ] = useState([])
  const [profile , setProfile] = useState([])
  const [myprofile , setMyprofile] = useState([])
  const [statistic , setStatistic] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [search , setSearch] = useState("")

  const [filter , setFilter] = useState("")

  const handleFilter = (val) => {
    setFilter(val)
  }
  
  const filteredTask = filter === "a_faire" ? tasks.filter((task) => task.status=="a_faire") 
  : filter === "en_cours" ? tasks.filter((task) => task.status=="en_cours")
  : filter === "termine" ? tasks.filter((task) => task.status=="termine") : tasks


  const handleSearch = (val) => {
    setSearch(val)
  }

  
  useEffect(() => {
    axios.get(`http://127.0.0.1:8008/search_projects/?search=${search}`)
    .then(res => {
      console.log(res.data)
      setProject(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [search])
  




const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};




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



  useEffect(() => {
    setIsLoading(true)
    axios.get("http://127.0.0.1:8008/project/")
    .then(res => {
      console.log(res.data)
      setProject(res.data)
      setIsLoading(false)

    })
    .catch(err => {
      console.log(err.message)
    })
  }, [])


  
  useEffect(() => {
    setIsLoading(true)
    axios.get("http://127.0.0.1:8008/tache/")
    .then(res => {
      console.log(res.data)
      setTasks(res.data)
      setIsLoading(false)

    })
    .catch(err => {
      console.log(err.message)
    })
  }, [])


  
  useEffect(() => {
    setIsLoading(true)
    axios.get("http://127.0.0.1:8008/profile/")
    .then(res => {
      console.log(res.data)
      setProfile(res.data)
      setIsLoading(false)

    })
    .catch(err => {
      console.log(err.message)
    })
  }, [])




  
  useEffect(() => {
    setIsLoading(true)
    axios.get("http://127.0.0.1:8008/statistiques/")
    .then(res => {
      console.log(res.data)
      setStatistic(res.data)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err.message)
    })
  }, [])

 



  const addProject = (data) =>{
    axios.post("http://127.0.0.1:8008/project/", data)
    .then(res => {
      setProject([...project, res.data])
      console.log(res.data)

      toast.success('Nouveau projet ajouté !!')

    })
    .catch(err => {
      console.log(err.message)
    })
  }


  

  const addTask = (data) =>{
    axios.post("http://127.0.0.1:8008/tache/", data)
    .then(res => {
      setTasks([...tasks, res.data])
      console.log(res.data)
      toast.success('Nouvelle Tache ajouté !!')

    })
    .catch(err => {
      console.log(err.message)
    })
  }




  const updateProject = (data , id) =>{
    axios.put(`http://127.0.0.1:8008/project/${id}`, data)
    .then(res => {
      console.log(res.data)
      toast.success('Projet edité avec succes !!')
    })
    .catch(err => {
      console.log(err.message)
    })

  }




  
  const updateTask = (data , id) =>{
    axios.put(`http://127.0.0.1:8008/tache/${id}`, data)
    .then(res => {
      console.log(res.data)
      toast.success('Tache edité avec succes !!')
    })
    .catch(err => {
      console.log(err.message)
    })

  }




  const deleteTask = (id) => {
    console.log("ID reçu :", id)
    axios.delete(`http://127.0.0.1:8008/tache/${id}`)
    .catch(err => {
      console.error(err.message)
    })
  }




  const deleteProject = (id) => {
    axios.delete(`http://127.0.0.1:8008/project/${id}`)
    .catch(err => {
      console.log(err.message)
    })
  }
  






  const router = createBrowserRouter(createRoutesFromElements(

    <>
    {/* Routes hors layout */}
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />


    <Route path='/' element={<PrivateRoute> <MainLayout project={project} myprofile={myprofile} search={search} handleSearch={handleSearch} /> </PrivateRoute>}>
      <Route index element={<HomePage project={project} loading={isLoading} statistic={statistic}  />} />

      <Route path='/add-notes' element={<AddProjectPage addProject={addProject} />} />
      <Route path='/add-tasks/:id' element={<AddTaskPage  profile={profile} addTask={addTask}  />} />


      <Route path='/edit-note/:id' element={<ProjectEditPage updateProject={updateProject} />} />
      <Route path='/edit-tache/:id' element={<EditTaskPage updateTask={updateTask} profile={profile} tasks={tasks} />} />


      <Route path='/notes/:id' element={<ProjectDetails deleteProject={deleteProject} />} />
      <Route path='/tache/:id' element={<TaskDetails deleteTask={deleteTask}  />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/primes" element={<PrimesPages />} />


      <Route path='/list-taches/:id' element={<ProjectDetailsTasks tasks={filteredTask} loading={isLoading} handleFilter={handleFilter} />} />


    </Route>
    </>
    
  ))

  return  <RouterProvider router={router} />
}

export default App
