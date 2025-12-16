// LeaveManagement.jsx
import React, { useState, useEffect } from 'react';
import './LeaveManagement.css';
import LeaveDashboard from './components/LeaveDashboard';
import LeaveTypeManagement from './components/LeaveTypeManagement';
import LeaveAllocation from './components/LeaveAllocation';
import LeaveRequestManagement from './components/LeaveRequestManagement';
import LeaveCalendar from './components/LeaveCalendar';
import HolidayManagement from './components/HolidayManagement';
import ReportsAnalytics from './components/ReportsAnalytics';

const LeaveManagement = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [userRole, setUserRole] = useState('admin'); // 'admin', 'manager', 'employee'

    const tabs = [
        { id: 'dashboard', label: 'Leave Dashboard' },
        { id: 'types', label: 'Leave Types' },
        { id: 'allocation', label: 'Leave Allocation' },
        { id: 'requests', label: 'Leave Requests' },
        { id: 'calendar', label: 'Leave Calendar' },
        { id: 'holidays', label: 'Holidays' },
        { id: 'reports', label: 'Reports & Analytics' },
    ];

    // Filter tabs based on user role
    const getVisibleTabs = () => {
        if (userRole === 'employee') {
            return tabs.filter(tab => ['dashboard', 'calendar'].includes(tab.id));
        }
        if (userRole === 'manager') {
            return tabs.filter(tab => tab.id !== 'types' && tab.id !== 'allocation');
        }
        return tabs;
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <LeaveDashboard userRole={userRole} />;
            case 'types':
                return <LeaveTypeManagement />;
            case 'allocation':
                return <LeaveAllocation />;
            case 'requests':
                return <LeaveRequestManagement userRole={userRole} />;
            case 'calendar':
                return <LeaveCalendar />;
            case 'holidays':
                return <HolidayManagement />;
            case 'reports':
                return <ReportsAnalytics />;
            default:
                return <LeaveDashboard userRole={userRole} />;
        }
    };

    return (
        <div className="leave-management">
            <div className="header">
                <h1>Leave Management System</h1>
                <div className="role-selector">
                    <select 
                        value={userRole} 
                        onChange={(e) => setUserRole(e.target.value)}
                        className="role-dropdown"
                    >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>
            </div>

            <div className="tabs">
                {getVisibleTabs().map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
};

export default LeaveManagement;