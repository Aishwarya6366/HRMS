// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./HolidayCalendar.css";

// // export default function HolidayCalendar() {
// //   const [types, setTypes] = useState([]);
// //   const [locations, setLocations] = useState([]);

// //   const [newType, setNewType] = useState("");
// //   const [newLocation, setNewLocation] = useState("");

// //   const [form, setForm] = useState({
// //     holidayName: "",
// //     holidayDate: "",
// //     holidayTypeId: "",
// //     holidayLocationId: ""
// //   });

// //   // ✅ ONLY GET on load
// //   useEffect(() => {
// //     loadDropdowns();
// //   }, []);

// //   const loadDropdowns = async () => {
// //     try {
// //       const typeRes = await axios.get(
// //         "http://localhost:8080/hr/holidaymaster",
// //         { withCredentials: true }
// //       );

// //       const locRes = await axios.get(
// //         "http://localhost:8080/hr/holidaylocation",
// //         { withCredentials: true }
// //       );

// //       // ✅ FIXED HERE
// //       setTypes(typeRes.data || []);
// //       setLocations(locRes.data || []);
// //     } catch (err) {
// //       console.log("Dropdown load error:", err);
// //     }
// //   };

// //   // ✅ Add Holiday Type (MANUAL)
// //   const addNewType = async () => {
// //     if (!newType.trim()) return;

// //     const res = await axios.post(
// //       "http://localhost:8080/hr/holidaymaster",
// //       { holidayType: newType },
// //       { withCredentials: true }
// //     );

// //     // ✅ FIXED HERE
// //     setForm({ ...form, holidayTypeId: res.data.htId });
// //     setNewType("");
// //     loadDropdowns();
// //   };

// //   // ✅ Add Location (MANUAL)
// //   const addNewLocation = async () => {
// //     if (!newLocation.trim()) return;

// //     const res = await axios.post(
// //       "http://localhost:8080/hr/holidaylocation",
// //       { locationName: newLocation },
// //       { withCredentials: true }
// //     );

// //     // ✅ FIXED HERE
// //     setForm({ ...form, holidayLocationId: res.data.hlId });
// //     setNewLocation("");
// //     loadDropdowns();
// //   };

// //   // ✅ Save Holiday
// //   const saveHoliday = async () => {
// //     if (!form.holidayName || !form.holidayDate) {
// //       alert("Enter name & date");
// //       return;
// //     }

// //     if (!form.holidayTypeId || !form.holidayLocationId) {
// //       alert("Select type & location");
// //       return;
// //     }

// //     await axios.post(
// //       "http://localhost:8080/hr/holiday",
// //       {
// //         holidayName: form.holidayName,
// //         holidayDate: form.holidayDate,
// //         holidayTypeId: Number(form.holidayTypeId),
// //         holidayLocationId: Number(form.holidayLocationId)
// //       },
// //       { withCredentials: true }
// //     );

// //     alert("✅ Holiday Added");
// //   };

// //   return (
// //     <div className="holiday-card">
// //       <h2>Add Holiday</h2>

// //       <div className="row">
// //         <input
// //           placeholder="Holiday Name"
// //           value={form.holidayName}
// //           onChange={e =>
// //             setForm({ ...form, holidayName: e.target.value })
// //           }
// //         />

// //         <input
// //           type="date"
// //           value={form.holidayDate}
// //           onChange={e =>
// //             setForm({ ...form, holidayDate: e.target.value })
// //           }
// //         />
// //       </div>

// //       {/* Holiday Type */}
// //       <div className="row">
// //         <select
// //           value={form.holidayTypeId}
// //           onChange={e =>
// //             setForm({ ...form, holidayTypeId: e.target.value })
// //           }
// //         >
// //           <option value="">Select Type</option>
// //           {types.map(t => (
// //             <option key={t.htId} value={t.htId}>
// //               {t.holidayType}
// //             </option>
// //           ))}
// //         </select>

// //         <input
// //           placeholder="Add new type"
// //           value={newType}
// //           onChange={e => setNewType(e.target.value)}
// //         />
// //         <button onClick={addNewType}>Add</button>
// //       </div>

