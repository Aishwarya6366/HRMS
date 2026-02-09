// // // // // import { useState, useEffect } from "react";
// // // // // import axios from "axios";
// // // // // import "./Department.css";

// // // // // export default function Department({ mode = "add", section = "department" }) {
// // // // //   const [departments, setDepartments] = useState([]);
// // // // //   const [designations, setDesignations] = useState([]);

// // // // //   const [newDepartment, setNewDepartment] = useState("");
// // // // //   const [newDesignation, setNewDesignation] = useState("");

// // // // //   const [editingDeptId, setEditingDeptId] = useState(null);
// // // // //   const [editingDesgId, setEditingDesgId] = useState(null);

// // // // //   const [searchDept, setSearchDept] = useState("");
// // // // //   const [searchDesg, setSearchDesg] = useState("");

// // // // //   /* RESET WHEN SWITCH MODE */
// // // // //   useEffect(() => {
// // // // //     if (mode === "add") {
// // // // //       setEditingDeptId(null);
// // // // //       setEditingDesgId(null);
// // // // //       setNewDepartment("");
// // // // //       setNewDesignation("");
// // // // //     }
// // // // //   }, [mode]);

// // // // //   /* FETCH DATA */
// // // // //   const fetchDepartments = async () => {
// // // // //     const res = await axios.get("http://localhost:8080/api/departments", {
// // // // //       withCredentials: true,
// // // // //     });
// // // // //     setDepartments(res.data);
// // // // //   };

// // // // //   const fetchDesignations = async () => {
// // // // //     const res = await axios.get("http://localhost:8080/api/designations", {
// // // // //       withCredentials: true,
// // // // //     });
// // // // //     setDesignations(res.data.filter(d => d.designationName));
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchDepartments();
// // // // //     fetchDesignations();
// // // // //   }, []);

// // // // //   /* ADD / UPDATE (UNCHANGED) */
// // // // //   const addOrUpdateDepartment = async () => {
// // // // //     if (!newDepartment.trim()) return alert("Department name required");

// // // // //     if (editingDeptId) {
// // // // //       await axios.put(
// // // // //         `http://localhost:8080/dept/hr/update/${editingDeptId}`,
// // // // //         { departmentName: newDepartment },
// // // // //         { withCredentials: true }
// // // // //       );
// // // // //       alert("Department updated successfully");
// // // // //     } else {
// // // // //       await axios.post(
// // // // //         "http://localhost:8080/dept/hr/create",
// // // // //         { departmentName: newDepartment },
// // // // //         { withCredentials: true }
// // // // //       );
// // // // //       alert("Department added successfully");
// // // // //     }

// // // // //     setNewDepartment("");
// // // // //     setEditingDeptId(null);
// // // // //     fetchDepartments();
// // // // //   };

// // // // //   const addOrUpdateDesignation = async () => {
// // // // //     if (!newDesignation.trim()) return alert("Designation name required");

// // // // //     if (editingDesgId) {
// // // // //       await axios.put(
// // // // //         `http://localhost:8080/dept/hr/updateDesignation/${editingDesgId}`,
// // // // //         { designationName: newDesignation },
// // // // //         { withCredentials: true }
// // // // //       );
// // // // //       alert("Designation updated successfully");
// // // // //     } else {
// // // // //       await axios.post(
// // // // //         "http://localhost:8080/dept/hr/DesignationName",
// // // // //         { designationName: newDesignation },
// // // // //         { withCredentials: true }
// // // // //       );
// // // // //       alert("Designation added successfully");
// // // // //     }

// // // // //     setNewDesignation("");
// // // // //     setEditingDesgId(null);
// // // // //     fetchDesignations();
// // // // //   };

// // // // //   return (
// // // // //     <div className="dept-page">
// // // // //       <h2 className="dept-heading">
// // // // //         {section === "department" ? "Department" : "Designation"}
// // // // //       </h2>

// // // // //       {/* ================= ADD MODE ================= */}
// // // // //       {mode === "add" && section === "department" && (
// // // // //         <div className="dept-card">
// // // // //           <h3>Department</h3>
// // // // //           <div className="input-row">
// // // // //             <input
// // // // //               value={newDepartment}
// // // // //               placeholder="Department name"
// // // // //               onChange={(e) => setNewDepartment(e.target.value)}
// // // // //             />
// // // // //             <button onClick={addOrUpdateDepartment}>Add</button>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {mode === "add" && section === "designation" && (
// // // // //         <div className="dept-card">
// // // // //           <h3>Designation</h3>
// // // // //           <div className="input-row">
// // // // //             <input
// // // // //               value={newDesignation}
// // // // //               placeholder="Designation name"
// // // // //               onChange={(e) => setNewDesignation(e.target.value)}
// // // // //             />
// // // // //             <button onClick={addOrUpdateDesignation}>Add</button>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* ================= EDIT MODE ================= */}
// // // // //       {mode === "edit" && section === "department" && (
// // // // //         <div className="dept-card">
// // // // //           <h3>Departments</h3>

// // // // //           <input
// // // // //             className="search-input"
// // // // //             placeholder="Search department..."
// // // // //             value={searchDept}
// // // // //             onChange={(e) => setSearchDept(e.target.value)}
// // // // //           />

// // // // //           <ul>
// // // // //             {departments
// // // // //               .filter(d =>
// // // // //                 d.departmentName
// // // // //                   .toLowerCase()
// // // // //                   .includes(searchDept.toLowerCase())
// // // // //               )
// // // // //               .map(d => (
// // // // //                 <li key={d.id} className="edit-row">
// // // // //                   <span>{d.departmentName}</span>
// // // // //                   <button
// // // // //                     className="edit-btn"
// // // // //                     onClick={() => {
// // // // //                       setNewDepartment(d.departmentName);
// // // // //                       setEditingDeptId(d.id);
// // // // //                     }}
// // // // //                   >
// // // // //                     Edit
// // // // //                   </button>
// // // // //                 </li>
// // // // //               ))}
// // // // //           </ul>

// // // // //           {editingDeptId && (
// // // // //             <div className="edit-bar">
// // // // //               <input
// // // // //                 value={newDepartment}
// // // // //                 onChange={(e) => setNewDepartment(e.target.value)}
// // // // //               />
// // // // //               <button onClick={addOrUpdateDepartment}>Update</button>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       )}

