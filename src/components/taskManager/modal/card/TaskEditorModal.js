
import React, { useState, useEffect } from "react";
import "./TaskEditorModal.css";
import { BoardCardAccess, BaseModal } from "@components";

const TaskEditorModal = ({ modalData, closeModal, handleCreateOrUpdateCard, handleDeleteCard }) => {
  const isEdit = !!modalData.cardId;


  const [formData, setFormData] = useState({
    boardId: null,
    cardId: null,
    name: "",
    description: "",
    color: "#ffffff",
    state: 0,
    endAt: "",
    createdAt: new Date().toISOString().split("T")[0],
    image: "",
  });

  const [isEditing, setIsEditing] = useState(isEdit);

  useEffect(() => {
    // on est en mode création si pas de cardId
    const editing = !modalData.cardId || isEdit;
    setIsEditing(editing);

    if (modalData.card) {
      setFormData({
        boardId: modalData.boardId || null,
        cardId: modalData.cardId || null,
        name: modalData.card.name || "",
        description: modalData.card.description || "",
        color: modalData.card.color || "#ffffff",
        state: modalData.card.state ?? 0,
        endAt: modalData.card.endAt || "",
        createdAt: modalData.card.createdAt || new Date().toISOString().split("T")[0],
        image: modalData.card.image || ""
      });
    } else {
      // reset du formulaire en mode création
      setFormData((prev) => ({
        ...prev,
        boardId: modalData.boardId || null,
        cardId: null,
        name: "",
        description: "",
        color: "#ffffff",
        state: 0,
        endAt: "",
        createdAt: new Date().toISOString().split("T")[0],
        image: ""
      }));
    }
  }, [modalData, isEdit]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Cast en nombre pour le champ "state"
    const newValue = name === "state" ? parseInt(value, 10) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };


  const handleSubmit = () => {
    const { name, description, endAt, createdAt } = formData;
    if (!name.trim()) return alert("Le nom est requis.");
    if (!description.trim()) return alert("La description est requise.");

    const sanitizedData = {
      ...formData,
      name: name.trim(),
      description: description.trim(),
      endAt: endAt || null,
      createdAt: createdAt || new Date().toISOString().split("T")[0]
    };

    handleCreateOrUpdateCard(formData.boardId, formData.cardId, sanitizedData);
    closeModal();
  };

  const handleDelete = () => {
    if (formData.cardId) {
      handleDeleteCard(formData.boardId, formData.cardId);
      closeModal();
    }
  };

  return (
   <BaseModal onClose={closeModal} className={`tmedit`}>
        <button className="tm-close-btn" onClick={closeModal}></button>
          {isEdit && !isEditing && (
            <button className="tm-edit-btn" onClick={() => setIsEditing(true)}>✏️ Modifier</button>
          )}


        <h3>{isEdit ? (isEditing ? "Modifier une tâche" : "Détail de la tâche") : "Créer une tâche"}</h3>

        <label className="tm-label">Nom :
          <div className="tm-label-field">
            <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={!isEditing} />
          </div>
        </label>

        <label className="tm-label">Description :
          <div className="tm-label-field">
            <textarea name="description" value={formData.description} onChange={handleChange} disabled={!isEditing} />
          </div>
        </label>

        <div className="tm-color-state-fields">
          <label className="tm-label tm-color-picker">Couleur :
            <div className="tm-label-field">
              <input type="color" name="color" value={formData.color} onChange={handleChange} disabled={!isEditing} />
            </div>
          </label>

          <label className="tm-label tm-state-select">État :
            <div className="tm-label-field">
              <select name="state" value={formData.state} onChange={handleChange} disabled={!isEditing}>
                <option value={0}>À faire</option>
                <option value={1}>En cours</option>
                <option value={2}>Fait</option>
                <option value={3}>En attente</option>
              </select>
            </div>
          </label>
        </div>

        <div className="tm-date-fields">
          <label className="tm-label">Échéance :
            <div className="tm-label-field">
              <input type="date" name="endAt" value={formData.endAt} onChange={handleChange} disabled={!isEditing} />
            </div>
          </label>
        </div>

        <label className="tm-label">Image (URL) :
          <div className="tm-label-field">
            <input type="text" name="image" value={formData.image} onChange={handleChange} disabled={!isEditing} />
          </div>
        </label>

        <div className="tm-modal-buttons">
          <button onClick={handleSubmit}>{isEdit ? "Modifier" : "Créer"}</button>

          {BoardCardAccess.isOwner(modalData.card?.droit) && isEdit && isEditing && (
            <button className="tm-delete-btn" onClick={handleDelete}>Supprimer</button>
          )}

          <button className="tm-cancel-btn" onClick={closeModal}>Annuler</button>
        </div>


      </BaseModal>
  );
};

export default TaskEditorModal;