// //       {/* Location */}
// //       <div className="row">
// //         <select
// //           value={form.holidayLocationId}
// //           onChange={e =>
// //             setForm({ ...form, holidayLocationId: e.target.value })
// //           }
// //         >
// //           <option value="">Select Location</option>
// //           {locations.map(l => (
// //             <option key={l.hlId} value={l.hlId}>
// //               {l.locationName}
// //             </option>
// //           ))}
// //         </select>

// //         <input
// //           placeholder="Add new location"
// //           value={newLocation}
// //           onChange={e => setNewLocation(e.target.value)}
// //         />
// //         <button onClick={addNewLocation}>Add</button>
// //       </div>

// //       <button onClick={saveHoliday}>Save Holiday</button>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./HolidayCalendar.css";

// export default function HolidayCalendar() {
//   // State for data
//   const [holidays, setHolidays] = useState([]);
//   const [types, setTypes] = useState([]);
//   const [locations, setLocations] = useState([]);
  
//   // State for form inputs
//   const [newType, setNewType] = useState("");
//   const [newLocation, setNewLocation] = useState("");
  
//   // State for edit mode
//   const [editingHoliday, setEditingHoliday] = useState(null);
//   const [editingType, setEditingType] = useState(null);
//   const [editingLocation, setEditingLocation] = useState(null);
  
//   // Holiday form state
//   const [form, setForm] = useState({
//     holidayName: "",
//     holidayDate: "",
//     holidayTypeId: "",
//     holidayLocationId: ""
//   });

//   // Load all data on component mount
//   useEffect(() => {
//     loadAllData();
//   }, []);

//   // Load all data from APIs
//   const loadAllData = async () => {
//     try {
//       // Load holidays
//       const holidayRes = await axios.get(
//         "http://localhost:8080/hr/holiday",
//         { withCredentials: true }
//       );
      
//       // Load holiday types
//       const typeRes = await axios.get(
//         "http://localhost:8080/hr/holidaymaster",
//         { withCredentials: true }
//       );

//       // Load locations
//       const locRes = await axios.get(
//         "http://localhost:8080/hr/holidaylocation",
//         { withCredentials: true }
//       );

//       setHolidays(holidayRes.data || []);
//       setTypes(typeRes.data || []);
//       setLocations(locRes.data || []);
//     } catch (err) {
//       console.log("Error loading data:", err);
//       alert("Failed to load data. Please check your connection.");
//     }
//   };

//   // ========== HOLIDAY CRUD OPERATIONS ==========
  
//   // Save Holiday (Create or Update)
//   const saveHoliday = async () => {
//     // Validation
//     if (!form.holidayName.trim()) {
//       alert("Please enter holiday name");
//       return;
//     }

//     if (!form.holidayDate) {
//       alert("Please select a date");
//       return;
//     }

//     if (!form.holidayTypeId) {
//       alert("Please select a holiday type");
//       return;
//     }

//     if (!form.holidayLocationId) {
//       alert("Please select a location");
//       return;
//     }

//     try {
//       const payload = {
//         holidayName: form.holidayName,
//         holidayDate: form.holidayDate,
//         holidayTypeId: parseInt(form.holidayTypeId),
//         holidayLocationId: parseInt(form.holidayLocationId)
//       };

//       if (editingHoliday) {
//         // Update existing holiday
//         await axios.put(
//           `http://localhost:8080/hr/holiday/${editingHoliday.hId}`,
//           payload,
//           { withCredentials: true }
//         );
//         alert("✅ Holiday updated successfully!");
//       } else {
//         // Create new holiday
//         await axios.post(
//           "http://localhost:8080/hr/holiday",
//           payload,
//           { withCredentials: true }
//         );
//         alert("✅ Holiday added successfully!");
//       }

//       resetHolidayForm();
//       loadAllData();
//     } catch (err) {
//       console.log("Error saving holiday:", err);
//       alert("Error saving holiday. Please try again.");
//     }
//   };