// // // // //       {mode === "edit" && section === "designation" && (
// // // // //         <div className="dept-card">
// // // // //           <h3>Designations</h3>

// // // // //           <input
// // // // //             className="search-input"
// // // // //             placeholder="Search designation..."
// // // // //             value={searchDesg}
// // // // //             onChange={(e) => setSearchDesg(e.target.value)}
// // // // //           />

// // // // //           <ul>
// // // // //             {designations
// // // // //               .filter(d =>
// // // // //                 d.designationName
// // // // //                   .toLowerCase()
// // // // //                   .includes(searchDesg.toLowerCase())
// // // // //               )
// // // // //               .map(d => (
// // // // //                 <li key={d.id} className="edit-row">
// // // // //                   <span>{d.designationName}</span>
// // // // //                   <button
// // // // //                     className="edit-btn"
// // // // //                     onClick={() => {
// // // // //                       setNewDesignation(d.designationName);
// // // // //                       setEditingDesgId(d.id);
// // // // //                     }}
// // // // //                   >
// // // // //                     Edit
// // // // //                   </button>
// // // // //                 </li>
// // // // //               ))}
// // // // //           </ul>

// // // // //           {editingDesgId && (
// // // // //             <div className="edit-bar">
// // // // //               <input
// // // // //                 value={newDesignation}
// // // // //                 onChange={(e) => setNewDesignation(e.target.value)}
// // // // //               />
// // // // //               <button onClick={addOrUpdateDesignation}>Update</button>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // import "./Department.css";

// // // // export default function Department({ mode = "add", section = "department" }) {
// // // //   const [departments, setDepartments] = useState([]);
// // // //   const [designations, setDesignations] = useState([]);

// // // //   const [newDepartment, setNewDepartment] = useState("");
// // // //   const [newDesignation, setNewDesignation] = useState("");

// // // //   const [editingDeptId, setEditingDeptId] = useState(null);
// // // //   const [editingDesgId, setEditingDesgId] = useState(null);

// // // //   const [searchDept, setSearchDept] = useState("");
// // // //   const [searchDesg, setSearchDesg] = useState("");

// // // //   useEffect(() => {
// // // //     if (mode === "add") {
// // // //       setEditingDeptId(null);
// // // //       setEditingDesgId(null);
// // // //       setNewDepartment("");
// // // //       setNewDesignation("");
// // // //     }
// // // //   }, [mode]);

// // // //   /* FETCH DATA */
// // // //   const fetchDepartments = async () => {
// // // //     const res = await axios.get("http://localhost:8080/api/departments", {
// // // //       withCredentials: true,
// // // //     });
// // // //     setDepartments(res.data);
// // // //   };

// // // //   const fetchDesignations = async () => {
// // // //     const res = await axios.get("http://localhost:8080/api/designations", {
// // // //       withCredentials: true,
// // // //     });
// // // //     setDesignations(res.data.filter(d => d.designationName));
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchDepartments();
// // // //     fetchDesignations();
// // // //   }, []);

// // // //   /* ADD / UPDATE */
// // // //   const addOrUpdateDepartment = async () => {
// // // //     if (!newDepartment.trim()) return alert("Department name required");

// // // //     if (editingDeptId) {
// // // // await axios.put(
// // // //   `http://localhost:8080/api/departments/department-update?departmentId=${editingDeptId}`,
// // // //   { departmentName: newDepartment },
// // // //   { withCredentials: true }
// // // // );

// // // //       alert("Department updated successfully");
// // // //     } else {
// // // //       await axios.post(
// // // //         "http://localhost:8080/dept/hr/create",
// // // //         { departmentName: newDepartment },
// // // //         { withCredentials: true }
// // // //       );
// // // //       alert("Department added successfully");
// // // //     }

// // // //     setNewDepartment("");
// // // //     setEditingDeptId(null);
// // // //     fetchDepartments();
// // // //   };

// // // //   const addOrUpdateDesignation = async () => {
// // // //     if (!newDesignation.trim()) return alert("Designation name required");

// // // //     if (editingDesgId) {
// // // //       await axios.put(
// // // //         "http://localhost:8080/api/designations/designation-update",
// // // //         {
// // // //           id: editingDesgId,
// // // //           designationName: newDesignation,
// // // //         },
// // // //         { withCredentials: true }
// // // //       );
// // // //       alert("Designation updated successfully");
// // // //     } else {
// // // //       await axios.post(
// // // //         "http://localhost:8080/dept/hr/DesignationName",
// // // //         { designationName: newDesignation },
// // // //         { withCredentials: true }
// // // //       );
// // // //       alert("Designation added successfully");
// // // //     }

// // // //     setNewDesignation("");
// // // //     setEditingDesgId(null);
// // // //     fetchDesignations();
// // // //   };

// // // //   return (
// // // //     <div className="dept-page">
// // // //       <h2 className="dept-heading">
// // // //         {section === "department" ? "Department" : "Designation"}
// // // //       </h2>

// // // //       {/* ADD MODE */}
// // // //       {mode === "add" && section === "department" && (
// // // //         <div className="dept-card">
// // // //           <h3>Department</h3>
// // // //           <div className="input-row">
// // // //             <input
// // // //               value={newDepartment}
// // // //               placeholder="Department name"
// // // //               onChange={(e) => setNewDepartment(e.target.value)}
// // // //             />
// // // //             <button onClick={addOrUpdateDepartment}>Add</button>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {mode === "add" && section === "designation" && (
// // // //         <div className="dept-card">
// // // //           <h3>Designation</h3>
// // // //           <div className="input-row">
// // // //             <input
// // // //               value={newDesignation}
// // // //               placeholder="Designation name"
// // // //               onChange={(e) => setNewDesignation(e.target.value)}
// // // //             />
// // // //             <button onClick={addOrUpdateDesignation}>Add</button>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* EDIT MODE - DEPARTMENT */}
// // // //       {mode === "edit" && section === "department" && (
// // // //         <div className="dept-card">
// // // //           <h3>Departments</h3>

