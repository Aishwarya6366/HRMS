// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";
// // // // import "./HrCalculateSalary.css";

// // // // export default function HrCalculateSalary({ mode = "add" }) {
// // // //   const [basicPercentage, setBasicPercentage] = useState("");
// // // //   const [hraPercentage, setHraPercentage] = useState("");
// // // //   const [pfPercentage, setPfPercentage] = useState("");

// // // //   const [errors, setErrors] = useState({});
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [message, setMessage] = useState("");

// // // //   /* ================= FETCH EXISTING PERCENTAGES ================= */
// // // //   useEffect(() => {
// // // //     if (mode === "edit") {
// // // //       fetchSalaryConfig();
// // // //     } else {
// // // //       setBasicPercentage("");
// // // //       setHraPercentage("");
// // // //       setPfPercentage("");
// // // //       setErrors({});
// // // //       setMessage("");
// // // //     }
// // // //   }, []);

// // // //   const fetchSalaryConfig = async () => {
// // // //     try {
// // // //       setLoading(true);

// // // //       const res = await axios.get(
// // // //         "http://localhost:8080/salary/calculator/get",
// // // //         { withCredentials: true }
// // // //       );

// // // //       const data = Array.isArray(res.data) ? res.data[0] : res.data;

// // // //       if (!data) {
// // // //         setMessage("ℹ️ No salary configuration found.");
// // // //         return;
// // // //       }

// // // //       setBasicPercentage(String(data.basicPercentage ?? ""));
// // // //       setHraPercentage(String(data.hraPercentage ?? ""));
// // // //       setPfPercentage(String(data.pfPercentage ?? ""));
// // // //     } catch (err) {
// // // //       setMessage("❌ Failed to load salary configuration");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   /* ================= VALIDATION ================= */
// // // //   const validateField = (value) => {
// // // //     if (value === "") return "This field is required";
// // // //     if (!/^\d+(\.\d{1,2})?$/.test(value))
// // // //       return "Only numbers (max 2 decimals) allowed";

// // // //     const num = Number(value);
// // // //     if (num <= 0) return "Value must be greater than 0";
// // // //     if (num > 100) return "Value cannot exceed 100";

// // // //     return "";
// // // //   };

// // // //   const handleChange = (name, value) => {
// // // //     // allow digits + decimal + 2 decimal places
// // // //     if (!/^\d*\.?\d{0,2}$/.test(value)) return;

// // // //     if (name === "basic") setBasicPercentage(value);
// // // //     if (name === "hra") setHraPercentage(value);
// // // //     if (name === "pf") setPfPercentage(value);

// // // //     setErrors((prev) => ({
// // // //       ...prev,
// // // //       [name]: validateField(value),
// // // //     }));
// // // //   };

// // // //   const handleBlur = (name, value) => {
// // // //     setErrors((prev) => ({
// // // //       ...prev,
// // // //       [name]: validateField(value),
// // // //     }));
// // // //   };

// // // //   /* ================= SAVE / UPDATE CONFIG ================= */
// // // //   const saveSalaryConfig = async () => {
// // // //     const newErrors = {
// // // //       basic: validateField(basicPercentage),
// // // //       hra: validateField(hraPercentage),
// // // //       pf: validateField(pfPercentage),
// // // //     };

// // // //     setErrors(newErrors);

// // // //     if (Object.values(newErrors).some((err) => err)) return;

// // // //     try {
// // // //       setLoading(true);

// // // //       await axios.post(
// // // //         "http://localhost:8080/salary/calculator",
// // // //         {
// // // //           id: 0,
// // // //           basicPercentage: Number(basicPercentage),
// // // //           hraPercentage: Number(hraPercentage),
// // // //           pfPercentage: Number(pfPercentage),
// // // //         },
// // // //         { withCredentials: true }
// // // //       );

// // // //       setMessage(
// // // //         mode === "edit"
// // // //           ? "✅ Salary configuration updated successfully"
// // // //           : "✅ Salary configuration saved successfully"
// // // //       );

// // // //       setTimeout(() => setMessage(""), 3000);
// // // //       fetchSalaryConfig();
// // // //     } catch (err) {
// // // //       setMessage("❌ Failed to save salary configuration");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="salary-calc-page">
// // // //       <div className="salary-calc-card">
// // // //         <h2>
// // // //           {mode === "edit"
// // // //             ? "Edit Salary Configuration"
// // // //             : "Calculate Salary"}
// // // //         </h2>

// // // //         <p className="subtitle">
// // // //           Configure salary calculation percentages
// // // //         </p>

// // // //         {message && (
// // // //           <div
// // // //             className={`message ${
// // // //               message.includes("✅") ? "success" : "error"
// // // //             }`}
// // // //           >
// // // //             {message}
// // // //           </div>
// // // //         )}

// // // //         {/* BASIC */}
// // // //         <div className="form-group">
// // // //           <label>Basic Percentage (%)</label>
// // // //           <input
// // // //             type="text"
// // // //             value={basicPercentage}
// // // //             onChange={(e) =>
// // // //               handleChange("basic", e.target.value)
// // // //             }
// // // //             onBlur={(e) =>
// // // //               handleBlur("basic", e.target.value)
// // // //             }
// // // //             onPaste={(e) => e.preventDefault()}
// // // //           />
// // // //           {errors.basic && (
// // // //             <p className="field-error">{errors.basic}</p>
// // // //           )}
// // // //         </div>

// // // //         {/* HRA */}
// // // //         <div className="form-group">
// // // //           <label>HRA Percentage (% of Basic)</label>
// // // //           <input
// // // //             type="text"
// // // //             value={hraPercentage}
// // // //             onChange={(e) =>
// // // //               handleChange("hra", e.target.value)
// // // //             }
// // // //             onBlur={(e) =>
// // // //               handleBlur("hra", e.target.value)
// // // //             }
// // // //             onPaste={(e) => e.preventDefault()}
// // // //           />
// // // //           {errors.hra && (
// // // //             <p className="field-error">{errors.hra}</p>
// // // //           )}
// // // //         </div>

