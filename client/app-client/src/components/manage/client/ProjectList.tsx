import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/Store";
import { ProjectDto, fetchProjectsByClientId } from "../../store/ProjectSlice";

const ProjectList = ({ clientId }: { clientId: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { projects, loading, error } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchProjectsByClientId(clientId));
    }
  }, [dispatch, clientId]);

  const handleViewProject = (projectId: any) => {
    navigate(`ProjectPage/${projectId}`)
  };
  if (loading) return <p>Loading projects...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div >
      <h3>Projects:</h3>
      <div className="list-container">
        <ul className="list">
          {projects.length > 0 ? (
            projects.map((project: ProjectDto) => (
              <li key={project.id} className="list-item">
                <button
                  className="project-button"
                  onClick={() => handleViewProject(project.id)}
                >
                  {project.description}
                </button>
              </li>
            ))
          ) : (
            <p>No projects found for this client.</p>
          )}
        </ul>
      </div>
    </div>
  );
};


export default ProjectList;