// // // //           <input
// // // //             className="search-input"
// // // //             placeholder="Search department..."
// // // //             value={searchDept}
// // // //             onChange={(e) => setSearchDept(e.target.value)}
// // // //           />

// // // //           <ul>
// // // //             {departments
// // // //               .filter(d =>
// // // //                 d.departmentName
// // // //                   .toLowerCase()
// // // //                   .includes(searchDept.toLowerCase())
// // // //               )
// // // //               .map(d => (
// // // //                 <li key={d.id} className="edit-row">
// // // //                   <span>{d.departmentName}</span>
// // // //                   <button
// // // //                     className="edit-btn"
// // // //                     onClick={() => {
// // // //                       setNewDepartment(d.departmentName);
// // // //                       setEditingDeptId(d.id);
// // // //                     }}
// // // //                   >
// // // //                     Edit
// // // //                   </button>
// // // //                 </li>
// // // //               ))}
// // // //           </ul>

// // // //           {editingDeptId && (
// // // //             <div className="edit-bar">
// // // //               <input
// // // //                 value={newDepartment}
// // // //                 onChange={(e) => setNewDepartment(e.target.value)}
// // // //               />
// // // //               <button onClick={addOrUpdateDepartment}>Update</button>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       )}

// // // //       {/* EDIT MODE - DESIGNATION */}
// // // //       {mode === "edit" && section === "designation" && (
// // // //         <div className="dept-card">
// // // //           <h3>Designations</h3>

// // // //           <input
// // // //             className="search-input"
// // // //             placeholder="Search designation..."
// // // //             value={searchDesg}
// // // //             onChange={(e) => setSearchDesg(e.target.value)}
// // // //           />

// // // //           <ul>
// // // //             {designations
// // // //               .filter(d =>
// // // //                 d.designationName
// // // //                   .toLowerCase()
// // // //                   .includes(searchDesg.toLowerCase())
// // // //               )
// // // //               .map(d => (
// // // //                 <li key={d.id} className="edit-row">
// // // //                   <span>{d.designationName}</span>
// // // //                   <button
// // // //                     className="edit-btn"
// // // //                     onClick={() => {
// // // //                       setNewDesignation(d.designationName);
// // // //                       setEditingDesgId(d.id);
// // // //                     }}
// // // //                   >
// // // //                     Edit
// // // //                   </button>
// // // //                 </li>
// // // //               ))}
// // // //           </ul>

// // // //           {editingDesgId && (
// // // //             <div className="edit-bar">
// // // //               <input
// // // //                 value={newDesignation}
// // // //                 onChange={(e) => setNewDesignation(e.target.value)}
// // // //               />
// // // //               <button onClick={addOrUpdateDesignation}>Update</button>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }
// // // import { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import "./Department.css";

// // // export default function Department({ mode = "add", section = "department" }) {
// // //   const [departments, setDepartments] = useState([]);
// // //   const [designations, setDesignations] = useState([]);

// // //   const [newDepartment, setNewDepartment] = useState("");
// // //   const [newDesignation, setNewDesignation] = useState("");

// // //   const [editingDeptId, setEditingDeptId] = useState(null);
// // //   const [editingDesgId, setEditingDesgId] = useState(null);

// // //   const [searchDept, setSearchDept] = useState("");
// // //   const [searchDesg, setSearchDesg] = useState("");

// // //   /* RESET WHEN SWITCH MODE */
// // //   useEffect(() => {
// // //     if (mode === "add") {
// // //       setEditingDeptId(null);
// // //       setEditingDesgId(null);
// // //       setNewDepartment("");
// // //       setNewDesignation("");
// // //     }
// // //   }, [mode]);

// // //   /* FETCH DATA */
// // //   const fetchDepartments = async () => {
// // //     try {
// // //       const res = await axios.get("http://localhost:8080/api/departments", {
// // //         withCredentials: true,
// // //       });
// // //       setDepartments(res.data);
// // //     } catch (err) {
// // //       console.error("Error fetching departments:", err);
// // //     }
// // //   };

// // //   const fetchDesignations = async () => {
// // //     try {
// // //       const res = await axios.get("http://localhost:8080/api/designations", {
// // //         withCredentials: true,
// // //       });
// // //       setDesignations(res.data);
// // //     } catch (err) {
// // //       console.error("Error fetching designations:", err);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchDepartments();
// // //     fetchDesignations();
// // //   }, []);

// // //   /* ADD DEPARTMENT */
// // //   const addDepartment = async () => {
// // //     if (!newDepartment.trim()) {
// // //       alert("Department name required");
// // //       return;
// // //     }

// // //     try {
// // //       await axios.post(
// // //         "http://localhost:8080/api/departments",
// // //         { departmentName: newDepartment },
// // //         { withCredentials: true }
// // //       );
// // //       alert("Department added successfully");
// // //       setNewDepartment("");
// // //       fetchDepartments();
// // //     } catch (err) {
// // //       console.error("Error adding department:", err);
// // //       alert("Failed to add department");
// // //     }
// // //   };

// // //   /* UPDATE DEPARTMENT */
// // //   const updateDepartment = async () => {
// // //     if (!newDepartment.trim()) {
// // //       alert("Department name required");
// // //       return;
// // //     }

// // //     try {
// // //       // Note: The API expects department-upate (misspelled) and departmentId as path/query parameter
// // //       await axios.put(
// // //         `http://localhost:8080/api/departments/department-upate?departmentId=${editingDeptId}`,
// // //         { departmentName: newDepartment },
// // //         { withCredentials: true }
// // //       );
// // //       alert("Department updated successfully");
// // //       setNewDepartment("");
// // //       setEditingDeptId(null);
// // //       fetchDepartments();
// // //     } catch (err) {
// // //       console.error("Error updating department:", err);
// // //       alert("Failed to update department");
// // //     }
// // //   };

// // //   /* ADD DESIGNATION */
// // //   const addDesignation = async () => {
// // //     if (!newDesignation.trim()) {
// // //       alert("Designation name required");
// // //       return;
// // //     }