// // // //         {/* PF */}
// // // //         <div className="form-group">
// // // //           <label>PF Percentage (% of Basic)</label>
// // // //           <input
// // // //             type="text"
// // // //             value={pfPercentage}
// // // //             onChange={(e) =>
// // // //               handleChange("pf", e.target.value)
// // // //             }
// // // //             onBlur={(e) =>
// // // //               handleBlur("pf", e.target.value)
// // // //             }
// // // //             onPaste={(e) => e.preventDefault()}
// // // //           />
// // // //           {errors.pf && (
// // // //             <p className="field-error">{errors.pf}</p>
// // // //           )}
// // // //         </div>

// // // //         <button
// // // //           className="save-btn"
// // // //           onClick={saveSalaryConfig}
// // // //           disabled={loading}
// // // //         >
// // // //           {loading
// // // //             ? "Saving..."
// // // //             : mode === "edit"
// // // //             ? "Update Configuration"
// // // //             : "Save Configuration"}
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import "./HrCalculateSalary.css";

// // // export default function HrCalculateSalary({ mode = "add" }) {
// // //   const [configId, setConfigId] = useState(null);
// // //   const [basicPercentage, setBasicPercentage] = useState("");
// // //   const [hraPercentage, setHraPercentage] = useState("");
// // //   const [pfPercentage, setPfPercentage] = useState("");

// // //   const [errors, setErrors] = useState({});
// // //   const [loading, setLoading] = useState(false);
// // //   const [message, setMessage] = useState("");

// // //   /* ================= FETCH EXISTING PERCENTAGES ================= */
// // //   useEffect(() => {
// // //     if (mode === "edit") {
// // //       fetchSalaryConfig();
// // //     } else {
// // //       resetForm();
// // //     }
// // //   }, [mode]);

// // //   const fetchSalaryConfig = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setMessage("");

// // //       const res = await axios.get(
// // //         "http://localhost:8080/salary/calculator/get",
// // //         { withCredentials: true }
// // //       );

// // //       console.log("API Response:", res.data); // Debug log

// // //       // Handle different response formats
// // //       let data = null;
// // //       if (Array.isArray(res.data) && res.data.length > 0) {
// // //         // If it's an array, take the first item
// // //         data = res.data[0];
// // //       } else if (typeof res.data === 'object' && res.data !== null) {
// // //         // If it's an object, use it directly
// // //         data = res.data;
// // //       }

// // //       if (!data || (!data.basicPercentage && data.basicPercentage !== 0)) {
// // //         setMessage("ℹ️ No salary configuration found. Please add a new configuration.");
// // //         return;
// // //       }

// // //       // Extract ID from the response (could be different field names)
// // //       const id = data.id || data.salaryConfigId || data.configId;
// // //       setConfigId(id);

// // //       setBasicPercentage(String(data.basicPercentage ?? ""));
// // //       setHraPercentage(String(data.hraPercentage ?? ""));
// // //       setPfPercentage(String(data.pfPercentage ?? ""));

// // //     } catch (err) {
// // //       console.error("Fetch error:", err);
// // //       setMessage("❌ Failed to load salary configuration");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const resetForm = () => {
// // //     setConfigId(null);
// // //     setBasicPercentage("");
// // //     setHraPercentage("");
// // //     setPfPercentage("");
// // //     setErrors({});
// // //     setMessage("");
// // //   };

// // //   /* ================= VALIDATION ================= */
// // //   const validateField = (value) => {
// // //     if (value === "") return "This field is required";
// // //     if (!/^\d+(\.\d{1,2})?$/.test(value))
// // //       return "Only numbers (max 2 decimals) allowed";

// // //     const num = Number(value);
// // //     if (num <= 0) return "Value must be greater than 0";
// // //     if (num > 100) return "Value cannot exceed 100";

// // //     return "";
// // //   };

// // //   const handleChange = (name, value) => {
// // //     // allow digits + decimal + 2 decimal places
// // //     if (!/^\d*\.?\d{0,2}$/.test(value)) return;

// // //     if (name === "basic") setBasicPercentage(value);
// // //     if (name === "hra") setHraPercentage(value);
// // //     if (name === "pf") setPfPercentage(value);

// // //     setErrors((prev) => ({
// // //       ...prev,
// // //       [name]: validateField(value),
// // //     }));
// // //   };

// // //   const handleBlur = (name, value) => {
// // //     setErrors((prev) => ({
// // //       ...prev,
// // //       [name]: validateField(value),
// // //     }));
// // //   };

// // //   /* ================= SAVE / UPDATE CONFIG ================= */
// // //   const saveSalaryConfig = async () => {
// // //     const newErrors = {
// // //       basic: validateField(basicPercentage),
// // //       hra: validateField(hraPercentage),
// // //       pf: validateField(pfPercentage),
// // //     };

// // //     setErrors(newErrors);

// // //     if (Object.values(newErrors).some((err) => err)) return;

// // //     try {
// // //       setLoading(true);
// // //       setMessage("");

// // //       const payload = {
// // //         basicPercentage: Number(basicPercentage),
// // //         hraPercentage: Number(hraPercentage),
// // //         pfPercentage: Number(pfPercentage),
// // //       };

// // //       let response;
      
// // //       if (mode === "edit" && configId) {
// // //         // UPDATE existing configuration
// // //         response = await axios.put(
// // //           `http://localhost:8080/salary/update/${configId}`,
// // //           payload,
// // //           { withCredentials: true }
// // //         );
// // //       } else {
// // //         // ADD new configuration
// // //         response = await axios.post(
// // //           "http://localhost:8080/salary/calculator",
// // //           payload,
// // //           { withCredentials: true }
// // //         );
        
// // //         // If response contains an ID, update configId for future edits
// // //         if (response.data && (response.data.id || response.data.salaryConfigId)) {
// // //           setConfigId(response.data.id || response.data.salaryConfigId);
// // //         }
// // //       }

