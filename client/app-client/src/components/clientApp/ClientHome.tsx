
import ProjectList from "../manage/client/ProjectList";
import decodeToken from "../centeral/authUtils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/Store";
import { useEffect, useState } from "react";
import { fetchProjectsByClientId } from "../store/ProjectSlice";

const ClientHome = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading, error } = useSelector((state: RootState) => state.projects); // נניח שיש לך ProjectSlice
  const [projectIdToShow, setProjectIdToShow] = useState<number | null>(null);

  if (!token) return null;
  const payload = decodeToken(token);
  if (!payload) return null;
  const clientId = payload.sub;

  useEffect(() => {
    const lastProjectId = localStorage.getItem("lastVisitedProject");
    if (lastProjectId) {
      setProjectIdToShow(parseInt(lastProjectId));
    } else {
      dispatch(fetchProjectsByClientId(Number(clientId)));
    }
  }, [clientId, dispatch]);

  useEffect(() => {
    if (!projectIdToShow && projects.length > 0) {
      const lastProject = projects[projects.length - 1];
      setProjectIdToShow(lastProject.id);
    }
  }, [projects, projectIdToShow]);

  useEffect(() => {
    if (projectIdToShow) {
      navigate(`/ClientPage/${clientId}/ProjectPage/${projectIdToShow}`);
    }
  }, [projectIdToShow, clientId, navigate]);

  const styles = {
    container: "flex justify-center items-center h-screen bg-blue-50",
    text: "text-2xl font-bold text-blue-900 text-center",
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.text}>טוען פרויקט...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.text}>שגיאה בטעינת הפרויקטים.</p>
      </div>
    );
  }

  if (projects.length === 0 && !projectIdToShow) {
    return (
      <div className={styles.container}>
        <p className={styles.text}>אין לך עדיין פרויקטים.</p>
      </div>
    );
  }

  return null;
};

export default ClientHome;
