import React from "react";
import "./Leave.css";

const LeaveManagement = () => {
  return (
    <div className="leave-container">

      {/* PAGE TITLE */}
      <h1 className="leave-title">Leave Management Dashboard</h1>
      <p className="leave-subtitle">Monitor, approve and manage all employee leaves.</p>

      {/* TOP OVERVIEW CARDS */}
      <div className="leave-cards">
        <div className="leave-card">
          <h3>Total Leave Requests</h3>
          <p className="count">56</p>
        </div>

        <div className="leave-card pending">
          <h3>Pending Approvals</h3>
          <p className="count">12</p>
        </div>

        <div className="leave-card approved">
          <h3>Approved Leaves</h3>
          <p className="count">34</p>
        </div>

        <div className="leave-card rejected">
          <h3>Rejected Leaves</h3>
          <p className="count">10</p>
        </div>
      </div>

      {/* RECENT REQUEST TABLE */}
      <div className="leave-table-section">
        <h2>Recent Leave Requests</h2>

        <table className="leave-table">
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
            <tr>
              <td>Aishwarya S</td>
              <td>Sick Leave</td>
              <td>12 Jan 2025</td>
              <td>14 Jan 2025</td>
              <td><span className="badge pending">Pending</span></td>
              <td>
                <button className="btn-approve">Approve</button>
                <button className="btn-reject">Reject</button>
              </td>
            </tr>

            <tr>
              <td>Rahul Kumar</td>
              <td>Casual Leave</td>
              <td>05 Jan 2025</td>
              <td>06 Jan 2025</td>
              <td><span className="badge approved">Approved</span></td>
              <td>
                <button className="btn-view">View</button>
              </td>
            </tr>

            <tr>
              <td>Meera J</td>
              <td>LOP</td>
              <td>22 Dec 2024</td>
              <td>22 Dec 2024</td>
              <td><span className="badge rejected">Rejected</span></td>
              <td>
                <button className="btn-view">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default LeaveManagement;