// // //       setMessage(
// // //         mode === "edit" && configId
// // //           ? "✅ Salary configuration updated successfully"
// // //           : "✅ Salary configuration saved successfully"
// // //       );

// // //       setTimeout(() => setMessage(""), 3000);
      
// // //       // Refresh data in edit mode
// // //       if (mode === "edit") {
// // //         fetchSalaryConfig();
// // //       }
      
// // //     } catch (err) {
// // //       console.error("Save error:", err.response?.data || err.message);
// // //       setMessage("❌ Failed to save salary configuration. Please try again.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   /* ================= DEBUG VIEW ================= */
// // //   const renderDebugInfo = () => {
// // //     if (process.env.NODE_ENV === 'development') {
// // //       return (
// // //         <div className="debug-info" style={{
// // //           background: '#f0f0f0',
// // //           padding: '10px',
// // //           marginTop: '20px',
// // //           borderRadius: '5px',
// // //           fontSize: '12px'
// // //         }}>
// // //           <p><strong>Debug Info:</strong></p>
// // //           <p>Mode: {mode}</p>
// // //           <p>Config ID: {configId || 'None'}</p>
// // //           <p>Basic: {basicPercentage}</p>
// // //           <p>HRA: {hraPercentage}</p>
// // //           <p>PF: {pfPercentage}</p>
// // //         </div>
// // //       );
// // //     }
// // //     return null;
// // //   };

// // //   return (
// // //     <div className="salary-calc-page">
// // //       <div className="salary-calc-card">
// // //         <h2>
// // //           {mode === "edit" && configId
// // //             ? "Edit Salary Configuration"
// // //             : mode === "edit"
// // //             ? "Add Salary Configuration"
// // //             : "Add Salary Configuration"}
// // //         </h2>

// // //         <p className="subtitle">
// // //           Configure salary calculation percentages (Basic, HRA, PF)
// // //         </p>

// // //         {message && (
// // //           <div
// // //             className={`message ${
// // //               message.includes("✅") ? "success" : "error"
// // //             }`}
// // //           >
// // //             {message}
// // //           </div>
// // //         )}

// // //         {loading && mode === "edit" && (
// // //           <div className="loading-message">Loading configuration...</div>
// // //         )}

// // //         {/* BASIC */}
// // //         <div className="form-group">
// // //           <label>Basic Percentage (%) *</label>
// // //           <input
// // //             type="text"
// // //             value={basicPercentage}
// // //             onChange={(e) => handleChange("basic", e.target.value)}
// // //             onBlur={(e) => handleBlur("basic", e.target.value)}
// // //             placeholder="e.g., 50.00"
// // //             disabled={loading}
// // //           />
// // //           {errors.basic && (
// // //             <p className="field-error">{errors.basic}</p>
// // //           )}
// // //         </div>

// // //         {/* HRA */}
// // //         <div className="form-group">
// // //           <label>HRA Percentage (% of Basic) *</label>
// // //           <input
// // //             type="text"
// // //             value={hraPercentage}
// // //             onChange={(e) => handleChange("hra", e.target.value)}
// // //             onBlur={(e) => handleBlur("hra", e.target.value)}
// // //             placeholder="e.g., 40.00"
// // //             disabled={loading}
// // //           />
// // //           {errors.hra && (
// // //             <p className="field-error">{errors.hra}</p>
// // //           )}
// // //         </div>

// // //         {/* PF */}
// // //         <div className="form-group">
// // //           <label>PF Percentage (% of Basic) *</label>
// // //           <input
// // //             type="text"
// // //             value={pfPercentage}
// // //             onChange={(e) => handleChange("pf", e.target.value)}
// // //             onBlur={(e) => handleBlur("pf", e.target.value)}
// // //             placeholder="e.g., 12.00"
// // //             disabled={loading}
// // //           />
// // //           {errors.pf && (
// // //             <p className="field-error">{errors.pf}</p>
// // //           )}
// // //         </div>

// // //         <button
// // //           className="save-btn"
// // //           onClick={saveSalaryConfig}
// // //           disabled={loading || Object.values(errors).some(err => err)}
// // //         >
// // //           {loading
// // //             ? "Saving..."
// // //             : mode === "edit" && configId
// // //             ? "Update Configuration"
// // //             : "Save Configuration"}
// // //         </button>

// // //         {mode === "edit" && !configId && (
// // //           <div className="info-message">
// // //             ℹ️ No existing configuration found. Fill in the details to create a new one.
// // //           </div>
// // //         )}

// // //         {renderDebugInfo()}
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // 

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./HrCalculateSalary.css";

// // export default function SalaryConfiguration() {
// //   const [form, setForm] = useState({
// //     id: null,
// //     basicPercentage: "",
// //     hraPercentage: "",
// //     pfPercentage: ""
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState("");
// //   const [configExists, setConfigExists] = useState(false);

// //   // Load existing configuration on component mount
// //   useEffect(() => {
// //     fetchSalaryConfig();
// //   }, []);

// //   const fetchSalaryConfig = async () => {
// //     try {
// //       setLoading(true);
// //       console.log("Fetching salary configuration...");

// //       const response = await axios.get(
// //         "http://localhost:8080/salary/calculator/get",
// //         { 
// //           withCredentials: true,
// //           headers: {
// //             'Content-Type': 'application/json',
// //           }
// //         }
// //       );

// //       console.log("API Response:", response.data);

// //       // Check if we have valid data
// //       if (response.data && 
// //           response.data.id !== undefined && 
// //           response.data.id !== null) {
        
// //         setForm({
// //           id: response.data.id,
// //           basicPercentage: response.data.basicPercentage?.toString() || "",
// //           hraPercentage: response.data.hraPercentage?.toString() || "",
// //           pfPercentage: response.data.pfPercentage?.toString() || ""
// //         });
        
// //         setConfigExists(true);
// //         setMessage("✅ Configuration loaded successfully");
// //       } else {
// //         // No configuration exists yet
// //         resetForm();
// //         setConfigExists(false);
// //         setMessage("ℹ️ No configuration found. Please create one.");
// //       }
      