// // //     try {
// // //       await axios.post(
// // //         "http://localhost:8080/api/designations",
// // //         { designationName: newDesignation },
// // //         { withCredentials: true }
// // //       );
// // //       alert("Designation added successfully");
// // //       setNewDesignation("");
// // //       fetchDesignations();
// // //     } catch (err) {
// // //       console.error("Error adding designation:", err);
// // //       alert("Failed to add designation");
// // //     }
// // //   };

// // //   /* UPDATE DESIGNATION */
// // //   const updateDesignation = async () => {
// // //     if (!newDesignation.trim()) {
// // //       alert("Designation name required");
// // //       return;
// // //     }

// // //     try {
// // //       // Note: The API expects designationId as parameter
// // //       await axios.put(
// // //         `http://localhost:8080/api/designations/designation-update?designationId=${editingDesgId}`,
// // //         { designationName: newDesignation },
// // //         { withCredentials: true }
// // //       );
// // //       alert("Designation updated successfully");
// // //       setNewDesignation("");
// // //       setEditingDesgId(null);
// // //       fetchDesignations();
// // //     } catch (err) {
// // //       console.error("Error updating designation:", err);
// // //       alert("Failed to update designation");
// // //     }
// // //   };

// // //   // Combined functions for convenience
// // //   const handleDepartmentSubmit = () => {
// // //     if (editingDeptId) {
// // //       updateDepartment();
// // //     } else {
// // //       addDepartment();
// // //     }
// // //   };

// // //   const handleDesignationSubmit = () => {
// // //     if (editingDesgId) {
// // //       updateDesignation();
// // //     } else {
// // //       addDesignation();
// // //     }
// // //   };

// // //   return (
// // //     <div className="dept-page">
// // //       <h2 className="dept-heading">
// // //         {section === "department" ? "Department" : "Designation"}
// // //       </h2>

// // //       {/* ================= ADD MODE ================= */}
// // //       {mode === "add" && section === "department" && (
// // //         <div className="dept-card">
// // //           <h3>Add Department</h3>
// // //           <div className="input-row">
// // //             <input
// // //               value={newDepartment}
// // //               placeholder="Department name"
// // //               onChange={(e) => setNewDepartment(e.target.value)}
// // //             />
// // //             <button onClick={handleDepartmentSubmit}>
// // //               {editingDeptId ? "Update" : "Add"}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {mode === "add" && section === "designation" && (
// // //         <div className="dept-card">
// // //           <h3>Add Designation</h3>
// // //           <div className="input-row">
// // //             <input
// // //               value={newDesignation}
// // //               placeholder="Designation name"
// // //               onChange={(e) => setNewDesignation(e.target.value)}
// // //             />
// // //             <button onClick={handleDesignationSubmit}>
// // //               {editingDesgId ? "Update" : "Add"}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* ================= EDIT MODE ================= */}
// // //       {mode === "edit" && section === "department" && (
// // //         <div className="dept-card">
// // //           <h3>Edit Departments</h3>

// // //           <input
// // //             className="search-input"
// // //             placeholder="Search department..."
// // //             value={searchDept}
// // //             onChange={(e) => setSearchDept(e.target.value)}
// // //           />

// // //           <ul>
// // //             {departments
// // //               .filter(d =>
// // //                 d.departmentName
// // //                   .toLowerCase()
// // //                   .includes(searchDept.toLowerCase())
// // //               )
// // //               .map(d => (
// // //                 <li key={d.id} className="edit-row">
// // //                   <span>{d.departmentName}</span>
// // //                   <button
// // //                     className="edit-btn"
// // //                     onClick={() => {
// // //                       setNewDepartment(d.departmentName);
// // //                       setEditingDeptId(d.id);
// // //                       // Switch to add mode with pre-filled data for editing
// // //                     }}
// // //                   >
// // //                     Edit
// // //                   </button>
// // //                 </li>
// // //               ))}
// // //           </ul>

// // //           {editingDeptId && (
// // //             <div className="edit-section">
// // //               <p>Editing: {departments.find(d => d.id === editingDeptId)?.departmentName}</p>
// // //               <div className="edit-bar">
// // //                 <input
// // //                   value={newDepartment}
// // //                   onChange={(e) => setNewDepartment(e.target.value)}
// // //                   placeholder="Enter new department name"
// // //                 />
// // //                 <button onClick={updateDepartment}>Update</button>
// // //                 <button onClick={() => {
// // //                   setEditingDeptId(null);
// // //                   setNewDepartment("");
// // //                 }}>Cancel</button>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}

// // //       {mode === "edit" && section === "designation" && (
// // //         <div className="dept-card">
// // //           <h3>Edit Designations</h3>

// // //           <input
// // //             className="search-input"
// // //             placeholder="Search designation..."
// // //             value={searchDesg}
// // //             onChange={(e) => setSearchDesg(e.target.value)}
// // //           />

// // //           <ul>
// // //             {designations
// // //               .filter(d =>
// // //                 d.designationName
// // //                   .toLowerCase()
// // //                   .includes(searchDesg.toLowerCase())
// // //               )
// // //               .map(d => (
// // //                 <li key={d.id} className="edit-row">
// // //                   <span>{d.designationName}</span>
// // //                   <button
// // //                     className="edit-btn"
// // //                     onClick={() => {
// // //                       setNewDesignation(d.designationName);
// // //                       setEditingDesgId(d.id);
// // //                     }}
// // //                   >
// // //                     Edit
// // //                   </button>
// // //                 </li>
// // //               ))}
// // //           </ul>

// // //           {editingDesgId && (
// // //             <div className="edit-section">
// // //               <p>Editing: {designations.find(d => d.id === editingDesgId)?.designationName}</p>
// // //               <div className="edit-bar">
// // //                 <input
// // //                   value={newDesignation}
// // //                   onChange={(e) => setNewDesignation(e.target.value)}
// // //                   placeholder="Enter new designation name"
// // //                 />
// // //                 <button onClick={updateDesignation}>Update</button>
// // //                 <button onClick={() => {
// // //                   setEditingDesgId(null);
// // //                   setNewDesignation("");
// // //                 }}>Cancel</button>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import "./Department.css";

// // export default function Department({ mode = "add", section = "department" }) {
// //   const [departments, setDepartments] = useState([]);
// //   const [designations, setDesignations] = useState([]);

