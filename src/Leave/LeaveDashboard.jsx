// components/LeaveDashboard.jsx
import React, { useState, useEffect } from 'react';
import './LeaveDashboard.css';

const LeaveDashboard = ({ userRole }) => {
    const [summary, setSummary] = useState({
        totalRequests: { daily: 0, monthly: 0, yearly: 0 },
        pending: 0,
        approved: 0,
        rejected: 0,
        todayLeaves: [],
        upcomingLeaves: [],
        departmentStats: [],
        alerts: []
    });

    // Mock data - replace with API calls
    useEffect(() => {
        const mockSummary = {
            totalRequests: { daily: 12, monthly: 156, yearly: 1872 },
            pending: 8,
            approved: 142,
            rejected: 6,
            todayLeaves: [
                { id: 1, name: 'John Doe', department: 'IT', leaveType: 'SL' },
                { id: 2, name: 'Jane Smith', department: 'HR', leaveType: 'CL' }
            ],
            upcomingLeaves: [
                { id: 3, name: 'Bob Wilson', department: 'Sales', leaveType: 'PL', from: '2025-12-20', to: '2025-12-25' }
            ],
            departmentStats: [
                { department: 'IT', totalLeaves: 45, pending: 3, approved: 40, rejected: 2 },
                { department: 'HR', totalLeaves: 32, pending: 2, approved: 28, rejected: 2 },
                { department: 'Sales', totalLeaves: 67, pending: 3, approved: 62, rejected: 2 }
            ],
            alerts: [
                { type: 'low_balance', message: '5 employees have low leave balance' },
                { type: 'overlap', message: '2 leave requests have date overlaps' }
            ]
        };
        setSummary(mockSummary);
    }, []);

    return (
        <div className="leave-dashboard">
            <div className="dashboard-header">
                <h2>Leave Dashboard</h2>
                <div className="time-filters">
                    <button className="time-btn active">Today</button>
                    <button className="time-btn">This Week</button>
                    <button className="time-btn">This Month</button>
                    <button className="time-btn">This Year</button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="summary-cards">
                <div className="card total-requests">
                    <h3>Total Leave Requests</h3>
                    <div className="card-content">
                        <div className="stat">
                            <span className="value">{summary.totalRequests.daily}</span>
                            <span className="label">Daily</span>
                        </div>
                        <div className="stat">
                            <span className="value">{summary.totalRequests.monthly}</span>
                            <span className="label">Monthly</span>
                        </div>
                        <div className="stat">
                            <span className="value">{summary.totalRequests.yearly}</span>
                            <span className="label">Yearly</span>
                        </div>
                    </div>
                </div>

                <div className="card pending">
                    <h3>Pending Approvals</h3>
                    <div className="card-content">
                        <span className="value">{summary.pending}</span>
                        <span className="label">Requests</span>
                    </div>
                </div>

                <div className="card approved">
                    <h3>Approved Leaves</h3>
                    <div className="card-content">
                        <span className="value">{summary.approved}</span>
                        <span className="label">Requests</span>
                    </div>
                </div>

                <div className="card rejected">
                    <h3>Rejected Leaves</h3>
                    <div className="card-content">
                        <span className="value">{summary.rejected}</span>
                        <span className="label">Requests</span>
                    </div>
                </div>
            </div>

            {/* Charts and Additional Data */}
            <div className="dashboard-grid">
                <div className="grid-item today-leaves">
                    <h3>Today's Leaves ({summary.todayLeaves.length})</h3>
                    <div className="leave-list">
                        {summary.todayLeaves.map(leave => (
                            <div key={leave.id} className="leave-item">
                                <span className="name">{leave.name}</span>
                                <span className="dept">{leave.department}</span>
                                <span className={`type ${leave.leaveType.toLowerCase()}`}>{leave.leaveType}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid-item upcoming-leaves">
                    <h3>Upcoming Leaves</h3>
                    <div className="leave-list">
                        {summary.upcomingLeaves.map(leave => (
                            <div key={leave.id} className="leave-item">
                                <span className="name">{leave.name}</span>
                                <span className="dates">{leave.from} to {leave.to}</span>
                                <span className={`type ${leave.leaveType.toLowerCase()}`}>{leave.leaveType}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid-item department-stats">
                    <h3>Department-wise Statistics</h3>
                    <table className="stats-table">
                        <thead>
                            <tr>
                                <th>Department</th>
                                <th>Total</th>
                                <th>Pending</th>
                                <th>Approved</th>
                                <th>Rejected</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summary.departmentStats.map(dept => (
                                <tr key={dept.department}>
                                    <td>{dept.department}</td>
                                    <td>{dept.totalLeaves}</td>
                                    <td className="pending">{dept.pending}</td>
                                    <td className="approved">{dept.approved}</td>
                                    <td className="rejected">{dept.rejected}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid-item alerts">
                    <h3>Leave Alerts</h3>
                    <div className="alerts-list">
                        {summary.alerts.map((alert, index) => (
                            <div key={index} className={`alert-item ${alert.type}`}>
                                <span className="alert-icon">⚠️</span>
                                <span className="alert-message">{alert.message}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveDashboard;