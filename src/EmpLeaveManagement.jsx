import React, { useEffect, useState } from "react";
import "./EmpLeaveManagement.css";

const BASE = "http://localhost:8080";

export default function EmpLeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: ""
  });

  /* ================= LOAD LEAVES ================= */
  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const res = await fetch(`${BASE}/list`, {
        credentials: "include"
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setLeaves(Array.isArray(data) ? data : []);
    } catch {
      alert("Failed to load leave history");
    }
  };

  /* ================= APPLY LEAVE ================= */
  const applyLeave = async () => {
    if (!form.leaveType || !form.startDate || !form.endDate || !form.reason) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch(`${BASE}/apply`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error();

      setForm({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: ""
      });

      loadLeaves();
    } catch {
      alert("Failed to apply leave");
    }
  };

  /* ================= DELETE LEAVE ================= */
  const deleteLeave = async (leaveId) => {
    if (!leaveId) {
      alert("Leave ID missing");
      return;
    }

    if (!window.confirm("Delete this leave request?")) return;

    try {
      const res = await fetch(`${BASE}/leave/${leaveId}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (!res.ok) throw new Error();

      loadLeaves();
    } catch {
      alert("Delete failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="emp-leave">
      <h2>Apply Leave</h2>

      <div className="form">
        <select
          value={form.leaveType}
          onChange={(e) =>
            setForm({ ...form, leaveType: e.target.value })
          }
        >
          <option value="">Select Leave Type</option>
          <option value="SICK_LEAVE">Sick Leave</option>
          <option value="CASUAL">Casual Leave</option>
          <option value="ANNUAL">Annual Leave</option>
        </select>

        <input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({ ...form, startDate: e.target.value })
          }
        />

        <input
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({ ...form, endDate: e.target.value })
          }
        />

        <textarea
          placeholder="Reason"
          value={form.reason}
          onChange={(e) =>
            setForm({ ...form, reason: e.target.value })
          }
        />

        <button onClick={applyLeave}>Apply Leave</button>
      </div>

      <h2>My Leave History</h2>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.length === 0 && (
            <tr>
              <td colSpan="5">No leave requests</td>
            </tr>
          )}

          {leaves.map((l) => (
            <tr key={l.leaveId}>
              <td>{l.leaveType}</td>
              <td>{l.startDate}</td>
              <td>{l.endDate}</td>
              <td className={`status ${l.leaveStatus?.toLowerCase()}`}>
                {l.leaveStatus}
              </td>
              <td>
                {l.leaveStatus === "PENDING" ? (
                  <>
                    <button className="edit">Edit</button>
                    <button
                      className="danger"
                      onClick={() => deleteLeave(l.leaveId)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
