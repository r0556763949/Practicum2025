// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { AppDispatch, RootState } from "../../store/Store";
// import { ProjectDto, deleteProject, fetchProjectsByClientId } from "../../store/ProjectSlice";

// const ProjectList = ({ clientId }: { clientId: any }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { projects, loading, error } = useSelector((state: RootState) => state.projects);

//   useEffect(() => {
//     if (clientId) {
//       dispatch(fetchProjectsByClientId(clientId));
//     }
//   }, [dispatch, clientId]);

//   const handleViewProject = (projectId: any) => {
//     navigate(`ProjectPage/${projectId}`)
//   };
  
//   const handleDeleteProject = (projectId: any) => {
//     if (window.confirm("Are you sure you want to delete this project?")) {
//       dispatch(deleteProject({ clientId, projectId }));
//     }
//   };

//   if (loading) return <p>Loading projects...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div >
//       <h3>Projects:</h3>
//       <div className="list-container">
//         <ul className="list">
//           {projects.length > 0 ? (
//             projects.map((project: ProjectDto) => (
//               <li key={project.id} className="list-item">
//                 <button
//                   className="project-button"
//                   onClick={() => handleViewProject(project.id)}
//                 >
//                   {project.description}
//                 </button>
//                 <button
//                   className="delete-button"
//                   onClick={() => handleDeleteProject(project.id)}
//                 >
//                   D
//                 </button>
//               </li>
//             ))
//           ) : (
//             <p>No projects found for this client.</p>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };


// export default ProjectList;

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { AppDispatch, RootState } from "../../store/Store"
import { type ProjectDto, deleteProject, fetchProjectsByClientId } from "../../store/ProjectSlice"
import { Calendar, Folder, Loader, MapPin, Trash2, AlertCircle } from "lucide-react"

const ProjectList = ({ clientId }: { clientId: any }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { projects, loading, error } = useSelector((state: RootState) => state.projects)
  const [currentProject, setCurrentProject] = useState<number | null>(null)

  useEffect(() => {
    if (clientId) {
      dispatch(fetchProjectsByClientId(clientId))
    }

    // Get current project from localStorage if available
    const lastVisitedProject = localStorage.getItem("lastVisitedProject")
    if (lastVisitedProject) {
      setCurrentProject(Number.parseInt(lastVisitedProject))
    }
  }, [dispatch, clientId])

  const handleViewProject = (projectId: any) => {
    localStorage.setItem("lastVisitedProject", projectId.toString())
    setCurrentProject(projectId)
    navigate(`ProjectPage/${projectId}`)
  }

  const handleDeleteProject = (projectId: any, e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm("האם אתה בטוח שברצונך למחוק פרויקט זה?")) {
      dispatch(deleteProject({ clientId, projectId }))
      if (currentProject === projectId) {
        setCurrentProject(null)
        localStorage.removeItem("lastVisitedProject")
      }
    }
  }

  if (loading)
    return (
      <div className="projects-loading">
        <Loader className="loading-icon" />
        <p>טוען פרויקטים...</p>
      </div>
    )

  if (error)
    return (
      <div className="projects-error">
        <AlertCircle className="error-icon" />
        <p>{error}</p>
      </div>
    )

  return (
    <div className="projects-container">
      <h3 className="projects-title">הפרויקטים שלי</h3>

      {projects.length === 0 ? (
        <div className="projects-empty">
          <Folder className="empty-icon" />
          <p>אין פרויקטים להצגה</p>
        </div>
      ) : (
        <div className="projects-list">
          {projects.map((project: ProjectDto) => (
            <div
              key={project.id}
              className={`project-item ${currentProject === project.id ? "active" : ""}`}
              onClick={() => handleViewProject(project.id)}
            >
              <div className="project-icon">
                <Folder />
              </div>
              <div className="project-details">
                <h4 className="project-name">{project.description}</h4>
                {project.address && (
                  <div className="project-meta">
                    <MapPin className="meta-icon" />
                    <span className="meta-text">{project.address}</span>
                  </div>
                )}
                {project.startAt && (
                  <div className="project-meta">
                    <Calendar className="meta-icon" />
                    <span className="meta-text">{new Date(project.startAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <button
                className="project-delete"
                onClick={(e) => handleDeleteProject(project.id, e)}
                aria-label="מחק פרויקט"
              >
                <Trash2 className="delete-icon" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectList

