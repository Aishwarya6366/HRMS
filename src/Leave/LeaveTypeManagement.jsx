import React, { useState } from "react";
import "./LeaveTypeManagement.css";

const LeaveTypeManagement = () => {
  const [leaveTypes, setLeaveTypes] = useState([
    { id: 1, name: "Casual Leave (CL)", quota: 12, carryForward: "Yes", limit: 6 },
    { id: 2, name: "Sick Leave (SL)", quota: 10, carryForward: "No", limit: 0 },
    { id: 3, name: "Privilege Leave (PL)", quota: 15, carryForward: "Yes", limit: 10 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    quota: "",
    carryForward: "No",
    limit: "",
  });

  const openAddModal = () => {
    setEditMode(false);
    setFormData({ id: "", name: "", quota: "", carryForward: "No", limit: "" });
    setShowModal(true);
  };

  const openEditModal = (type) => {
    setEditMode(true);
    setFormData(type);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this leave type?")) {
      setLeaveTypes(leaveTypes.filter((lt) => lt.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      setLeaveTypes(
        leaveTypes.map((lt) => (lt.id === formData.id ? formData : lt))
      );
    } else {
      setLeaveTypes([
        ...leaveTypes,
        { ...formData, id: Date.now() },
      ]);
    }

    setShowModal(false);
  };

  return (
    <div className="ltm-container">
      <h1 className="ltm-title">Leave Type Management</h1>
      <p className="ltm-subtitle">Manage leave rules, quotas and configurations.</p>

      <button className="add-btn" onClick={openAddModal}>+ Add Leave Type</button>

      {/* TABLE */}
      <table className="ltm-table">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Annual Quota</th>
            <th>Carry Forward</th>
            <th>Carry Forward Limit</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaveTypes.map((lt) => (
            <tr key={lt.id}>
              <td>{lt.name}</td>
              <td>{lt.quota}</td>
              <td>{lt.carryForward}</td>
              <td>{lt.limit}</td>
              <td>
                <button className="edit-btn" onClick={() => openEditModal(lt)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(lt.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div className="ltm-modal-overlay">
          <div className="ltm-modal">
            <h2>{editMode ? "Edit Leave Type" : "Add Leave Type"}</h2>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <label>Leave Type Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              {/* Quota */}
              <label>Annual Quota *</label>
              <input
                type="number"
                required
                value={formData.quota}
                onChange={(e) => setFormData({ ...formData, quota: e.target.value })}
              />

              {/* Carry Forward */}
              <label>Carry Forward Allowed?</label>
              <select
                value={formData.carryForward}
                onChange={(e) =>
                  setFormData({ ...formData, carryForward: e.target.value })
                }
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              {/* Limit */}
              <label>Carry Forward Limit</label>
              <input
                type="number"
                value={formData.limit}
                onChange={(e) =>
                  setFormData({ ...formData, limit: e.target.value })
                }
              />

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  {editMode ? "Update" : "Save"}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default LeaveTypeManagement;