// //   const [newDepartment, setNewDepartment] = useState("");
// //   const [newDesignation, setNewDesignation] = useState("");

// //   const [editingDeptId, setEditingDeptId] = useState(null);
// //   const [editingDesgId, setEditingDesgId] = useState(null);

// //   const [searchDept, setSearchDept] = useState("");
// //   const [searchDesg, setSearchDesg] = useState("");

// //   /* RESET WHEN SWITCH MODE */
// //   useEffect(() => {
// //     if (mode === "add") {
// //       setEditingDeptId(null);
// //       setEditingDesgId(null);
// //       setNewDepartment("");
// //       setNewDesignation("");
// //     }
// //   }, [mode]);

// //   /* FETCH DATA */
// //   const fetchDepartments = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:8080/api/departments", {
// //         withCredentials: true,
// //       });
// //       setDepartments(res.data);
// //     } catch (err) {
// //       console.error("Error fetching departments:", err);
// //     }
// //   };

// //   const fetchDesignations = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:8080/api/designations", {
// //         withCredentials: true,
// //       });
// //       setDesignations(res.data);
// //     } catch (err) {
// //       console.error("Error fetching designations:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchDepartments();
// //     fetchDesignations();
// //   }, []);

// //   /* ADD DEPARTMENT */
// //   const addDepartment = async () => {
// //     if (!newDepartment.trim()) {
// //       alert("Department name required");
// //       return;
// //     }

// //     try {
// //       await axios.post(
// //         "http://localhost:8080/api/departments",
// //         { departmentName: newDepartment },
// //         { withCredentials: true }
// //       );
// //       alert("Department added successfully");
// //       setNewDepartment("");
// //       fetchDepartments();
// //     } catch (err) {
// //       console.error("Error adding department:", err);
// //       alert("Failed to add department");
// //     }
// //   };

// //   /* UPDATE DEPARTMENT */
// //   const updateDepartment = async (id, updatedName) => {
// //     if (!updatedName.trim()) {
// //       alert("Department name required");
// //       return;
// //     }

// //     try {
// //       await axios.put(
// //         `http://localhost:8080/api/departments/department-upate?departmentId=${id}`,
// //         { departmentName: updatedName },
// //         { withCredentials: true }
// //       );
// //       alert("Department updated successfully");
// //       setEditingDeptId(null);
// //       fetchDepartments();
// //     } catch (err) {
// //       console.error("Error updating department:", err);
// //       alert("Failed to update department");
// //     }
// //   };

// //   /* ADD DESIGNATION */
// //   const addDesignation = async () => {
// //     if (!newDesignation.trim()) {
// //       alert("Designation name required");
// //       return;
// //     }

// //     try {
// //       await axios.post(
// //         "http://localhost:8080/api/designations",
// //         { designationName: newDesignation },
// //         { withCredentials: true }
// //       );
// //       alert("Designation added successfully");
// //       setNewDesignation("");
// //       fetchDesignations();
// //     } catch (err) {
// //       console.error("Error adding designation:", err);
// //       alert("Failed to add designation");
// //     }
// //   };

// //   /* UPDATE DESIGNATION */
// //   const updateDesignation = async (id, updatedName) => {
// //     if (!updatedName.trim()) {
// //       alert("Designation name required");
// //       return;
// //     }

// //     try {
// //       await axios.put(
// //         `http://localhost:8080/api/designations/designation-update?designationId=${id}`,
// //         { designationName: updatedName },
// //         { withCredentials: true }
// //       );
// //       alert("Designation updated successfully");
// //       setEditingDesgId(null);
// //       fetchDesignations();
// //     } catch (err) {
// //       console.error("Error updating designation:", err);
// //       alert("Failed to update designation");
// //     }
// //   };

// //   return (
// //     <div className="dept-page">
// //       <h2 className="dept-heading">
// //         {section === "department" ? "Department" : "Designation"}
// //       </h2>

// //       {/* ================= ADD MODE ================= */}
// //       {mode === "add" && section === "department" && (
// //         <div className="dept-card">
// //           <h3>Add Department</h3>
// //           <div className="input-row">
// //             <input
// //               value={newDepartment}
// //               placeholder="Department name"
// //               onChange={(e) => setNewDepartment(e.target.value)}
// //             />
// //             <button onClick={addDepartment}>Add</button>
// //           </div>
// //         </div>
// //       )}

// //       {mode === "add" && section === "designation" && (
// //         <div className="dept-card">
// //           <h3>Add Designation</h3>
// //           <div className="input-row">
// //             <input
// //               value={newDesignation}
// //               placeholder="Designation name"
// //               onChange={(e) => setNewDesignation(e.target.value)}
// //             />
// //             <button onClick={addDesignation}>Add</button>
// //           </div>
// //         </div>
// //       )}

// //       {/* ================= EDIT MODE ================= */}
// //       {mode === "edit" && section === "department" && (
// //         <div className="dept-card">
// //           <h3>Edit Departments</h3>

// //           <input
// //             className="search-input"
// //             placeholder="Search department..."
// //             value={searchDept}
// //             onChange={(e) => setSearchDept(e.target.value)}
// //           />

