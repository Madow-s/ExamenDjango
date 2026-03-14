import React from 'react'
import FormatDate from "../component/FormatDate"
import { FaNoteSticky } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import FormatDateForInput from './formatDateForInput';


const ProjectCard = ({project}) => {
    const description = `${project.description.split(" ").slice(0, 20).join(" ")} ...`
    const color = project.title == 'Site1'? '#a00050' : project.title == 'site2' ? 'blue' : 'purple'



  return (
    <>
    <div className=" col-lg-3 col-md-4 col-sm-6 single-note-item all-category" style={{width: "30%"}}>
                <div className="card card-body">
                <FaNoteSticky style={{marginLeft: "auto", color: color }}/>
                <div className="d-flex align-items-center gap-2">
                <span className="side-stick" style={{
                    backgroundColor: color,
                    width: "3px",
                    height: "30px",
                    }}
                    ></span>
                    <Link to={`/notes/${project.id}`} style={{textDecoration: "none" , color: 'black' }}>
                    <h5 className="note-title mb-0 fw-semibold" data-noteheading="Book a Ticket for Movie"> {project.title} </h5>
                    </Link>   
                </div>                 
                
                    <p className="note-date font-12 text-muted">Crée le : {FormatDate(project.created_at)} </p>
                    <p className="note-date  text-muted"> par :{project.created_by} </p>

                    <div className="note-content">
                        <p className="note-inner-content text-muted" > {description}</p>
                    </div>

                    <Link to={`/list-taches/${project.id}`} style={{textDecoration: "none", color: "black"}}>
                    <p className="font-6 text-muted">Taches</p>
                    </Link> 

                    
                    <div className="d-flex align-items-center">
                       
                    </div>
                </div>
            </div>
    </>
  )
}

export default ProjectCard
