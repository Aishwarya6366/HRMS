import React, { useState, useEffect } from "react";
import "./Attendance.css";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    status: "",
    workMode: "",
    employeeId: "",
  });

  const [editing, setEditing] = useState(null);

  // Load saved records
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hr_att_table")) || [];
    setRecords(saved);
  }, []);

  // Save on update
  useEffect(() => {
    localStorage.setItem("hr_att_table", JSON.stringify(records));
  }, [records]);

  // --------------------------------------------------
  // Auto Calculation (Without OT)
  // --------------------------------------------------
  function autoCalculate(data) {
    const { checkIn, checkOut, breakMinutes } = data;
    if (!checkIn || !checkOut) return data;

    const ci = new Date(`2024-01-01 ${checkIn}`);
    const co = new Date(`2024-01-01 ${checkOut}`);

    let minutes = (co - ci) / 60000;
    if (breakMinutes) minutes -= Number(breakMinutes);

    const totalHours = (minutes / 60).toFixed(2);

    const shiftStart = new Date("2024-01-01 09:00");
    const shiftEnd = new Date("2024-01-01 18:00");

    const late = Math.max(0, Math.round((ci - shiftStart) / 60000));
    const earlyExit = Math.max(0, Math.round((shiftEnd - co) / 60000));

    return {
      ...data,
      totalHours,
      lateMinutes: late,
      earlyExit,
    };
  }

  // --------------------------------------------------
  // Edit popup trigger
  // --------------------------------------------------
  function openEdit(record) {
    setEditing(record);
  }

  // --------------------------------------------------
  // Save Edited Attendance
  // --------------------------------------------------
  function saveEdit() {
    const updated = autoCalculate(editing);

    setRecords((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );

    setEditing(null);
  }

  // --------------------------------------------------
  // Delete Attendance
  // --------------------------------------------------
  function deleteRecord(id) {
    if (!confirm("Delete this record?")) return;
    setRecords(records.filter((r) => r.id !== id));
  }

  // --------------------------------------------------
  // Filters + Search Logic
  // --------------------------------------------------
  const filtered = records.filter((r) => {
    if (search && !r.employeeId.toLowerCase().includes(search.toLowerCase()))
      return false;

    if (filters.status && r.status !== filters.status) return false;
    if (filters.workMode && r.workMode !== filters.workMode) return false;

    if (filters.from && r.date < filters.from) return false;
    if (filters.to && r.date > filters.to) return false;

    return true;
  });

  return (
    <div className="attendance-wrapper-only-table">
      <h2>Attendance Records</h2>

      {/* ---------------------- FILTER BAR ---------------------- */}
      <div className="search-wrapper">
  <span className="search-icon">🔍</span>
  <input
    className="search-input"
    placeholder="Search Employee ID"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />



        <input
          type="date"
          value={filters.from}
          onChange={(e) => setFilters({ ...filters, from: e.target.value })}
        />

        <input
          type="date"
          value={filters.to}
          onChange={(e) => setFilters({ ...filters, to: e.target.value })}
        />

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
          <option value="WFH">WFH</option>
        </select>

        <select
          value={filters.workMode}
          onChange={(e) => setFilters({ ...filters, workMode: e.target.value })}
        >
          <option value="">Mode</option>
          <option value="Office">Office</option>
          <option value="WFH">WFH</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* ---------------------- TABLE ---------------------- */}
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
            <th>Mode</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Total</th>
            <th>Late</th>
            <th>Early Exit</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((r) => (
            <tr key={r.id}>
              <td>{r.employeeId}</td>
              <td>{r.date}</td>
              <td>{r.status}</td>
              <td>{r.workMode}</td>
              <td>{r.checkIn}</td>
              <td>{r.checkOut}</td>
              <td>{r.totalHours}</td>
              <td>{r.lateMinutes}</td>
              <td>{r.earlyExit}</td>
              <td>
                <button className="edit-btn" onClick={() => openEdit(r)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => deleteRecord(r.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------------------- EDIT MODAL ---------------------- */}
      {editing && (
        <div className="modal-bg">
          <div className="modal-box">
            <h3>Edit Attendance</h3>

            <label>Check-In</label>
            <input
              type="time"
              value={editing.checkIn}
              onChange={(e) =>
                setEditing({ ...editing, checkIn: e.target.value })
              }
            />

            <label>Check-Out</label>
            <input
              type="time"
              value={editing.checkOut}
              onChange={(e) =>
                setEditing({ ...editing, checkOut: e.target.value })
              }
            />

            <label>Break (min)</label>
            <input
              value={editing.breakMinutes}
              onChange={(e) =>
                setEditing({ ...editing, breakMinutes: e.target.value })
              }
            />

            <button className="save-btn" onClick={saveEdit}>
              Save Changes
            </button>

            <button className="cancel-btn" onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