// //           <ul>
// //             {departments
// //               .filter(d =>
// //                 d.departmentName
// //                   .toLowerCase()
// //                   .includes(searchDept.toLowerCase())
// //               )
// //               .map(d => (
// //                 <li key={d.id} className="edit-row">
// //                   {editingDeptId === d.id ? (
// //                     <div className="edit-inline">
// //                       <input
// //                         type="text"
// //                         defaultValue={d.departmentName}
// //                         ref={(input) => {
// //                           // Auto-focus when editing starts
// //                           if (input && editingDeptId === d.id) {
// //                             input.focus();
// //                             input.select();
// //                           }
// //                         }}
// //                         onKeyDown={(e) => {
// //                           if (e.key === 'Enter') {
// //                             updateDepartment(d.id, e.target.value);
// //                           } else if (e.key === 'Escape') {
// //                             setEditingDeptId(null);
// //                           }
// //                         }}
// //                       />
// //                       <div className="inline-buttons">
// //                         <button 
// //                           className="save-btn"
// //                           onClick={(e) => {
// //                             const input = e.target.closest('.edit-inline').querySelector('input');
// //                             updateDepartment(d.id, input.value);
// //                           }}
// //                         >
// //                           Save
// //                         </button>
// //                         <button 
// //                           className="cancel-btn"
// //                           onClick={() => setEditingDeptId(null)}
// //                         >
// //                           Cancel
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ) : (
// //                     <>
// //                       <span>{d.departmentName}</span>
// //                       <button
// //                         className="edit-btn"
// //                         onClick={() => setEditingDeptId(d.id)}
// //                       >
// //                         Edit
// //                       </button>
// //                     </>
// //                   )}
// //                 </li>
// //               ))}
// //           </ul>
// //         </div>
// //       )}

// //       {mode === "edit" && section === "designation" && (
// //         <div className="dept-card">
// //           <h3>Edit Designations</h3>

// //           <input
// //             className="search-input"
// //             placeholder="Search designation..."
// //             value={searchDesg}
// //             onChange={(e) => setSearchDesg(e.target.value)}
// //           />

// //           <ul>
// //             {designations
// //               .filter(d =>
// //                 d.designationName
// //                   .toLowerCase()
// //                   .includes(searchDesg.toLowerCase())
// //               )
// //               .map(d => (
// //                 <li key={d.id} className="edit-row">
// //                   {editingDesgId === d.id ? (
// //                     <div className="edit-inline">
// //                       <input
// //                         type="text"
// //                         defaultValue={d.designationName}
// //                         ref={(input) => {
// //                           // Auto-focus when editing starts
// //                           if (input && editingDesgId === d.id) {
// //                             input.focus();
// //                             input.select();
// //                           }
// //                         }}
// //                         onKeyDown={(e) => {
// //                           if (e.key === 'Enter') {
// //                             updateDesignation(d.id, e.target.value);
// //                           } else if (e.key === 'Escape') {
// //                             setEditingDesgId(null);
// //                           }
// //                         }}
// //                       />
// //                       <div className="inline-buttons">
// //                         <button 
// //                           className="save-btn"
// //                           onClick={(e) => {
// //                             const input = e.target.closest('.edit-inline').querySelector('input');
// //                             updateDesignation(d.id, input.value);
// //                           }}
// //                         >
// //                           Save
// //                         </button>
// //                         <button 
// //                           className="cancel-btn"
// //                           onClick={() => setEditingDesgId(null)}
// //                         >
// //                           Cancel
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ) : (
// //                     <>
// //                       <span>{d.designationName}</span>
// //                       <button
// //                         className="edit-btn"
// //                         onClick={() => setEditingDesgId(d.id)}
// //                       >
// //                         Edit
// //                       </button>
// //                     </>
// //                   )}
// //                 </li>
// //               ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./Department.css";

// export default function Department({ mode = "add", section = "department" }) {
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);

//   const [newDepartment, setNewDepartment] = useState("");
//   const [newDesignation, setNewDesignation] = useState("");

//   const [editingDeptId, setEditingDeptId] = useState(null);
//   const [editingDesgId, setEditingDesgId] = useState(null);

//   const [searchDept, setSearchDept] = useState("");
//   const [searchDesg, setSearchDesg] = useState("");

//   /* RESET WHEN SWITCH MODE */
//   useEffect(() => {
//     if (mode === "add") {
//       setEditingDeptId(null);
//       setEditingDesgId(null);
//       setNewDepartment("");
//       setNewDesignation("");
//     }
//   }, [mode]);

//   /* FETCH DATA */
//   const fetchDepartments = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/departments", {
//         withCredentials: true,
//       });
//       console.log("Departments response:", res.data); // Debug log
//       setDepartments(res.data);
//     } catch (err) {
//       console.error("Error fetching departments:", err);
//     }
//   };

//   const fetchDesignations = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/designations", {
//         withCredentials: true,
//       });
//       console.log("Designations response:", res.data); // Debug log
//       setDesignations(res.data);
//     } catch (err) {
//       console.error("Error fetching designations:", err);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     fetchDesignations();
//   }, []);

//   /* GET THE ID FIELD NAME BASED ON RESPONSE STRUCTURE */
//   const getIdField = (item) => {
//     // Try common ID field names
//     if (item.id) return item.id;
//     if (item.departmentId) return item.departmentId;
//     if (item.designationId) return item.designationId;
//     if (item.deptId) return item.deptId;
//     if (item.desgId) return item.desgId;
    
//     // Return null if no ID found
//     return null;
//   };

//   /* GET THE NAME FIELD */
//   const getNameField = (item) => {
//     if (section === "department") {
//       return item.departmentName || item.department_name || item.name || "N/A";
//     } else {
//       return item.designationName || item.designation_name || item.name || "N/A";
//     }
//   };

//   /* ADD DEPARTMENT */
//   const addDepartment = async () => {
//     if (!newDepartment.trim()) {
//       alert("Department name required");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:8080/api/departments",
//         { departmentName: newDepartment },
//         { withCredentials: true }
//       );
//       alert("Department added successfully");
//       setNewDepartment("");
//       fetchDepartments();
//     } catch (err) {
//       console.error("Error adding department:", err);
//       alert("Failed to add department");
//     }
//   };

//   /* UPDATE DEPARTMENT */
//   const updateDepartment = async (id, updatedName) => {
//     if (!updatedName.trim()) {
//       alert("Department name required");
//       return;
//     }

//     try {
//       await axios.put(
//         `http://localhost:8080/api/departments/department-upate?departmentId=${id}`,
//         { departmentName: updatedName },
//         { withCredentials: true }
//       );
//       alert("Department updated successfully");
//       setEditingDeptId(null);
//       fetchDepartments();
//     } catch (err) {
//       console.error("Error updating department:", err);
//       alert("Failed to update department");
//     }
//   };

//   /* ADD DESIGNATION */
//   const addDesignation = async () => {
//     if (!newDesignation.trim()) {
//       alert("Designation name required");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:8080/api/designations",
//         { designationName: newDesignation },
//         { withCredentials: true }
//       );
//       alert("Designation added successfully");
//       setNewDesignation("");
//       fetchDesignations();
//     } catch (err) {
//       console.error("Error adding designation:", err);
//       alert("Failed to add designation");
//     }
//   };