//   // Edit Holiday
//   const editHoliday = (holiday) => {
//     setForm({
//       holidayName: holiday.holidayName || "",
//       holidayDate: formatDateForInput(holiday.holidayDate) || "",
//       holidayTypeId: holiday.holidayTypeId?.toString() || "",
//       holidayLocationId: holiday.holidayLocationId?.toString() || ""
//     });
//     setEditingHoliday(holiday);
//   };

//   // Delete Holiday
//   const deleteHoliday = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this holiday?")) return;
    
//     try {
//       await axios.delete(
//         `http://localhost:8080/hr/holiday/${id}`,
//         { withCredentials: true }
//       );
//       alert("✅ Holiday deleted successfully!");
//       loadAllData();
      
//       // If deleting the holiday being edited, reset form
//       if (editingHoliday?.hId === id) {
//         resetHolidayForm();
//       }
//     } catch (err) {
//       console.log("Error deleting holiday:", err);
//       alert("Error deleting holiday. Please try again.");
//     }
//   };

//   // Reset Holiday Form
//   const resetHolidayForm = () => {
//     setForm({
//       holidayName: "",
//       holidayDate: "",
//       holidayTypeId: "",
//       holidayLocationId: ""
//     });
//     setEditingHoliday(null);
//   };

//   // ========== HOLIDAY TYPE CRUD OPERATIONS ==========
  
//   // Add or Update Holiday Type
//   const saveHolidayType = async () => {
//     if (!newType.trim()) {
//       alert("Please enter a type name");
//       return;
//     }

//     try {
//       if (editingType) {
//         // Update existing type
//         await axios.put(
//           `http://localhost:8080/hr/holidaymaster/${editingType.htId}`,
//           { holidayType: newType },
//           { withCredentials: true }
//         );
//         alert("✅ Holiday type updated!");
//       } else {
//         // Create new type
//         await axios.post(
//           "http://localhost:8080/hr/holidaymaster",
//           { holidayType: newType },
//           { withCredentials: true }
//         );
//         alert("✅ Holiday type added!");
//       }

//       setNewType("");
//       setEditingType(null);
//       loadAllData();
//     } catch (err) {
//       console.log("Error saving type:", err);
//       alert("Error saving holiday type. Please try again.");
//     }
//   };

//   // Edit Holiday Type
//   const editHolidayType = (type) => {
//     setNewType(type.holidayType);
//     setEditingType(type);
//   };

//   // Delete Holiday Type
//   const deleteHolidayType = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this holiday type?")) return;
    
//     try {
//       await axios.delete(
//         `http://localhost:8080/hr/holidaymaster/${id}`,
//         { withCredentials: true }
//       );
//       alert("✅ Holiday type deleted!");
//       loadAllData();
      
//       // If deleting the type being edited, reset
//       if (editingType?.htId === id) {
//         setNewType("");
//         setEditingType(null);
//       }
//     } catch (err) {
//       console.log("Error deleting type:", err);
//       alert("Cannot delete type - it may be in use by holidays.");
//     }
//   };

//   // ========== LOCATION CRUD OPERATIONS ==========
  
//   // Add or Update Location
//   const saveLocation = async () => {
//     if (!newLocation.trim()) {
//       alert("Please enter a location name");
//       return;
//     }

//     try {
//       if (editingLocation) {
//         // Update existing location
//         await axios.put(
//           `http://localhost:8080/hr/holidaylocation/${editingLocation.hlId}`,
//           { locationName: newLocation },
//           { withCredentials: true }
//         );
//         alert("✅ Location updated!");
//       } else {
//         // Create new location
//         await axios.post(
//           "http://localhost:8080/hr/holidaylocation",
//           { locationName: newLocation },
//           { withCredentials: true }
//         );
//         alert("✅ Location added!");
//       }

//       setNewLocation("");
//       setEditingLocation(null);
//       loadAllData();
//     } catch (err) {
//       console.log("Error saving location:", err);
//       alert("Error saving location. Please try again.");
//     }
//   };

//   // Edit Location
//   const editLocation = (location) => {
//     setNewLocation(location.locationName);
//     setEditingLocation(location);
//   };

//   // Delete Location
//   const deleteLocation = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this location?")) return;
    
