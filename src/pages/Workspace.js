import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskManager from "../modules/task-manager/TaskManager";
import { useSelector } from "react-redux";

const Workspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("workspaces"));

    // Si pas encore initialisé du tout
    if (!saved || !Array.isArray(saved)) {
      saved = [];
    }

    if (!saved.includes(id)) {
      if (saved.length === 0) {
        // Aucun workspace existant → créer "default"
        saved.push("Default");
        localStorage.setItem("workspaces", JSON.stringify(saved));
        localStorage.setItem("boards_Default", JSON.stringify([]));
        navigate("/workspace/Default");
      } else {
        // Redirige vers le premier workspace existant
        navigate(`/workspace/${saved[0]}`);
      }
    } else {
      setIsValid(true);
    }
  }, [id, navigate]);

  if (!isValid) return null;

  return (
    <div className={`workspace-page ${mode === "dark" ? "dark" : "light"}`}>
      <TaskManager workspaceId={id} />
    </div>
  );
};

export default Workspace;