// //     } catch (error) {
// //       console.error("Error fetching config:", error);
      
// //       if (error.response?.status === 400 || error.response?.status === 404) {
// //         // No configuration exists - this is OK for first-time setup
// //         resetForm();
// //         setConfigExists(false);
// //         setMessage("ℹ️ No configuration found. Please create one.");
// //       } else {
// //         setMessage("❌ Error loading configuration");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const resetForm = () => {
// //     setForm({
// //       id: null,
// //       basicPercentage: "",
// //       hraPercentage: "",
// //       pfPercentage: ""
// //     });
// //   };

// //   const validateForm = () => {
// //     const errors = {};
    
// //     // Check if all fields are filled
// //     if (!form.basicPercentage.trim()) {
// //       errors.basic = "Basic percentage is required";
// //     } else if (parseFloat(form.basicPercentage) <= 0 || parseFloat(form.basicPercentage) > 100) {
// //       errors.basic = "Basic percentage must be between 1 and 100";
// //     }
    
// //     if (!form.hraPercentage.trim()) {
// //       errors.hra = "HRA percentage is required";
// //     } else if (parseFloat(form.hraPercentage) <= 0 || parseFloat(form.hraPercentage) > 100) {
// //       errors.hra = "HRA percentage must be between 1 and 100";
// //     }
    
// //     if (!form.pfPercentage.trim()) {
// //       errors.pf = "PF percentage is required";
// //     } else if (parseFloat(form.pfPercentage) <= 0 || parseFloat(form.pfPercentage) > 100) {
// //       errors.pf = "PF percentage must be between 1 and 100";
// //     }
    
// //     return errors;
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
    
// //     // Allow only numbers and decimal points
// //     if (value === "" || /^\d*\.?\d*$/.test(value)) {
// //       setForm(prev => ({
// //         ...prev,
// //         [name]: value
// //       }));
// //     }
// //   };

// //   const handleBlur = (e) => {
// //     const { name, value } = e.target;
    
// //     // Format to 2 decimal places on blur
// //     if (value && !isNaN(value)) {
// //       const num = parseFloat(value).toFixed(2);
// //       setForm(prev => ({
// //         ...prev,
// //         [name]: num
// //       }));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     // Validate form
// //     const errors = validateForm();
// //     if (Object.keys(errors).length > 0) {
// //       // Show errors
// //       alert("Please fix the following errors:\n" + 
// //         Object.values(errors).join("\n"));
// //       return;
// //     }
    
// //     try {
// //       setLoading(true);
// //       setMessage("");
      
// //       const payload = {
// //         basicPercentage: parseFloat(form.basicPercentage),
// //         hraPercentage: parseFloat(form.hraPercentage),
// //         pfPercentage: parseFloat(form.pfPercentage)
// //       };
      
// //       console.log("Submitting payload:", payload);
      
// //       if (configExists && form.id) {
// //         // UPDATE existing configuration
// //         console.log("Updating config with ID:", form.id);
// //         await axios.put(
// //           `http://localhost:8080/salary/update/${form.id}`,
// //           payload,
// //           { 
// //             withCredentials: true,
// //             headers: {
// //               'Content-Type': 'application/json',
// //             }
// //           }
// //         );
// //         setMessage("✅ Configuration updated successfully");
// //       } else {
// //         // CREATE new configuration (only allowed if none exists)
// //         console.log("Creating new config");
// //         const response = await axios.post(
// //           "http://localhost:8080/salary/calculator",
// //           payload,
// //           { 
// //             withCredentials: true,
// //             headers: {
// //               'Content-Type': 'application/json',
// //             }
// //           }
// //         );
        
// //         console.log("Create response:", response.data);
        
// //         // Update the form with the new ID from response
// //         if (response.data && response.data.id) {
// //           setForm(prev => ({
// //             ...prev,
// //             id: response.data.id
// //           }));
// //           setConfigExists(true);
// //         }
        
// //         setMessage("✅ Configuration created successfully");
// //       }
      
// //       // Refresh the configuration
// //       setTimeout(() => {
// //         fetchSalaryConfig();
// //       }, 1000);
      
// //     } catch (error) {
// //       console.error("Error saving configuration:", error);
      