//     try {
//       await axios.delete(
//         `http://localhost:8080/hr/holidaylocation/${id}`,
//         { withCredentials: true }
//       );
//       alert("✅ Location deleted!");
//       loadAllData();
      
//       // If deleting the location being edited, reset
//       if (editingLocation?.hlId === id) {
//         setNewLocation("");
//         setEditingLocation(null);
//       }
//     } catch (err) {
//       console.log("Error deleting location:", err);
//       alert("Cannot delete location - it may be in use by holidays.");
//     }
//   };

//   // ========== HELPER FUNCTIONS ==========
  
//   // Format date for input field (YYYY-MM-DD)
//   const formatDateForInput = (dateString) => {
//     if (!dateString) return "";
//     try {
//       const date = new Date(dateString);
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       return `${year}-${month}-${day}`;
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return "";
//     }
//   };

//   // Format date for display
//   const formatDateForDisplay = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       });
//     } catch (error) {
//       return "Invalid Date";
//     }
//   };

//   // Get type name by ID
//   const getTypeName = (typeId) => {
//     const type = types.find(t => t.htId === typeId);
//     return type ? type.holidayType : "Unknown";
//   };

//   // Get location name by ID
//   const getLocationName = (locationId) => {
//     const location = locations.find(l => l.hlId === locationId);
//     return location ? location.locationName : "Unknown";
//   };

//   return (
//     <div className="holiday-container">
//       <h1 className="main-title">🎉 Holiday Calendar Management</h1>
      
//       {/* HOLIDAY MANAGEMENT SECTION */}
//       <div className="section-card">
//         <h2>{editingHoliday ? "Edit Holiday" : "Add New Holiday"}</h2>
        
//         <div className="form-grid">
//           <div className="form-group">
//             <label>Holiday Name *</label>
//             <input
//               type="text"
//               placeholder="Enter holiday name"
//               value={form.holidayName}
//               onChange={e => setForm({...form, holidayName: e.target.value})}
//               className="form-input"
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Date *</label>
//             <input
//               type="date"
//               value={form.holidayDate}
//               onChange={e => setForm({...form, holidayDate: e.target.value})}
//               className="form-input"
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Holiday Type *</label>
//             <select
//               value={form.holidayTypeId}
//               onChange={e => setForm({...form, holidayTypeId: e.target.value})}
//               className="form-select"
//             >
//               <option value="">Select Type</option>
//               {types.map(type => (
//                 <option key={type.htId} value={type.htId}>
//                   {type.holidayType}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div className="form-group">
//             <label>Location *</label>
//             <select
//               value={form.holidayLocationId}
//               onChange={e => setForm({...form, holidayLocationId: e.target.value})}
//               className="form-select"
//             >
//               <option value="">Select Location</option>
//               {locations.map(location => (
//                 <option key={location.hlId} value={location.hlId}>
//                   {location.locationName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
        
//         <div className="form-actions">
//           <button 
//             onClick={saveHoliday}
//             className={`btn btn-primary ${editingHoliday ? 'btn-warning' : ''}`}
//           >
//             {editingHoliday ? "Update Holiday" : "Save Holiday"}
//           </button>
          
//           {editingHoliday && (
//             <button 
//               onClick={resetHolidayForm}
//               className="btn btn-secondary"
//             >
//               Cancel Edit
//             </button>
//           )}
//         </div>
//       </div>

//       {/* HOLIDAYS LIST */}
//       <div className="section-card">
//         <div className="section-header">
//           <h2>Holidays List ({holidays.length})</h2>
//           <button 
//             onClick={loadAllData}
//             className="btn btn-refresh"
//           >
//             🔄 Refresh
//           </button>
//         </div>
        
