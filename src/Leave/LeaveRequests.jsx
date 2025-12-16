import React, { useState } from "react";
import "./LeaveRequests.css";

const LeaveRequests = () => {
  const originalData = [
    {
      id: 1,
      employee: "Aishwarya S",
      empId: "VBZ001",
      type: "Sick Leave",
      reason: "Fever & cold",
      from: "2025-01-12",
      to: "2025-01-14",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Rahul Kumar",
      empId: "VBZ002",
      type: "Casual Leave",
      reason: "Family function",
      from: "2025-01-05",
      to: "2025-01-06",
      status: "Approved",
    },
    {
      id: 3,
      employee: "Meera J",
      empId: "VBZ003",
      type: "LOP",
      reason: "Personal work",
      from: "2024-12-22",
      to: "2024-12-22",
      status: "Rejected",
    }
  ];

  const [leaveRequests, setLeaveRequests] = useState(originalData);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // FILTER STATES
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // APPROVE / REJECT ACTION
  const updateStatus = (id, newStatus) => {
    setLeaveRequests(
      leaveRequests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    setSelectedRequest(null);
  };

  // FILTER LOGIC
  const filteredData = leaveRequests.filter((req) => {
    const matchSearch =
      req.employee.toLowerCase().includes(searchText.toLowerCase()) ||
      req.empId.toLowerCase().includes(searchText.toLowerCase());

    const matchStatus = filterStatus ? req.status === filterStatus : true;
    const matchType = filterType ? req.type === filterType : true;

    const matchFromDate = fromDate ? req.from >= fromDate : true;
    const matchToDate = toDate ? req.to <= toDate : true;

    return matchSearch && matchStatus && matchType && matchFromDate && matchToDate;
  });

  return (
    <div className="lr-container">
      <h1 className="lr-title">Leave Requests (Admin)</h1>
      <p className="lr-subtitle">Review, filter, approve or reject employee leave requests.</p>

      {/* ---------------- FILTERS ---------------- */}
      <div className="filter-section">

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search Employee / ID..."
          className="filter-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* LEAVE TYPE FILTER */}
        <select
          className="filter-input"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Leave Types</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Privilege Leave">Privilege Leave</option>
          <option value="LOP">LOP</option>
        </select>

        {/* STATUS FILTER */}
        <select
          className="filter-input"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* DATE FILTER */}
        <input
          type="date"
          className="filter-input"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="filter-input"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

      </div>

      {/* ---------------- TABLE ---------------- */}
      <table className="lr-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((req) => (
            <tr key={req.id}>
              <td>{req.employee}</td>
              <td>{req.type}</td>
              <td>{req.from}</td>
              <td>{req.to}</td>
              <td>
                <span className={`status-badge ${req.status.toLowerCase()}`}>
                  {req.status}
                </span>
              </td>
              <td>
                {req.status === "Pending" ? (
                  <>
                    <button className="btn-approve" onClick={() => updateStatus(req.id, "Approved")}>
                      Approve
                    </button>
                    <button className="btn-reject" onClick={() => updateStatus(req.id, "Rejected")}>
                      Reject
                    </button>
                  </>
                ) : (
                  <button className="btn-view">View</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredData.length === 0 && (
        <p className="no-data">No matching leave requests found.</p>
      )}
    </div>
  );
};

export default LeaveRequests;
