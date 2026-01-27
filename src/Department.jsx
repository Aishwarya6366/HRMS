// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Department() {
//   /* ======================
//      STATES
//      ====================== */
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);

//   const [newDepartment, setNewDepartment] = useState("");
//   const [newDesignation, setNewDesignation] = useState("");

//   const [loadingDept, setLoadingDept] = useState(false);
//   const [loadingDesg, setLoadingDesg] = useState(false);

//   /* ======================
//      GET DESIGNATIONS
//      ====================== */
//   const fetchDesignations = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8080/api/designations",
//         { withCredentials: true }
//       );

//       const cleaned = response.data.filter(
//         (d) => d.designationName !== null
//       );

//       setDesignations(cleaned);
//     } catch (error) {
//       alert("Failed to fetch designations");
//     }
//   };

//   useEffect(() => {
//     fetchDesignations();
//   }, []);

//   /* ======================
//      CREATE DEPARTMENT
//      ====================== */
//   const addDepartment = async () => {
//     if (!newDepartment.trim()) {
//       alert("Department name is required");
//       return;
//     }

//     try {
//       setLoadingDept(true);

//       await axios.post(
//         "http://localhost:8080/dept/hr/create",
//         { departmentName: newDepartment },
//         { withCredentials: true }
//       );

//       alert("Department created successfully");

//       setDepartments([
//         ...departments,
//         { id: Date.now(), departmentName: newDepartment },
//       ]);

//       setNewDepartment("");
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to create department");
//     } finally {
//       setLoadingDept(false);
//     }
//   };

//   /* ======================
//      CREATE DESIGNATION
//      ====================== */
//   const addDesignation = async () => {
//     if (!newDesignation.trim()) {
//       alert("Designation name is required");
//       return;
//     }

//     try {
//       setLoadingDesg(true);

//       await axios.post(
//         "http://localhost:8080/dept/hr/DesignationName",
//         { designationName: newDesignation },
//         { withCredentials: true }
//       );

//       alert("Designation created successfully");
//       setNewDesignation("");
//       fetchDesignations();
//     } catch (error) {
//       alert(
//         error.response?.data?.message || "Failed to create designation"
//       );
//     } finally {
//       setLoadingDesg(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <h2 style={styles.heading}>Department & Designation Management</h2>

//       {/* ======================
//           DEPARTMENT SECTION
//          ====================== */}
//       <div style={styles.card}>
//         <h3 style={styles.subHeading}>Departments</h3>

//         <div style={styles.inputRow}>
//           <input
//             type="text"
//             placeholder="Department name"
//             value={newDepartment}
//             onChange={(e) => setNewDepartment(e.target.value)}
//             style={styles.input}
//           />
//           <button
//             onClick={addDepartment}
//             disabled={loadingDept}
//             style={styles.button}
//           >
//             {loadingDept ? "Adding..." : "Add"}
//           </button>
//         </div>

//         <ul style={styles.list}>
//           {departments.map((dept) => (
//             <li key={dept.id} style={styles.listItem}>
//               {dept.departmentName}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* ======================
//           DESIGNATION SECTION
//          ====================== */}
//       <div style={styles.card}>
//         <h3 style={styles.subHeading}>Designations</h3>

//         <div style={styles.inputRow}>
//           <input
//             type="text"
//             placeholder="Designation name"
//             value={newDesignation}
//             onChange={(e) => setNewDesignation(e.target.value)}
//             style={styles.input}
//           />
//           <button
//             onClick={addDesignation}
//             disabled={loadingDesg}
//             style={styles.button}
//           >
//             {loadingDesg ? "Adding..." : "Add"}
//           </button>
//         </div>

//         <ul style={styles.list}>
//           {designations.map((desg) => (
//             <li key={desg.id} style={styles.listItem}>
//               {desg.designationName}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// /* ======================
//    INTERNAL CSS
//    ====================== */
// const styles = {
//   page: {
//     padding: "20px",
//     backgroundColor: "#f4f6fb",
//     minHeight: "100vh",
//   },
//   heading: {
//     marginBottom: "20px",
//     color: "#1f2937",
//   },
//   subHeading: {
//     marginBottom: "10px",
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//     maxWidth: "600px",
//     marginBottom: "25px",
//   },
//   inputRow: {
//     display: "flex",
//     gap: "10px",
//     marginBottom: "15px",
//   },
//   input: {
//     flex: 1,
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #d1d5db",
//     fontSize: "14px",
//   },
//   button: {
//     padding: "10px 18px",
//     borderRadius: "6px",
//     border: "none",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     cursor: "pointer",
//     fontSize: "14px",
//   },
//   list: {
//     listStyle: "none",
//     padding: 0,
//     margin: 0,
//   },
//   listItem: {
//     padding: "10px",
//     borderBottom: "1px solid #eee",
//     fontSize: "14px",
//   },
// };