//   /* UPDATE DESIGNATION */
//   const updateDesignation = async (id, updatedName) => {
//     if (!updatedName.trim()) {
//       alert("Designation name required");
//       return;
//     }

//     try {
//       await axios.put(
//         `http://localhost:8080/api/designations/designation-update?designationId=${id}`,
//         { designationName: updatedName },
//         { withCredentials: true }
//       );
//       alert("Designation updated successfully");
//       setEditingDesgId(null);
//       fetchDesignations();
//     } catch (err) {
//       console.error("Error updating designation:", err);
//       alert("Failed to update designation");
//     }
//   };

//   return (
//     <div className="dept-page">
//       <h2 className="dept-heading">
//         {section === "department" ? "Department" : "Designation"}
//       </h2>

//       {/* ================= ADD MODE ================= */}
//       {mode === "add" && section === "department" && (
//         <div className="dept-card">
//           <h3>Add Department</h3>
//           <div className="input-row">
//             <input
//               value={newDepartment}
//               placeholder="Department name"
//               onChange={(e) => setNewDepartment(e.target.value)}
//             />
//             <button onClick={addDepartment}>Add</button>
//           </div>
//         </div>
//       )}

//       {mode === "add" && section === "designation" && (
//         <div className="dept-card">
//           <h3>Add Designation</h3>
//           <div className="input-row">
//             <input
//               value={newDesignation}
//               placeholder="Designation name"
//               onChange={(e) => setNewDesignation(e.target.value)}
//             />
//             <button onClick={addDesignation}>Add</button>
//           </div>
//         </div>
//       )}

//       {/* ================= EDIT MODE ================= */}
//       {mode === "edit" && section === "department" && (
//         <div className="dept-card">
//           <h3>Edit Departments</h3>

//           <input
//             className="search-input"
//             placeholder="Search department..."
//             value={searchDept}
//             onChange={(e) => setSearchDept(e.target.value)}
//           />

//           <ul>
//             {departments.length === 0 ? (
//               <li className="no-data">No departments found</li>
//             ) : (
//               departments
//                 .filter(d => {
//                   const name = getNameField(d);
//                   return name.toLowerCase().includes(searchDept.toLowerCase());
//                 })
//                 .map(d => {
//                   const itemId = getIdField(d);
//                   const itemName = getNameField(d);
                  
//                   return (
//                     <li key={itemId || JSON.stringify(d)} className="edit-row">
//                       {editingDeptId === itemId ? (
//                         <div className="edit-inline">
//                           <input
//                             type="text"
//                             defaultValue={itemName}
//                             ref={(input) => {
//                               if (input && editingDeptId === itemId) {
//                                 input.focus();
//                                 input.select();
//                               }
//                             }}
//                             onKeyDown={(e) => {
//                               if (e.key === 'Enter') {
//                                 updateDepartment(itemId, e.target.value);
//                               } else if (e.key === 'Escape') {
//                                 setEditingDeptId(null);
//                               }
//                             }}
//                           />
//                           <div className="inline-buttons">
//                             <button 
//                               className="save-btn"
//                               onClick={(e) => {
//                                 const input = e.target.closest('.edit-inline').querySelector('input');
//                                 updateDepartment(itemId, input.value);
//                               }}
//                             >
//                               Save
//                             </button>
//                             <button 
//                               className="cancel-btn"
//                               onClick={() => setEditingDeptId(null)}
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <>
//                           <span>{itemName}</span>
//                           <button
//                             className="edit-btn"
//                             onClick={() => setEditingDeptId(itemId)}
//                             disabled={!itemId}
//                           >
//                             Edit
//                           </button>
//                         </>
//                       )}
//                     </li>
//                   );
//                 })
//             )}
//           </ul>
//         </div>
//       )}

//       {mode === "edit" && section === "designation" && (
//         <div className="dept-card">
//           <h3>Edit Designations</h3>

//           <input
//             className="search-input"
//             placeholder="Search designation..."
//             value={searchDesg}
//             onChange={(e) => setSearchDesg(e.target.value)}
//           />

//           <ul>
//             {designations.length === 0 ? (
//               <li className="no-data">No designations found</li>
//             ) : (
//               designations
//                 .filter(d => {
//                   const name = getNameField(d);
//                   return name.toLowerCase().includes(searchDesg.toLowerCase());
//                 })
//                 .map(d => {
//                   const itemId = getIdField(d);
//                   const itemName = getNameField(d);
                  
