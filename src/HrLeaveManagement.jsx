// import { useEffect, useState } from "react";
// import axios from "axios";

// // ✅ VERY IMPORTANT — send session cookie to Spring
// const api = axios.create({
//   baseURL: "http://localhost:8080",
//   withCredentials: true
// });

// export default function HrLeaveManagement() {
//   const emptyForm = {
//     leaveName: "",
//     noOfDays: ""
//   };

//   const [form, setForm] = useState(emptyForm);
//   const [leaves, setLeaves] = useState([]);
//   const [editId, setEditId] = useState(null);

//   // ================= FETCH ALL LEAVES =================
//   const fetchLeaves = async () => {
//     try {
//       const response = await api.get("/leave-master/all");
//       setLeaves(response.data);
//     } catch (error) {
//       console.error("Error fetching leaves:", error);
//     }
//   };

//   useEffect(() => {
//     fetchLeaves();
//   }, []);

//   // ================= HANDLE INPUT =================
//   const handleChange = (event) => {
//     setForm({ ...form, [event.target.name]: event.target.value });
//   };

//   // ================= ADD / UPDATE =================
//   const handleSubmit = async () => {
//     try {
//       if (!form.leaveName || !form.noOfDays) {
//         alert("All fields are required");
//         return;
//       }

//       const userId = Number(sessionStorage.getItem("userId"));

//       const payload = {
//         leaveId: editId ? editId : 0,
//         leaveName: form.leaveName,
//         noOfDays: Number(form.noOfDays),
//         createdBy: { id: userId }
//       };

//       if (editId) {
//         await api.put(
//           `/leave-master/updateLeaveMaster/${editId}`,
//           {
//             ...payload,
//             updatedBy: { id: userId }
//           }
//         );
//         alert("Leave updated successfully");
//       } else {
//         await api.post("/leave-master/create", payload);
//         alert("Leave created successfully");
//       }

//       setForm(emptyForm);
//       setEditId(null);
//       fetchLeaves();
//     } catch (error) {
//       console.error("Server error:", error.response?.data);
//     }
//   };

//   // ================= EDIT =================
//   const handleEdit = (leave) => {
//     setForm({
//       leaveName: leave.leaveName,
//       noOfDays: leave.noOfDays
//     });
//     setEditId(leave.leaveId);
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this leave?")) return;

//     try {
//       await api.delete(`/leave-master/deleteLeaveMaster/${id}`);
//       alert("Leave deleted successfully");
//       fetchLeaves();
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>HR Leave Management</h2>

//       {/* ===== FORM ===== */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           name="leaveName"
//           placeholder="Leave Name"
//           value={form.leaveName}
//           onChange={handleChange}
//         />

//         <input
//           type="number"
//           name="noOfDays"
//           placeholder="Number of Days"
//           value={form.noOfDays}
//           onChange={handleChange}
//         />

//         <button onClick={handleSubmit}>
//           {editId ? "Update Leave" : "Add Leave"}
//         </button>
//       </div>

//       {/* ===== TABLE ===== */}
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Leave Name</th>
//             <th>Number of Days</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.map((leave) => (
//             <tr key={leave.leaveId}>
//               <td>{leave.leaveId}</td>
//               <td>{leave.leaveName}</td>
//               <td>{leave.noOfDays}</td>
//               <td>
//                 <button onClick={() => handleEdit(leave)}>Edit</button>
               
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import "./HrLeaveManagement.css"; // ✅ add css file

// ✅ VERY IMPORTANT — send session cookie to Spring
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
});

export default function HrLeaveManagement() {
  const emptyForm = {
    leaveName: "",
    noOfDays: ""
  };

  const [form, setForm] = useState(emptyForm);
  const [leaves, setLeaves] = useState([]);
  const [editId, setEditId] = useState(null);

  // ================= FETCH ALL LEAVES =================
  const fetchLeaves = async () => {
    try {
      const response = await api.get("/leave-master/all");
      setLeaves(response.data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // ================= ADD / UPDATE =================
  const handleSubmit = async () => {
    try {
      if (!form.leaveName || !form.noOfDays) {
        alert("All fields are required");
        return;
      }

      const userId = Number(sessionStorage.getItem("userId"));

      const payload = {
        leaveId: editId ? editId : 0,
        leaveName: form.leaveName,
        noOfDays: Number(form.noOfDays),
        createdBy: { id: userId }
      };

      if (editId) {
        await api.put(
          `/leave-master/updateLeaveMaster/${editId}`,
          {
            ...payload,
            updatedBy: { id: userId }
          }
        );
        alert("Leave updated successfully");
      } else {
        await api.post("/leave-master/create", payload);
        alert("Leave created successfully");
      }

      setForm(emptyForm);
      setEditId(null);
      fetchLeaves();
    } catch (error) {
      console.error("Server error:", error.response?.data);
    }
  };

  // ================= EDIT =================
  const handleEdit = (leave) => {
    setForm({
      leaveName: leave.leaveName,
      noOfDays: leave.noOfDays
    });
    setEditId(leave.leaveId);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leave?")) return;

    try {
      await api.delete(`/leave-master/deleteLeaveMaster/${id}`);
      alert("Leave deleted successfully");
      fetchLeaves();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="hr-leave-container">
      <h2>HR Leave Management</h2>

      {/* ===== FORM ===== */}
      <div className="leave-form">
        <input
          type="text"
          name="leaveName"
          placeholder="Leave Name"
          value={form.leaveName}
          onChange={handleChange}
        />

        <input
          type="number"
          name="noOfDays"
          placeholder="Number of Days"
          value={form.noOfDays}
          onChange={handleChange}
        />

        <button className="add-leave-btn" onClick={handleSubmit}>
          {editId ? "Update Leave" : "Add Leave"}
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="hr-leave-table-wrapper">
        <table className="hr-leave-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Leave Name</th>
              <th>Number of Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.leaveId}>
                <td>{leave.leaveId}</td>
                <td>{leave.leaveName}</td>
                <td>{leave.noOfDays}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(leave)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}