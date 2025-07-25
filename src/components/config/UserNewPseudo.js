import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ApiService } from "@service";
import { setUserData } from "@store";

const UserNewPseudo = ({ onUpdate }) => {
  const [user, setUser] = useState(null);
  const [pseudo, setPseudo] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await ApiService.getUser();

        if (!data || !data.id) {
          throw new Error("Utilisateur non trouvé");
        }

        setUser(data);
        setPseudo(data.pseudo || "");
      } catch {
        setError("Impossible de récupérer vos informations.");
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!pseudo.trim() || !user) return;

    setLoading(true);
    setError("");

      const responseApi = await ApiService.updateUser(user.id, { pseudo });
      if (responseApi.status === 409) {
        setError("Pseudo non disponible");
        setLoading(false);
        return
      }
      
      setEditing(false);
      setUser((prev) => ({ ...prev, pseudo }));
      onUpdate?.(pseudo);

      dispatch(setUserData({"pseudo": pseudo}));
      setLoading(false);
  };



  if (!user) {
    return <div>Chargement des informations utilisateur…</div>;
  }

  return (
    <div className="user-new-pseudo">
      <h3>Pseudo : </h3>

      {!editing ? (
        <>
          <span className="user-new-pseudo-name">{pseudo}</span>
          <button
            onClick={() => setEditing(true)}
            className="user-new-pseudo-edit"
          >
            ✎
          </button>
        </>
      ) : (
        <div className="user-new-pseudo-edit-form">
          <input
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
            disabled={loading}
          />
          <button
            onClick={handleSave}
            disabled={loading}
            className="user-new-pseudo-save"
          >
            {loading ? "…" : "✔"}
          </button>
          <button
            onClick={() => {
              setPseudo(user.pseudo);
              setEditing(false);
            }}
            disabled={loading}
            className="user-new-pseudo-cancel"
          >
            ✖
          </button>
          {error && <div className="user-new-pseudo-error">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default UserNewPseudo;