//         {holidays.length === 0 ? (
//           <div className="empty-state">
//             <p>No holidays found. Add your first holiday!</p>
//           </div>
//         ) : (
//           <div className="table-responsive">
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Holiday Name</th>
//                   <th>Date</th>
//                   <th>Type</th>
//                   <th>Location</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {holidays.map((holiday, index) => (
//                   <tr 
//                     key={holiday.hId}
//                     className={editingHoliday?.hId === holiday.hId ? 'editing-row' : ''}
//                   >
//                     <td>{index + 1}</td>
//                     <td>{holiday.holidayName}</td>
//                     <td>{formatDateForDisplay(holiday.holidayDate)}</td>
//                     <td>
//                       <span className="badge badge-type">
//                         {getTypeName(holiday.holidayTypeId)}
//                       </span>
//                     </td>
//                     <td>
//                       <span className="badge badge-location">
//                         {getLocationName(holiday.holidayLocationId)}
//                       </span>
//                     </td>
//                     <td>
//                       <div className="action-buttons">
//                         <button 
//                           onClick={() => editHoliday(holiday)}
//                           className="btn-action btn-edit"
//                           title="Edit"
//                         >
//                           ✏️ Edit
//                         </button>
//                         <button 
//                           onClick={() => deleteHoliday(holiday.hId)}
//                           className="btn-action btn-delete"
//                           title="Delete"
//                         >
//                           🗑️ Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* HOLIDAY TYPES MANAGEMENT */}
//       <div className="section-card">
//         <h2>Holiday Types Management ({types.length})</h2>
        
//         <div className="inline-form">
//           <input
//             type="text"
//             placeholder={editingType ? `Editing: ${editingType.holidayType}` : "Add new holiday type"}
//             value={newType}
//             onChange={e => setNewType(e.target.value)}
//             className="form-input"
//           />
//           <button 
//             onClick={saveHolidayType}
//             className={`btn ${editingType ? 'btn-warning' : 'btn-success'}`}
//           >
//             {editingType ? "Update Type" : "Add Type"}
//           </button>
//           {editingType && (
//             <button 
//               onClick={() => {
//                 setNewType("");
//                 setEditingType(null);
//               }}
//               className="btn btn-secondary"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
        
//         {types.length > 0 && (
//           <div className="item-list">
//             {types.map(type => (
//               <div 
//                 key={type.htId} 
//                 className={`list-item ${editingType?.htId === type.htId ? 'editing-item' : ''}`}
//               >
//                 <span className="item-name">{type.holidayType}</span>
//                 <span className="item-count">
//                   Used: {holidays.filter(h => h.holidayTypeId === type.htId).length}
//                 </span>
//                 <div className="item-actions">
//                   <button 
//                     onClick={() => editHolidayType(type)}
//                     className="btn-action btn-sm btn-edit"
//                     title="Edit"
//                   >
//                     Edit
//                   </button>
//                   <button 
//                     onClick={() => deleteHolidayType(type.htId)}
//                     className="btn-action btn-sm btn-delete"
//                     title="Delete"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* LOCATIONS MANAGEMENT */}
//       <div className="section-card">
//         <h2>Locations Management ({locations.length})</h2>
        
//         <div className="inline-form">
//           <input
//             type="text"
//             placeholder={editingLocation ? `Editing: ${editingLocation.locationName}` : "Add new location"}
//             value={newLocation}
//             onChange={e => setNewLocation(e.target.value)}
//             className="form-input"
//           />
//           <button 
//             onClick={saveLocation}
//             className={`btn ${editingLocation ? 'btn-warning' : 'btn-success'}`}
//           >
//             {editingLocation ? "Update Location" : "Add Location"}
//           </button>
//           {editingLocation && (
//             <button 
//               onClick={() => {
//                 setNewLocation("");
//                 setEditingLocation(null);
//               }}
//               className="btn btn-secondary"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
        
//         {locations.length > 0 && (
//           <div className="item-list">
//             {locations.map(location => (
//               <div 
//                 key={location.hlId} 
//                 className={`list-item ${editingLocation?.hlId === location.hlId ? 'editing-item' : ''}`}
//               >
//                 <span className="item-name">{location.locationName}</span>
//                 <span className="item-count">
//                   Used: {holidays.filter(h => h.holidayLocationId === location.hlId).length}
//                 </span>
//                 <div className="item-actions">
//                   <button 
//                     onClick={() => editLocation(location)}
//                     className="btn-action btn-sm btn-edit"
//                     title="Edit"
//                   >
//                     Edit
//                   </button>
//                   <button 
//                     onClick={() => deleteLocation(location.hlId)}
//                     className="btn-action btn-sm btn-delete"
//                     title="Delete"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import "./HolidayCalendar.css";