import { useState, useEffect } from "react";
import axios from "axios";

export default function Department() {
  /* ======================
     STATES
     ====================== */
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [newDepartment, setNewDepartment] = useState("");
  const [newDesignation, setNewDesignation] = useState("");

  const [loadingDept, setLoadingDept] = useState(false);
  const [loadingDesg, setLoadingDesg] = useState(false);

  /* ======================
     GET DEPARTMENTS
     ====================== */
  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/departments",
        { withCredentials: true }
      );

      // DIRECT MAPPING (matches your API)
      setDepartments(res.data);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch departments");
    }
  };

  /* ======================
     GET DESIGNATIONS
     ====================== */
  const fetchDesignations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/designations",
        { withCredentials: true }
      );

      const cleaned = res.data.filter(
        (d) => d.designationName !== null
      );

      setDesignations(cleaned);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch designations");
    }
  };

  /* ======================
     INITIAL LOAD
     ====================== */
  useEffect(() => {
    fetchDepartments();
    fetchDesignations();
  }, []);

  /* ======================
     CREATE DEPARTMENT
     ====================== */
  const addDepartment = async () => {
    if (!newDepartment.trim()) {
      alert("Department name is required");
      return;
    }

    try {
      setLoadingDept(true);

      await axios.post(
        "http://localhost:8080/dept/hr/create",
        { departmentName: newDepartment },
        { withCredentials: true }
      );

      alert("Department created successfully");
      setNewDepartment("");
      fetchDepartments(); // refresh list
    } catch (error) {
      alert(error.response?.data?.message || "Create failed");
    } finally {
      setLoadingDept(false);
    }
  };

  /* ======================
     CREATE DESIGNATION
     ====================== */
  const addDesignation = async () => {
    if (!newDesignation.trim()) {
      alert("Designation name is required");
      return;
    }

    try {
      setLoadingDesg(true);

      await axios.post(
        "http://localhost:8080/dept/hr/DesignationName",
        { designationName: newDesignation },
        { withCredentials: true }
      );

      alert("Designation created successfully");
      setNewDesignation("");
      fetchDesignations();
    } catch (error) {
      alert(error.response?.data?.message || "Create failed");
    } finally {
      setLoadingDesg(false);
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Department & Designation Management</h2>

      {/* DEPARTMENTS */}
      <div style={styles.card}>
        <h3 style={styles.subHeading}>Departments</h3>

        <div style={styles.inputRow}>
          <input
            type="text"
            placeholder="Department name"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            style={styles.input}
          />
          <button
            onClick={addDepartment}
            disabled={loadingDept}
            style={styles.button}
          >
            {loadingDept ? "Adding..." : "Add"}
          </button>
        </div>

        <ul style={styles.list}>
          {departments.map((dept) => (
            <li key={dept.id} style={styles.listItem}>
              {dept.departmentName}
            </li>
          ))}
        </ul>
      </div>

      {/* DESIGNATIONS */}
      <div style={styles.card}>
        <h3 style={styles.subHeading}>Designations</h3>

        <div style={styles.inputRow}>
          <input
            type="text"
            placeholder="Designation name"
            value={newDesignation}
            onChange={(e) => setNewDesignation(e.target.value)}
            style={styles.input}
          />
          <button
            onClick={addDesignation}
            disabled={loadingDesg}
            style={styles.button}
          >
            {loadingDesg ? "Adding..." : "Add"}
          </button>
        </div>

        <ul style={styles.list}>
          {designations.map((desg) => (
            <li key={desg.id} style={styles.listItem}>
              {desg.designationName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ======================
   INTERNAL CSS
   ====================== */
const styles = {
  page: {
    padding: "20px",
    backgroundColor: "#f4f6fb",
    minHeight: "100vh",
  },
heading: {
  marginBottom: "30px",
  color: "#f97316",        // ORANGE
  textAlign: "center",     // CENTER
  fontWeight: "600",
},

  subHeading: {
    marginBottom: "10px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    maxWidth: "600px",
    marginBottom: "25px",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  },
  button: {
  padding: "10px 18px",
  borderRadius: "6px",
  border: "none",
  background: "linear-gradient(135deg, #ff7a00, #ff9f43)", // ORANGE
  color: "#fff",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "all 0.2s ease",
},

  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
  },
};