// //       if (error.response?.status === 500) {
// //         if (configExists) {
// //           setMessage("❌ Error updating configuration. Please try again.");
// //         } else {
// //           setMessage("❌ Configuration already exists! You can only create it once. Please refresh the page to edit.");
// //         }
// //       } else {
// //         setMessage(`❌ Error: ${error.response?.data?.message || error.message}`);
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleReset = () => {
// //     if (window.confirm("Are you sure you want to reset the form?")) {
// //       resetForm();
// //       setMessage("");
// //     }
// //   };

// //   if (loading && !configExists) {
// //     return (
// //       <div className="salary-calc-page">
// //         <div className="salary-calc-card">
// //           <h2>Loading Configuration...</h2>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="salary-calc-page">
// //       <div className="salary-calc-card">
// //         <h2>Salary Configuration</h2>
        
// //         <p className="subtitle">
// //           {configExists 
// //             ? "Edit salary calculation percentages (Can be updated anytime)" 
// //             : "Create salary calculation percentages (Can only be created once)"}
// //         </p>
        
// //         {message && (
// //           <div className={`message ${message.includes("✅") ? "success" : "error"}`}>
// //             {message}
// //           </div>
// //         )}
        
// //         <form onSubmit={handleSubmit}>
// //           <div className="form-group">
// //             <label htmlFor="basicPercentage">
// //               Basic Percentage (%) *
// //             </label>
// //             <input
// //               id="basicPercentage"
// //               type="text"
// //               name="basicPercentage"
// //               value={form.basicPercentage}
// //               onChange={handleInputChange}
// //               onBlur={handleBlur}
// //               placeholder="e.g., 40.00"
// //               disabled={loading}
// //               required
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label htmlFor="hraPercentage">
// //               HRA Percentage (% of Basic) *
// //             </label>
// //             <input
// //               id="hraPercentage"
// //               type="text"
// //               name="hraPercentage"
// //               value={form.hraPercentage}
// //               onChange={handleInputChange}
// //               onBlur={handleBlur}
// //               placeholder="e.g., 20.00"
// //               disabled={loading}
// //               required
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label htmlFor="pfPercentage">
// //               PF Percentage (% of Basic) *
// //             </label>
// //             <input
// //               id="pfPercentage"
// //               type="text"
// //               name="pfPercentage"
// //               value={form.pfPercentage}
// //               onChange={handleInputChange}
// //               onBlur={handleBlur}
// //               placeholder="e.g., 12.00"
// //               disabled={loading}
// //               required
// //             />
// //           </div>
          
// //           <div className="button-group">
// //             <button
// //               type="submit"
// //               className="save-btn"
// //               disabled={loading}
// //             >
// //               {loading 
// //                 ? "Processing..." 
// //                 : configExists 
// //                   ? "Update Configuration" 
// //                   : "Create Configuration"}
// //             </button>
            
// //             <button
// //               type="button"
// //               className="reset-btn"
// //               onClick={handleReset}
// //               disabled={loading}
// //             >
// //               Reset
// //             </button>
// //           </div>
// //         </form>
        
// //         <div className="info-box">
// //           <h4>Rules:</h4>
// //           <ul>
// //             <li>Configuration can only be <strong>created once</strong></li>
// //             <li>After creation, it can be <strong>updated anytime</strong></li>
// //             <li>All fields are required</li>
// //             <li>Values must be between 1% and 100%</li>
// //             <li>Values are saved with 2 decimal places</li>
// //           </ul>
// //         </div>
        
// //         {process.env.NODE_ENV === 'development' && (
// //           <div className="debug-info">
// //             <p><strong>Debug Info:</strong></p>
// //             <p>Config ID: {form.id || 'None'}</p>
// //             <p>Config Exists: {configExists ? 'Yes' : 'No'}</p>
// //             <p>Basic: {form.basicPercentage || 'Empty'}</p>
// //             <p>HRA: {form.hraPercentage || 'Empty'}</p>
// //             <p>PF: {form.pfPercentage || 'Empty'}</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./HrCalculateSalary.css";

// export default function SalaryConfiguration() {
//   const [form, setForm] = useState({
//     id: null,
//     basicPercentage: "",
//     hraPercentage: "",
//     pfPercentage: ""
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState(""); // "success" or "error"
//   const [configExists, setConfigExists] = useState(false);
//   const [hasFetched, setHasFetched] = useState(false);

//   // Load existing configuration on component mount
//   useEffect(() => {
//     fetchSalaryConfig();
//   }, []);

//   const fetchSalaryConfig = async () => {
//     try {
//       setLoading(true);
//       console.log("Fetching salary configuration...");

//       const response = await axios.get(
//         "http://localhost:8080/salary/calculator/get",
//         { 
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       console.log("API Response:", response.data);

//       // Handle different response formats
//       let configData = null;
      
//       if (Array.isArray(response.data) && response.data.length > 0) {
//         // Response is an array
//         configData = response.data[0];
//       } else if (response.data && typeof response.data === 'object') {
//         // Response is an object
//         configData = response.data;
//       }

//       if (configData && configData.id !== undefined && configData.id !== null) {
//         // Configuration exists
//         setForm({
//           id: configData.id,
//           basicPercentage: configData.basicPercentage?.toString() || "",
//           hraPercentage: configData.hraPercentage?.toString() || "",
//           pfPercentage: configData.pfPercentage?.toString() || ""
//         });
        
//         setConfigExists(true);
//         showMessage("Configuration loaded successfully", "success");
//       } else {
//         // No configuration exists yet
//         resetForm();
//         setConfigExists(false);
//         showMessage("No configuration found. Please create one.", "info");
//       }
      
//     } catch (error) {
//       console.error("Error fetching config:", error);
      
//       if (error.response?.status === 400 || error.response?.status === 404) {
//         // No configuration exists - this is OK for first-time setup
//         resetForm();
//         setConfigExists(false);
//         showMessage("No configuration found. Please create one.", "info");
//       } else {
//         showMessage("Error loading configuration", "error");
//       }
//     } finally {
//       setLoading(false);
//       setHasFetched(true);
//     }
//   };

//   const showMessage = (text, type = "info") => {
//     setMessage(text);
//     setMessageType(type);
    
//     // Clear message after 5 seconds if it's success/info
//     if (type === "success" || type === "info") {
//       setTimeout(() => {
//         setMessage("");
//         setMessageType("");
//       }, 5000);
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       id: null,
//       basicPercentage: "",
//       hraPercentage: "",
//       pfPercentage: ""
//     });
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     // Check if all fields are filled
//     if (!form.basicPercentage.trim()) {
//       errors.basic = "Basic percentage is required";
//     } else {
//       const basicValue = parseFloat(form.basicPercentage);
//       if (isNaN(basicValue) || basicValue <= 0 || basicValue > 100) {
//         errors.basic = "Basic percentage must be between 0.01 and 100";
//       }
//     }
    
//     if (!form.hraPercentage.trim()) {
//       errors.hra = "HRA percentage is required";
//     } else {
//       const hraValue = parseFloat(form.hraPercentage);
//       if (isNaN(hraValue) || hraValue < 0 || hraValue > 100) {
//         errors.hra = "HRA percentage must be between 0 and 100";
//       }
//     }
    
//     if (!form.pfPercentage.trim()) {
//       errors.pf = "PF percentage is required";
//     } else {
//       const pfValue = parseFloat(form.pfPercentage);
//       if (isNaN(pfValue) || pfValue < 0 || pfValue > 100) {
//         errors.pf = "PF percentage must be between 0 and 100";
//       }
//     }
    
//     return errors;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     // Allow only numbers, decimal point, and empty string
//     if (value === "" || /^\d*\.?\d*$/.test(value)) {
//       // Limit to 2 decimal places
//       const decimalParts = value.split('.');
//       if (decimalParts.length > 1 && decimalParts[1].length > 2) {
//         return; // Don't update if more than 2 decimal places
//       }
      
//       setForm(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
    
//     // Format to 2 decimal places on blur if it's a valid number
//     if (value && value.trim() !== "" && !isNaN(value)) {
//       const num = parseFloat(value);
//       if (!isNaN(num)) {
//         setForm(prev => ({
//           ...prev,
//           [name]: num.toFixed(2)
//         }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       // Show errors
//       const errorText = Object.values(errors).join("\n");
//       showMessage(`Please fix the following:\n${errorText}`, "error");
//       return;
//     }
    
//     try {
//       setSaving(true);
//       showMessage("", ""); // Clear previous messages
      
//       const payload = {
//         basicPercentage: parseFloat(form.basicPercentage),
//         hraPercentage: parseFloat(form.hraPercentage),
//         pfPercentage: parseFloat(form.pfPercentage)
//       };
      
//       console.log("Submitting payload:", payload);
//       console.log("Config exists?", configExists);
//       console.log("Form ID:", form.id);
      
//       let response;
      
//       if (configExists && form.id) {
//         // UPDATE existing configuration
//         console.log("Updating config with ID:", form.id);
//         response = await axios.put(
//           `http://localhost:8080/salary/update/${form.id}`,
//           payload,
//           { 
//             withCredentials: true,
//             headers: {
//               'Content-Type': 'application/json',
//             }
//           }
//         );
//         showMessage("✅ Configuration updated successfully", "success");
//       } else {
//         // CREATE new configuration (only allowed if none exists)
//         console.log("Creating new config");
//         response = await axios.post(
//           "http://localhost:8080/salary/calculator",
//           payload,
//           { 
//             withCredentials: true,
//             headers: {
//               'Content-Type': 'application/json',
//             }
//           }
//         );
        
//         console.log("Create response:", response.data);
        
//         // Check if creation was successful
//         if (response.status === 200 || response.status === 201) {
//           // Update the form with the new ID from response
//           if (response.data && (response.data.id || response.data.configId)) {
//             const newId = response.data.id || response.data.configId;
//             setForm(prev => ({
//               ...prev,
//               id: newId
//             }));
//             setConfigExists(true);
//           }
//           showMessage("✅ Configuration created successfully", "success");
//         }
//       }
      
//       // Refresh the configuration after a short delay
//       setTimeout(() => {
//         fetchSalaryConfig();
//       }, 1500);
      
//     } catch (error) {
//       console.error("Error saving configuration:", error);
//       console.error("Error response:", error.response?.data);
      
//       if (error.response?.status === 500) {
//         if (error.response?.data?.includes?.("already exists")) {
//           // Configuration already exists, force fetch to get the existing one
//           showMessage("Configuration already exists. Loading existing configuration...", "info");
//           setTimeout(() => {
//             fetchSalaryConfig();
//           }, 1000);
//         } else {
//           showMessage("Server error. Please try again.", "error");
//         }
//       } else if (error.response?.status === 400) {
//         showMessage("Invalid data. Please check your inputs.", "error");
//       } else {
//         showMessage(`Error: ${error.response?.data?.message || error.message}`, "error");
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleReset = () => {
//     if (configExists) {
//       // Just reset to current values
//       fetchSalaryConfig();
//       showMessage("Form reset to current configuration", "info");
//     } else {
//       resetForm();
//       showMessage("Form cleared", "info");
//     }
//   };

//   if (loading && !hasFetched) {
//     return (
//       <div className="salary-calc-page">
//         <div className="salary-calc-card">
//           <div className="loading">
//             <h2>Loading Configuration...</h2>
//             <p>Please wait while we check for existing configuration.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="salary-calc-page">
//       <div className="salary-calc-card">
//         <h2>Salary Configuration</h2>
        
//         <p className="subtitle">
//           {configExists 
//             ? "Edit salary calculation percentages" 
//             : "Create salary calculation percentages (One-time setup)"}
//         </p>
        
//         {message && (
//           <div className={`message ${messageType}`}>
//             {message.split('\n').map((line, index) => (
//               <div key={index}>{line}</div>
//             ))}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="basicPercentage">
//               Basic Percentage (%) *
//             </label>
//             <input
//               id="basicPercentage"
//               type="text"
//               name="basicPercentage"
//               value={form.basicPercentage}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               placeholder="e.g., 40.00"
//               disabled={saving}
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="hraPercentage">
//               HRA Percentage (% of Basic) *
//             </label>
//             <input
//               id="hraPercentage"
//               type="text"
//               name="hraPercentage"
//               value={form.hraPercentage}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               placeholder="e.g., 20.00"
//               disabled={saving}
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="pfPercentage">
//               PF Percentage (% of Basic) *
//             </label>
//             <input
//               id="pfPercentage"
//               type="text"
//               name="pfPercentage"
//               value={form.pfPercentage}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               placeholder="e.g., 12.00"
//               disabled={saving}
//               required
//             />
//           </div>
          
//           <div className="button-group">
//             <button
//               type="submit"
//               className="save-btn"
//               disabled={saving || loading}
//             >
//               {saving 
//                 ? "Processing..." 
//                 : configExists 
//                   ? "Update Configuration" 
//                   : "Create Configuration"}
//             </button>
            
//             <button
//               type="button"
//               className="reset-btn"
//               onClick={handleReset}
//               disabled={saving || loading}
//             >
//               {configExists ? "Refresh" : "Clear"}
//             </button>
//           </div>
//         </form>
        
//         <div className="info-box">
//           <h4>Rules:</h4>
//           <ul>
//             <li>
//               {configExists 
//                 ? <strong>✓ Configuration exists - You can update anytime</strong>
//                 : <strong>✗ No configuration - You can create it now</strong>}
//             </li>
//             <li>Configuration can only be <strong>created once</strong></li>
//             <li>After creation, it can be <strong>updated anytime</strong></li>
//             <li>All fields are required</li>
//             <li>Values must be between 0% and 100%</li>
//             <li>Values are saved with 2 decimal places</li>
//           </ul>
//         </div>
        
//         {process.env.NODE_ENV === 'development' && (
//           <div className="debug-info">
//             <p><strong>Debug Info:</strong></p>
//             <p>Config ID: {form.id || 'None'}</p>
//             <p>Config Exists: {configExists ? 'Yes' : 'No'}</p>
//             <p>Basic: {form.basicPercentage || 'Empty'}</p>
//             <p>HRA: {form.hraPercentage || 'Empty'}</p>
//             <p>PF: {form.pfPercentage || 'Empty'}</p>
//             <p>Has Fetched: {hasFetched ? 'Yes' : 'No'}</p>
//             <p>Loading: {loading ? 'Yes' : 'No'}</p>
//             <p>Saving: {saving ? 'Yes' : 'No'}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HrCalculateSalary.css";

export default function SalaryConfiguration() {
  const [form, setForm] = useState({
    id: null,
    basicPercentage: "",
    hraPercentage: "",
    pfPercentage: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [configExists, setConfigExists] = useState(false);

  // Load existing configuration on component mount
  useEffect(() => {
    fetchSalaryConfig();
  }, []);

  const fetchSalaryConfig = async () => {
    try {
      setLoading(true);
      console.log("Fetching salary configuration...");

      const response = await axios.get(
        "http://localhost:8080/salary/calculator/get",
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log("API Response:", response.data);

      // Handle different response formats
      let configData = null;
      
      // If response.data exists and has data
      if (response.data) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          // Response is an array
          configData = response.data[0];
          console.log("Using array data:", configData);
        } else if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
          // Response is an object
          configData = response.data;
          console.log("Using object data:", configData);
        }
      }

      if (configData && 
          (configData.id !== undefined || 
           configData.basicPercentage !== undefined ||
           configData.hraPercentage !== undefined ||
           configData.pfPercentage !== undefined)) {
        
        // Configuration exists
        setForm({
          id: configData.id || null,
          basicPercentage: configData.basicPercentage?.toString() || "",
          hraPercentage: configData.hraPercentage?.toString() || "",
          pfPercentage: configData.pfPercentage?.toString() || ""
        });
        
        setConfigExists(true);
        setMessage("✅ Configuration loaded successfully");
        console.log("Config exists:", true, "Form:", form);
      } else {
        // No configuration exists yet
        resetForm();
        setConfigExists(false);
        setMessage("⚠️ No configuration found. You can create one.");
        console.log("No config found");
      }
      
    } catch (error) {
      console.error("Error fetching config:", error);
      
      // Check if it's a 500 error from backend (might mean no data yet)
      if (error.response?.status === 500) {
        // This could mean no data exists yet in database
        resetForm();
        setConfigExists(false);
        setMessage("⚠️ No configuration found yet. You can create one.");
      } else if (error.response?.status === 400 || error.response?.status === 404) {
        // No configuration exists - this is OK for first-time setup
        resetForm();
        setConfigExists(false);
        setMessage("⚠️ No configuration found. You can create one.");
      } else {
        setMessage("❌ Error loading configuration");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      basicPercentage: "",
      hraPercentage: "",
      pfPercentage: ""
    });
  };

  const validateForm = () => {
    const errors = {};
    
    // Check if all fields are filled
    if (!form.basicPercentage.trim()) {
      errors.basic = "Basic percentage is required";
    } else {
      const basicValue = parseFloat(form.basicPercentage);
      if (isNaN(basicValue) || basicValue <= 0 || basicValue > 100) {
        errors.basic = "Basic percentage must be between 0.01 and 100";
      }
    }
    
    if (!form.hraPercentage.trim()) {
      errors.hra = "HRA percentage is required";
    } else {
      const hraValue = parseFloat(form.hraPercentage);
      if (isNaN(hraValue) || hraValue < 0 || hraValue > 100) {
        errors.hra = "HRA percentage must be between 0 and 100";
      }
    }
    
    if (!form.pfPercentage.trim()) {
      errors.pf = "PF percentage is required";
    } else {
      const pfValue = parseFloat(form.pfPercentage);
      if (isNaN(pfValue) || pfValue < 0 || pfValue > 100) {
        errors.pf = "PF percentage must be between 0 and 100";
      }
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Allow only numbers, decimal point, and empty string
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      // Limit to 2 decimal places
      const decimalParts = value.split('.');
      if (decimalParts.length > 1 && decimalParts[1].length > 2) {
        return; // Don't update if more than 2 decimal places
      }
      
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Format to 2 decimal places on blur if it's a valid number
    if (value && value.trim() !== "" && !isNaN(value)) {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        setForm(prev => ({
          ...prev,
          [name]: num.toFixed(2)
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      // Show errors
      const errorText = Object.values(errors).join("\n");
      setMessage(`❌ Please fix the following:\n${errorText}`);
      return;
    }
    
    try {
      setSaving(true);
      setMessage("");
      
      const payload = {
        basicPercentage: parseFloat(form.basicPercentage),
        hraPercentage: parseFloat(form.hraPercentage),
        pfPercentage: parseFloat(form.pfPercentage)
      };
      
      console.log("Submitting payload:", payload);
      console.log("Config exists?", configExists);
      console.log("Form ID:", form.id);
      
      let response;
      
      if (configExists && form.id) {
        // UPDATE existing configuration (can edit anytime)
        console.log("Updating config with ID:", form.id);
        response = await axios.put(
          `http://localhost:8080/salary/update/${form.id}`,
          payload,
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        
        console.log("Update response:", response.data);
        setMessage("✅ Configuration updated successfully");
        
        // Refresh to get updated data
        setTimeout(() => {
          fetchSalaryConfig();
        }, 1000);
        
      } else {
        // CREATE new configuration (only allowed if none exists - ONE TIME)
        console.log("Creating new config (One-time)");
        
        try {
          response = await axios.post(
            "http://localhost:8080/salary/calculator",
            payload,
            { 
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );
          
          console.log("Create response:", response.data);
          
          if (response.status === 200 || response.status === 201) {
            // Update the form with the new ID from response
            if (response.data && (response.data.id || response.data.configId)) {
              const newId = response.data.id || response.data.configId;
              setForm(prev => ({
                ...prev,
                id: newId
              }));
              setConfigExists(true);
            }
            setMessage("✅ Configuration created successfully (One-time setup complete)");
            
            // Refresh to get the new config
            setTimeout(() => {
              fetchSalaryConfig();
            }, 1000);
          }
          
        } catch (createError) {
          console.error("Create error:", createError);
          
          if (createError.response?.status === 500) {
            if (createError.response?.data?.includes?.("already exists") || 
                createError.response?.data?.message?.includes?.("already exists")) {
              // Configuration already exists, fetch it
              setMessage("⚠️ Configuration already exists. Loading existing configuration...");
              setTimeout(() => {
                fetchSalaryConfig();
              }, 1000);
            } else {
              setMessage("❌ Server error during creation");
            }
          } else {
            setMessage(`❌ Error: ${createError.response?.data?.message || createError.message}`);
          }
        }
      }
      
    } catch (error) {
      console.error("Error saving configuration:", error);
      console.error("Error response:", error.response?.data);
      
      if (error.response?.status === 500) {
        setMessage("❌ Server error. Please try again.");
      } else if (error.response?.status === 400) {
        setMessage("❌ Invalid data. Please check your inputs.");
      } else {
        setMessage(`❌ Error: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (configExists) {
      // Just reset to current values from server
      fetchSalaryConfig();
      setMessage("Form reset to current configuration");
    } else {
      resetForm();
      setMessage("Form cleared");
    }
  };

  // Debug: Test API directly
  const testApiDirectly = async () => {
    try {
      console.log("Testing API directly...");
      const response = await fetch("http://localhost:8080/salary/calculator/get", {
        credentials: 'include'
      });
      console.log("Direct fetch status:", response.status);
      const data = await response.json();
      console.log("Direct fetch data:", data);
      
      if (response.ok) {
        setMessage(`✅ API test successful. Data: ${JSON.stringify(data)}`);
      } else {
        setMessage(`❌ API test failed: ${response.status}`);
      }
    } catch (err) {
      console.error("Direct fetch error:", err);
      setMessage(`❌ API test error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="salary-calc-page">
        <div className="salary-calc-card">
          <div className="loading">
            <h2>Loading Configuration...</h2>
            <p>Checking for existing salary configuration...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="salary-calc-page">
      <div className="salary-calc-card">
        <h2>Salary Configuration</h2>
        
        <p className="subtitle">
          {configExists 
            ? "Edit salary calculation percentages (Can update anytime)" 
            : "Create salary calculation percentages (One-time setup only)"}
        </p>
        
        {message && (
          <div className={`message ${message.includes("✅") ? "success" : message.includes("⚠️") ? "warning" : "error"}`}>
            {message.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="basicPercentage">
              Basic Percentage (% of CTC) *
            </label>
            <input
              id="basicPercentage"
              type="text"
              name="basicPercentage"
              value={form.basicPercentage}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="e.g., 40.00"
              disabled={saving}
              required
            />
            <small className="field-note">Percentage of CTC for Basic Salary</small>
          </div>
          
          <div className="form-group">
            <label htmlFor="hraPercentage">
              HRA Percentage (% of Basic) *
            </label>
            <input
              id="hraPercentage"
              type="text"
              name="hraPercentage"
              value={form.hraPercentage}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="e.g., 20.00"
              disabled={saving}
              required
            />
            <small className="field-note">Percentage of Basic Salary for HRA</small>
          </div>
          
          <div className="form-group">
            <label htmlFor="pfPercentage">
              PF Percentage (% of Basic) *
            </label>
            <input
              id="pfPercentage"
              type="text"
              name="pfPercentage"
              value={form.pfPercentage}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="e.g., 12.00"
              disabled={saving}
              required
            />
            <small className="field-note">Percentage of Basic Salary for PF</small>
          </div>
          
          <div className="button-group">
            <button
              type="submit"
              className="save-btn"
              disabled={saving}
            >
              {saving 
                ? "Processing..." 
                : configExists 
                  ? "Update Configuration" 
                  : "Create Configuration (One-time)"}
            </button>
            
            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
              disabled={saving}
            >
              {configExists ? "Refresh" : "Clear"}
            </button>
          </div>
        </form>
        
        <div className="info-box">
          <h4>Important Rules:</h4>
          <ul>
            <li>
              <strong>{configExists ? "✓ Configuration Exists" : "✗ No Configuration Yet"}</strong>
            </li>
            <li>
              <strong>Adding:</strong> Can only be done <strong>once</strong> when no configuration exists
            </li>
            <li>
              <strong>Editing:</strong> Can be done <strong>anytime</strong> once configuration exists
            </li>
            <li>All fields are required</li>
            <li>Values must be between 0% and 100%</li>
            <li>Values are saved with 2 decimal places</li>
          </ul>
          
          {configExists && (
            <div className="current-config">
              <p><strong>Current Configuration:</strong></p>
              <p>• Basic: {form.basicPercentage}% of CTC</p>
              <p>• HRA: {form.hraPercentage}% of Basic</p>
              <p>• PF: {form.pfPercentage}% of Basic</p>
            </div>
          )}
        </div>
        
        <div className="debug-section">
          <button 
            onClick={testApiDirectly}
            className="debug-btn"
          >
            Test API Directly
          </button>
          
          <div className="debug-info">
            <p><strong>Debug Info:</strong></p>
            <p>Config Exists: {configExists ? 'Yes' : 'No'}</p>
            <p>Config ID: {form.id || 'None'}</p>
            <p>Basic: {form.basicPercentage || 'Empty'}</p>
            <p>HRA: {form.hraPercentage || 'Empty'}</p>
            <p>PF: {form.pfPercentage || 'Empty'}</p>
            <p>Loading: {loading ? 'Yes' : 'No'}</p>
            <p>Saving: {saving ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}