export default function HolidayCalendar() {
  const [types, setTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [newType, setNewType] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const [form, setForm] = useState({
    holidayName: "",
    holidayDate: "",
    holidayTypeId: "",
    holidayLocationId: ""
  });

  // ✅ Load all data on initial load
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      // Load holiday types
      const typeRes = await axios.get(
        "http://localhost:8080/hr/holidaymaster",
        { withCredentials: true }
      );

      // Load holiday locations
      const locRes = await axios.get(
        "http://localhost:8080/hr/holidaylocation",
        { withCredentials: true }
      );

      // Load holidays
      const holidayRes = await axios.get(
        "http://localhost:8080/hr/holiday",
        { withCredentials: true }
      );

      setTypes(typeRes.data || []);
      setLocations(locRes.data || []);
      setHolidays(holidayRes.data || []);
    } catch (err) {
      console.log("Data load error:", err);
    }
  };

  // ✅ Add Holiday Type
  const addNewType = async () => {
    if (!newType.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:8080/hr/holidaymaster",
        { holidayType: newType },
        { withCredentials: true }
      );

      if (res.data && res.data.htId) {
        setForm({ ...form, holidayTypeId: res.data.htId.toString() });
      }
      setNewType("");
      loadAllData();
    } catch (error) {
      console.error("Error adding type:", error);
    }
  };

  // ✅ Add Location
  const addNewLocation = async () => {
    if (!newLocation.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:8080/hr/holidaylocation",
        { locationName: newLocation },
        { withCredentials: true }
      );

      if (res.data && res.data.hlId) {
        setForm({ ...form, holidayLocationId: res.data.hlId.toString() });
      }
      setNewLocation("");
      loadAllData();
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  // ✅ Save Holiday (Create or Update)
  const saveHoliday = async () => {
    if (!form.holidayName || !form.holidayDate) {
      alert("Enter name & date");
      return;
    }

    if (!form.holidayTypeId || !form.holidayLocationId) {
      alert("Select type & location");
      return;
    }

    try {
      if (isEditing && editingId) {
        // Update existing holiday
        await axios.put(
          `http://localhost:8080/hr/holiday/${editingId}`,
          {
            holidayName: form.holidayName,
            holidayDate: form.holidayDate,
            holidayTypeId: Number(form.holidayTypeId),
            holidayLocationId: Number(form.holidayLocationId)
          },
          { withCredentials: true }
        );
        alert("✅ Holiday Updated");
      } else {
        // Create new holiday
        await axios.post(
          "http://localhost:8080/hr/holiday",
          {
            holidayName: form.holidayName,
            holidayDate: form.holidayDate,
            holidayTypeId: Number(form.holidayTypeId),
            holidayLocationId: Number(form.holidayLocationId)
          },
          { withCredentials: true }
        );
        alert("✅ Holiday Added");
      }

      // Reset form and reload data
      resetForm();
      loadAllData();
    } catch (error) {
      console.error("Error saving holiday:", error);
      alert("Error saving holiday");
    }
  };

  // ✅ Edit Holiday
  const editHoliday = (holiday) => {
    console.log("Editing holiday:", holiday); // Debug log
    
    // Check if holiday has the correct ID field
    const holidayId = holiday.id || holiday.holidayId || holiday.hId;
    
    if (!holidayId) {
      console.error("No ID found in holiday object:", holiday);
      alert("Cannot edit: Holiday ID not found");
      return;
    }

    setForm({
      holidayName: holiday.holidayName || "",
      holidayDate: holiday.holidayDate || "",
      holidayTypeId: holiday.holidayTypeId ? holiday.holidayTypeId.toString() : "",
      holidayLocationId: holiday.holidayLocationId ? holiday.holidayLocationId.toString() : ""
    });
    setEditingId(holidayId);
    setIsEditing(true);
  };

  // ✅ Delete Holiday
  const deleteHoliday = async (holiday) => {
    if (!window.confirm("Are you sure you want to delete this holiday?")) {
      return;
    }

    try {
      // Get the correct ID field
      const holidayId = holiday.id || holiday.holidayId || holiday.hId;
      
      if (!holidayId) {
        console.error("No ID found for deletion:", holiday);
        alert("Cannot delete: Holiday ID not found");
        return;
      }

      console.log("Deleting holiday with ID:", holidayId); // Debug log
      
      await axios.delete(
        `http://localhost:8080/hr/holiday/${holidayId}`,
        { withCredentials: true }
      );
      alert("✅ Holiday Deleted");
      loadAllData();
    } catch (error) {
      console.error("Error deleting holiday:", error);
      alert("Error deleting holiday");
    }
  };

  // ✅ Reset Form
  const resetForm = () => {
    setForm({
      holidayName: "",
      holidayDate: "",
      holidayTypeId: "",
      holidayLocationId: ""
    });
    setEditingId(null);
    setIsEditing(false);
  };

  // ✅ Get type name by ID
  const getTypeName = (typeId) => {
    const type = types.find(t => t.htId == typeId || t.id == typeId);
    return type ? type.holidayType || type.type : "Unknown";
  };

  // ✅ Get location name by ID
  const getLocationName = (locationId) => {
    const location = locations.find(l => l.hlId == locationId || l.id == locationId);
    return location ? location.locationName || location.name : "Unknown";
  };

  return (
    <div className="holiday-container">
      <div className="holiday-card">
        <h2>{isEditing ? "Edit Holiday" : "Add Holiday"}</h2>

        <div className="row">
          <input
            placeholder="Holiday Name"
            value={form.holidayName}
            onChange={e =>
              setForm({ ...form, holidayName: e.target.value })
            }
          />

          <input
            type="date"
            value={form.holidayDate}
            onChange={e =>
              setForm({ ...form, holidayDate: e.target.value })
            }
          />
        </div>

        {/* Holiday Type */}
        <div className="row">
          <select
            value={form.holidayTypeId}
            onChange={e =>
              setForm({ ...form, holidayTypeId: e.target.value })
            }
          >
            <option value="">Select Type</option>
            {types.map(t => (
              <option key={t.htId || t.id} value={t.htId || t.id}>
                {t.holidayType || t.type}
              </option>
            ))}
          </select>

          <input
            placeholder="Add new type"
            value={newType}
            onChange={e => setNewType(e.target.value)}
          />
          <button onClick={addNewType}>Add</button>
        </div>

        {/* Location */}
        <div className="row">
          <select
            value={form.holidayLocationId}
            onChange={e =>
              setForm({ ...form, holidayLocationId: e.target.value })
            }
          >
            <option value="">Select Location</option>
            {locations.map(l => (
              <option key={l.hlId || l.id} value={l.hlId || l.id}>
                {l.locationName || l.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Add new location"
            value={newLocation}
            onChange={e => setNewLocation(e.target.value)}
          />
          <button onClick={addNewLocation}>Add</button>
        </div>

        <div className="button-row">
          <button onClick={saveHoliday} className="save-btn">
            {isEditing ? "Update Holiday" : "Save Holiday"}
          </button>
          {isEditing && (
            <button onClick={resetForm} className="cancel-btn">
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* Holiday List */}
      <div className="holiday-list">
        <h2>Holiday List</h2>
        {holidays.length === 0 ? (
          <p>No holidays found</p>
        ) : (
          <table className="holiday-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Type</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map(holiday => {
                // Get unique ID for key - check multiple possible ID fields
                const holidayId = holiday.id || holiday.holidayId || holiday.hId || Math.random();
                
                return (
                  <tr key={holidayId}>
                    <td>{holiday.holidayName || holiday.name}</td>
                    <td>{holiday.holidayDate || holiday.date}</td>
                    <td>{getTypeName(holiday.holidayTypeId || holiday.typeId)}</td>
                    <td>{getLocationName(holiday.holidayLocationId || holiday.locationId)}</td>
                    <td>
                      <button 
                        onClick={() => editHoliday(holiday)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteHoliday(holiday)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}