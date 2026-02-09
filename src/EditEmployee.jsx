import { useState } from "react";
import axios from "axios";
import HrEmployeeManagement from "./HrEmployeeManagement";

export default function EditEmployee() {
  const [searchValue, setSearchValue] = useState("");
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* 🔍 SEARCH EMPLOYEE */
  const searchEmployee = async () => {
    if (!searchValue.trim()) {
      setError("Enter username / phone / email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `http://localhost:8080/dept/hr/emp/search?username=${searchValue}`,
        { withCredentials: true }
      );

      if (!res.data) {
        setError("Employee not found");
        return;
      }

      setEmployee(res.data);
    } catch (err) {
      setError("Employee not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-employee-page">
      <h2>Edit Employee</h2>

      {/* SEARCH BAR */}
      <div className="employee-search-bar">
        <input
          placeholder="Search by username / phone / email"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={searchEmployee} disabled={loading}>
          Search
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {/* LOAD FORM AFTER SEARCH */}
      {employee && (
        <HrEmployeeManagement
          mode="edit"
          editData={employee}
        />
      )}
    </div>
  );
}
