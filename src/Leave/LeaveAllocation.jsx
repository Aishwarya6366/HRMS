import React, { useState } from "react";
import "./LeaveAllocation.css";

const LeaveAllocation = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Aishwarya S", employeeId: "VBZ001", department: "IT", cl: 12, sl: 10, pl: 5 },
    { id: 2, name: "Rahul Kumar", employeeId: "VBZ002", department: "HR", cl: 8, sl: 6, pl: 4 },
    { id: 3, name: "Neha Sharma", employeeId: "VBZ003", department: "Operations", cl: 10, sl: 8, pl: 6 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const openModal = (employee) => {
    setCurrentEmployee({ ...employee });
    setShowModal(true);
  };

  const updateAllocation = (e) => {
    e.preventDefault();
    setEmployees(
      employees.map((emp) =>
        emp.id === currentEmployee.id ? currentEmployee : emp
      )
    );
    setShowModal(false);
  };

  return (
    <div className="alloc-container">
      <h1 className="alloc-title">Leave Allocation</h1>
      <p className="alloc-subtitle">Allocate annual leave quotas to all employees.</p>

      <table className="alloc-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Casual Leave (CL)</th>
            <th>Sick Leave (SL)</th>
            <th>Privilege Leave (PL)</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.employeeId}</td>
              <td>{emp.department}</td>
              <td>{emp.cl}</td>
              <td>{emp.sl}</td>
              <td>{emp.pl}</td>
              <td>
                <button className="alloc-edit-btn" onClick={() => openModal(emp)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal */}
      {showModal && (
        <div className="alloc-modal-overlay">
          <div className="alloc-modal">
            <h2>Update Leave Allocation</h2>

            <form onSubmit={updateAllocation}>
              <label>Casual Leave (CL)</label>
              <input
                type="number"
                value={currentEmployee.cl}
                onChange={(e) =>
                  setCurrentEmployee({ ...currentEmployee, cl: e.target.value })
                }
                required
              />

              <label>Sick Leave (SL)</label>
              <input
                type="number"
                value={currentEmployee.sl}
                onChange={(e) =>
                  setCurrentEmployee({ ...currentEmployee, sl: e.target.value })
                }
                required
              />

              <label>Privilege Leave (PL)</label>
              <input
                type="number"
                value={currentEmployee.pl}
                onChange={(e) =>
                  setCurrentEmployee({ ...currentEmployee, pl: e.target.value })
                }
                required
              />

              <div className="modal-actions">
                <button className="save-btn" type="submit">Save</button>
                <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveAllocation;
