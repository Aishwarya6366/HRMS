import { useEffect, useState } from "react";
import axios from "axios";

// ✅ Axios MUST be like this for Spring Session
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export default function EmpLeaveManagement() {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [form, setForm] = useState({
    leaveId: "",
    reason: "",
    startDate: "",
    endDate: "",
  });

  // ✅ Fetch Leave Types
  useEffect(() => {
    api.get("/leave-master/all")
      .then(res => {
        console.log("Leave types:", res.data);
        setLeaveTypes(res.data);
      })
      .catch(err => console.error("Leave type error", err));
  }, []);

  // ✅ Apply Leave
  const applyLeave = async () => {
    try {
      const payload = {
        leaveId: Number(form.leaveId),
        startDate: form.startDate,
        endDate: form.endDate,
        reason: form.reason,
      };

      console.log("Sending payload:", payload);

      await api.post("/leave-record/applyLeave", payload);

      alert("Leave applied successfully");
    } catch (err) {
      console.error("Apply error:", err.response?.data);
      alert(err.response?.data?.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Apply Leave</h2>

      <select
        value={form.leaveId}
        onChange={(e) =>
          setForm({ ...form, leaveId: e.target.value })
        }
      >
        <option value="">-- Select Leave Type --</option>
        {leaveTypes.map((lt) => (
          <option key={lt.leaveId} value={lt.leaveId}>
            {lt.leaveName} ({lt.noOfDays} days)
          </option>
        ))}
      </select>

      <br /><br />

      <input
        type="date"
        onChange={(e) =>
          setForm({ ...form, startDate: e.target.value })
        }
      />

      <br /><br />

      <input
        type="date"
        onChange={(e) =>
          setForm({ ...form, endDate: e.target.value })
        }
      />

      <br /><br />

      <input
        placeholder="Reason"
        onChange={(e) =>
          setForm({ ...form, reason: e.target.value })
        }
      />

      <br /><br />

      <button onClick={applyLeave}>Apply Leave</button>
    </div>
  );
}