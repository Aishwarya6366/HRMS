import React, { useEffect, useState } from "react";
import "./HrLeaveManagement.css";

const BASE = "http://localhost:8080";

export default function HrLeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await fetch(`${BASE}/leave/all`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLeaves(Array.isArray(data) ? data : []);
    } catch {
      alert("Unable to load leave requests");
    }
  };

  const updateStatus = async (leaveId, status) => {
    try {
      const res = await fetch(
        `${BASE}/leave/${leaveId}/status?status=${status}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error();
      fetchLeaves();
    } catch {
      alert("Status update failed");
    }
  };

  // 🔍 FILTER LOGIC
  const filteredLeaves = leaves.filter((l) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (l.employeeName ?? `employee ${l.employeeId}`)
        .toLowerCase()
        .includes(search) ||
      l.leaveType.toLowerCase().includes(search) ||
      l.leaveStatus.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "ALL" || l.leaveStatus === statusFilter;

    const matchesFromDate =
      !fromDate || new Date(l.startDate) >= new Date(fromDate);

    const matchesToDate =
      !toDate || new Date(l.endDate) <= new Date(toDate);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesFromDate &&
      matchesToDate
    );
  });

  return (
    <div className="hr-leave">
      <h2>HR Leave Management</h2>

      {/* 🔍 FILTER BAR */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search employee / type / status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button
          className="reset"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("ALL");
            setFromDate("");
            setToDate("");
          }}
        >
          Reset
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeaves.length === 0 && (
            <tr>
              <td colSpan="7" className="empty">
                No matching leave requests
              </td>
            </tr>
          )}

          {filteredLeaves.map((l) => (
            <tr key={l.leaveId}>
              <td>{l.employeeName ?? `Employee #${l.employeeId}`}</td>
              <td>{l.leaveType}</td>
              <td>{l.startDate}</td>
              <td>{l.endDate}</td>
              <td>{l.days}</td>
              <td className={`status ${l.leaveStatus.toLowerCase()}`}>
                {l.leaveStatus}
              </td>
              <td>
                {l.leaveStatus === "PENDING" ? (
                  <>
                    <button
                      className="approve"
                      onClick={() =>
                        updateStatus(l.leaveId, "APPROVED")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="reject"
                      onClick={() =>
                        updateStatus(l.leaveId, "REJECTED")
                      }
                    >
                      Reject
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