//                   return (
//                     <li key={itemId || JSON.stringify(d)} className="edit-row">
//                       {editingDesgId === itemId ? (
//                         <div className="edit-inline">
//                           <input
//                             type="text"
//                             defaultValue={itemName}
//                             ref={(input) => {
//                               if (input && editingDesgId === itemId) {
//                                 input.focus();
//                                 input.select();
//                               }
//                             }}
//                             onKeyDown={(e) => {
//                               if (e.key === 'Enter') {
//                                 updateDesignation(itemId, e.target.value);
//                               } else if (e.key === 'Escape') {
//                                 setEditingDesgId(null);
//                               }
//                             }}
//                           />
//                           <div className="inline-buttons">
//                             <button 
//                               className="save-btn"
//                               onClick={(e) => {
//                                 const input = e.target.closest('.edit-inline').querySelector('input');
//                                 updateDesignation(itemId, input.value);
//                               }}
//                             >
//                               Save
//                             </button>
//                             <button 
//                               className="cancel-btn"
//                               onClick={() => setEditingDesgId(null)}
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <>
//                           <span>{itemName}</span>
//                           <button
//                             className="edit-btn"
//                             onClick={() => setEditingDesgId(itemId)}
//                             disabled={!itemId}
//                           >
//                             Edit
//                           </button>
//                         </>
//                       )}
//                     </li>
//                   );
//                 })
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
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

  const [editingDept, setEditingDept] = useState(null);
  const [editingDesg, setEditingDesg] = useState(null);
  const [editDeptName, setEditDeptName] = useState("");
  const [editDesgName, setEditDesgName] = useState("");

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
      const cleaned = res.data.filter((d) => d.designationName !== null);
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
      fetchDepartments();
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

  /* ======================
     UPDATE DEPARTMENT
     ====================== */
  const updateDepartment = async (id) => {
    if (!editDeptName.trim()) {
      alert("Department name is required");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/departments/department-upate?departmentId=${id}`,
        { departmentName: editDeptName },
        { withCredentials: true }
      );
      alert("Department updated successfully");
      setEditingDept(null);
      setEditDeptName("");
      fetchDepartments();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  /* ======================
     UPDATE DESIGNATION
     ====================== */
  const updateDesignation = async (id) => {
    if (!editDesgName.trim()) {
      alert("Designation name is required");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/designations/designation-update?designationId=${id}`,
        { designationName: editDesgName },
        { withCredentials: true }
      );
      alert("Designation updated successfully");
      setEditingDesg(null);
      setEditDesgName("");
      fetchDesignations();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  /* ======================
     START EDITING
     ====================== */
  const startEditDept = (dept) => {
    setEditingDept(dept.id);
    setEditDeptName(dept.departmentName);
  };

  const startEditDesg = (desg) => {
    setEditingDesg(desg.id);
    setEditDesgName(desg.designationName);
  };

  const cancelEdit = () => {
    setEditingDept(null);
    setEditingDesg(null);
    setEditDeptName("");
    setEditDesgName("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Department & Designation Management</h1>
        <p style={styles.subtitle}>Manage your organizational structure</p>
      </div>

      <div style={styles.gridContainer}>
        {/* DEPARTMENTS CARD */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Departments</h3>
            <span style={styles.badge}>{departments.length} Total</span>
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter department name..."
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
              style={styles.input}
              onKeyPress={(e) => e.key === "Enter" && addDepartment()}
            />
            <button
              onClick={addDepartment}
              disabled={loadingDept}
              style={styles.addButton}
            >
              {loadingDept ? "Adding..." : "➕ Add"}
            </button>
          </div>

          <div style={styles.listContainer}>
            {departments.length === 0 ? (
              <div style={styles.emptyState}>
                <p>No departments yet. Add your first department above.</p>
              </div>
            ) : (
              departments.map((dept) => (
                <div key={dept.id} style={styles.listItem}>
                  {editingDept === dept.id ? (
                    <div style={styles.editContainer}>
                      <input
                        type="text"
                        value={editDeptName}
                        onChange={(e) => setEditDeptName(e.target.value)}
                        style={styles.editInput}
                        autoFocus
                      />
                      <div style={styles.editActions}>
                        <button
                          onClick={() => updateDepartment(dept.id)}
                          style={styles.saveButton}
                          title="Save"
                        >
                          ✓
                        </button>
                        <button
                          onClick={cancelEdit}
                          style={styles.cancelButton}
                          title="Cancel"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span style={styles.itemText}>{dept.departmentName}</span>
                      <div style={styles.actions}>
                        <button
                          onClick={() => startEditDept(dept)}
                          style={styles.editButton}
                          title="Edit"
                        >
                          ✎ Edit
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* DESIGNATIONS CARD */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Designations</h3>
            <span style={styles.badge}>{designations.length} Total</span>
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter designation name..."
              value={newDesignation}
              onChange={(e) => setNewDesignation(e.target.value)}
              style={styles.input}
              onKeyPress={(e) => e.key === "Enter" && addDesignation()}
            />
            <button
              onClick={addDesignation}
              disabled={loadingDesg}
              style={styles.addButton}
            >
              {loadingDesg ? "Adding..." : "➕ Add"}
            </button>
          </div>

          <div style={styles.listContainer}>
            {designations.length === 0 ? (
              <div style={styles.emptyState}>
                <p>No designations yet. Add your first designation above.</p>
              </div>
            ) : (
              designations.map((desg) => (
                <div key={desg.id} style={styles.listItem}>
                  {editingDesg === desg.id ? (
                    <div style={styles.editContainer}>
                      <input
                        type="text"
                        value={editDesgName}
                        onChange={(e) => setEditDesgName(e.target.value)}
                        style={styles.editInput}
                        autoFocus
                      />
                      <div style={styles.editActions}>
                        <button
                          onClick={() => updateDesignation(desg.id)}
                          style={styles.saveButton}
                          title="Save"
                        >
                          ✓
                        </button>
                        <button
                          onClick={cancelEdit}
                          style={styles.cancelButton}
                          title="Cancel"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span style={styles.itemText}>{desg.designationName}</span>
                      <div style={styles.actions}>
                        <button
                          onClick={() => startEditDesg(desg)}
                          style={styles.editButton}
                          title="Edit"
                        >
                          ✎ Edit
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================
   PROFESSIONAL STYLES
   ====================== */
const styles = {
  page: {
    padding: "40px 20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #ff7a00, #ff9f43)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#6b7280",
    fontWeight: "400",
    margin: 0,
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "2px solid #f3f4f6",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#111827",
    margin: 0,
  },
  badge: {
    backgroundColor: "#fff7ed",
    color: "#f97316",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },
  inputGroup: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px",
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "10px",
    border: "2px solid #e5e7eb",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s ease",
    backgroundColor: "#fafafa",
    fontFamily: "inherit",
  },
  addButton: {
    padding: "12px 24px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #ff7a00, #ff9f43)",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 8px rgba(255, 122, 0, 0.3)",
  },
  listContainer: {
    maxHeight: "450px",
    overflowY: "auto",
    paddingRight: "4px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    marginBottom: "8px",
    borderRadius: "10px",
    backgroundColor: "#fafafa",
    border: "1px solid #e5e7eb",
    transition: "all 0.2s ease",
  },
  itemText: {
    fontSize: "15px",
    color: "#374151",
    fontWeight: "500",
    flex: 1,
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  editButton: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "500",
  },
  editContainer: {
    display: "flex",
    gap: "12px",
    width: "100%",
    alignItems: "center",
  },
  editInput: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "8px",
    border: "2px solid #3b82f6",
    fontSize: "15px",
    outline: "none",
    backgroundColor: "#ffffff",
    fontFamily: "inherit",
  },
  editActions: {
    display: "flex",
    gap: "8px",
  },
  saveButton: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#10b981",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
  cancelButton: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#6b7280",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#9ca3af",
    fontSize: "15px",
  },
};