// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./EmployeeHolidayCalendar.css";

// // export default function EmployeeHolidayCalendar() {
// //   const [holidays, setHolidays] = useState([]);
// //   const [types, setTypes] = useState([]);
// //   const [locations, setLocations] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   // Get employee location ID
// //   const employeeLocationId = sessionStorage.getItem("empLocationId") || 
// //                            localStorage.getItem("empLocationId") || 
// //                            "2"; // Default for testing

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     setLoading(true);
// //     setError("");
// //     try {
// //       // Load all data in parallel
// //       const [holidayRes, typeRes, locationRes] = await Promise.all([
// //         axios.get("http://localhost:8080/hr/holiday", { withCredentials: true }),
// //         axios.get("http://localhost:8080/hr/holidaymaster", { withCredentials: true }),
// //         axios.get("http://localhost:8080/hr/holidaylocation", { withCredentials: true })
// //       ]);

// //       setHolidays(holidayRes.data || []);
// //       setTypes(typeRes.data || []);
// //       setLocations(locationRes.data || []);
      
// //     } catch (err) {
// //       console.error("Error loading data:", err);
// //       setError("Failed to load holiday data. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Get type name by ID (case-insensitive)
// //   const getTypeName = (id) => {
// //     if (!id && id !== 0) return "Not Selected";
    
// //     const type = types.find(t => {
// //       const tId = t.htId || t.id || t.typeId;
// //       // Convert both to string and compare case-insensitively
// //       return String(tId).toLowerCase() === String(id).toLowerCase();
// //     });
    
// //     return type ? (type.holidayType || type.type || "Unknown") : "Unknown";
// //   };

// //   // Get location name by ID (case-insensitive)
// //   const getLocationName = (id) => {
// //     if (!id && id !== 0) return "Not Selected";
    
// //     const location = locations.find(l => {
// //       const lId = l.hlId || l.id || l.locationId;
// //       // Convert both to string and compare case-insensitively
// //       return String(lId).toLowerCase() === String(id).toLowerCase();
// //     });
    
// //     return location ? (location.locationName || location.name || "Unknown") : "Unknown";
// //   };

// //   // Filter holidays for employee location (case-insensitive)
// //   const filteredHolidays = holidays.filter(h => {
// //     if (!employeeLocationId) return true;
    
// //     const holidayLocationId = h.holidayLocationId || h.locationId;
    
// //     // Compare IDs case-insensitively
// //     return String(holidayLocationId).toLowerCase() === String(employeeLocationId).toLowerCase();
// //   });

// //   // Format date
// //   const formatDate = (dateString) => {
// //     if (!dateString) return "N/A";
    
// //     try {
// //       const date = new Date(dateString);
// //       return date.toLocaleDateString('en-US', {
// //         weekday: 'short',
// //         year: 'numeric',
// //         month: 'short',
// //         day: 'numeric'
// //       });
// //     } catch (e) {
// //       return dateString;
// //     }
// //   };

// //   // Sort holidays by date
// //   const sortedHolidays = [...filteredHolidays].sort((a, b) => {
// //     return new Date(a.holidayDate || a.date) - new Date(b.holidayDate || b.date);
// //   });

// //   if (loading) {
// //     return (
// //       <div className="emp-holiday-container">
// //         <div className="loading">
// //           <h2>Loading Holiday Calendar...</h2>
// //           <p>Fetching your holiday information...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="emp-holiday-container">
// //         <div className="error-message">
// //           <h2>Error</h2>
// //           <p>{error}</p>
// //           <button onClick={loadData} className="retry-btn">
// //             Retry
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="emp-holiday-container">
// //       <div className="header-section">
// //         <h2>Holiday Calendar</h2>
// //         <div className="header-info">
// //           <p><strong>Your Location:</strong> {getLocationName(employeeLocationId)}</p>
// //           <p><strong>Total Holidays:</strong> {sortedHolidays.length}</p>
// //           <button onClick={loadData} className="refresh-btn">
// //             Refresh
// //           </button>
// //         </div>
// //       </div>

// //       <div className="stats-section">
// //         <div className="stat-card">
// //           <span className="stat-label">Total Holidays</span>
// //           <span className="stat-value">{holidays.length}</span>
// //         </div>
// //         <div className="stat-card">
// //           <span className="stat-label">Your Holidays</span>
// //           <span className="stat-value">{sortedHolidays.length}</span>
// //         </div>
// //       </div>

// //       {sortedHolidays.length === 0 ? (
// //         <div className="no-holidays">
// //           <h3>No Holidays Found</h3>
// //           <p>No holidays are scheduled for your location at the moment.</p>
// //           <div className="location-info">
// //             <p>Your Location ID: {employeeLocationId}</p>
// //             <p>Location Name: {getLocationName(employeeLocationId)}</p>
// //           </div>
// //         </div>
// //       ) : (
// //         <>
// //           <table className="emp-holiday-table">
// //             <thead>
// //               <tr>
// //                 <th>#</th>
// //                 <th>Date</th>
// //                 <th>Holiday Name</th>
// //                 <th>Type</th>
// //                 <th>Location</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {sortedHolidays.map((h, index) => {
// //                 const holidayId = h.holidayId || h.id || h.hId || `holiday-${index}`;
// //                 const holidayDate = h.holidayDate || h.date;
// //                 const holidayName = h.holidayName || h.name;
// //                 const typeId = h.holidayTypeId || h.typeId;
// //                 const locationId = h.holidayLocationId || h.locationId;
                
// //                 return (
// //                   <tr key={holidayId}>
// //                     <td className="serial">{index + 1}</td>
// //                     <td className="date-cell">
// //                       <div className="date-display">{formatDate(holidayDate)}</div>
// //                     </td>
// //                     <td className="name-cell">
// //                       <strong>{holidayName}</strong>
// //                     </td>
// //                     <td className="type-cell">
// //                       <div className="type-display">{getTypeName(typeId)}</div>
// //                     </td>
// //                     <td className="location-cell">
// //                       <div className="location-display">{getLocationName(locationId)}</div>
// //                     </td>
// //                   </tr>
// //                 );
// //               })}
// //             </tbody>
// //           </table>
          
// //           <div className="summary">
// //             <p>
// //               Showing <strong>{sortedHolidays.length}</strong> holiday{sortedHolidays.length !== 1 ? 's' : ''} 
// //               for your location: <strong>{getLocationName(employeeLocationId)}</strong>
// //             </p>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./EmployeeHolidayCalendar.css";

// export default function EmployeeHolidayCalendar() {
//   const [holidays, setHolidays] = useState([]);
//   const [types, setTypes] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [viewMode, setViewMode] = useState("calendar"); // "calendar" or "list"
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   // Get employee location ID
//   const employeeLocationId = sessionStorage.getItem("empLocationId") || 
//                            localStorage.getItem("empLocationId") || 
//                            "2"; // Default for testing

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       // Load all data in parallel
//       const [holidayRes, typeRes, locationRes] = await Promise.all([
//         axios.get("http://localhost:8080/hr/holiday", { withCredentials: true }),
//         axios.get("http://localhost:8080/hr/holidaymaster", { withCredentials: true }),
//         axios.get("http://localhost:8080/hr/holidaylocation", { withCredentials: true })
//       ]);

//       setHolidays(holidayRes.data || []);
//       setTypes(typeRes.data || []);
//       setLocations(locationRes.data || []);
      
//     } catch (err) {
//       console.error("Error loading data:", err);
//       setError("Failed to load holiday data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get type name by ID (case-insensitive)
//   const getTypeName = (id) => {
//     if (!id && id !== 0) return "Not Selected";
    
//     const type = types.find(t => {
//       const tId = t.htId || t.id || t.typeId;
//       return String(tId).toLowerCase() === String(id).toLowerCase();
//     });
    
//     return type ? (type.holidayType || type.type || "Unknown") : "Unknown";
//   };

//   // Get location name by ID (case-insensitive)
//   const getLocationName = (id) => {
//     if (!id && id !== 0) return "Not Selected";
    
//     const location = locations.find(l => {
//       const lId = l.hlId || l.id || l.locationId;
//       return String(lId).toLowerCase() === String(id).toLowerCase();
//     });
    
//     return location ? (location.locationName || location.name || "Unknown") : "Unknown";
//   };

//   // Filter holidays for employee location (case-insensitive)
//   const filteredHolidays = holidays.filter(h => {
//     if (!employeeLocationId) return true;
    
//     const holidayLocationId = h.holidayLocationId || h.locationId;
//     return String(holidayLocationId).toLowerCase() === String(employeeLocationId).toLowerCase();
//   });

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
    
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', {
//         weekday: 'short',
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       });
//     } catch (e) {
//       return dateString;
//     }
//   };

//   // Sort holidays by date
//   const sortedHolidays = [...filteredHolidays].sort((a, b) => {
//     return new Date(a.holidayDate || a.date) - new Date(b.holidayDate || b.date);
//   });

//   // Calendar View Functions
//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const getFirstDayOfMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     return new Date(year, month, 1).getDay();
//   };

//   const getMonthName = (date) => {
//     return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
//   };

//   const navigateMonth = (direction) => {
//     const newMonth = new Date(currentMonth);
//     newMonth.setMonth(newMonth.getMonth() + direction);
//     setCurrentMonth(newMonth);
//   };

//   const isHoliday = (day) => {
//     const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//     return sortedHolidays.find(h => {
//       const holidayDate = h.holidayDate || h.date;
//       return holidayDate && holidayDate.startsWith(dateStr);
//     });
//   };

//   const getHolidaysForDay = (day) => {
//     const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//     return sortedHolidays.filter(h => {
//       const holidayDate = h.holidayDate || h.date;
//       return holidayDate && holidayDate.startsWith(dateStr);
//     });
//   };

//   const getHolidaysByMonth = () => {
//     const currentYear = currentMonth.getFullYear();
//     const currentMonthNum = currentMonth.getMonth() + 1;
    
//     return sortedHolidays.filter(h => {
//       const holidayDate = h.holidayDate || h.date;
//       if (!holidayDate) return false;
      
//       const date = new Date(holidayDate);
//       return date.getFullYear() === currentYear && 
//              date.getMonth() + 1 === currentMonthNum;
//     });
//   };

//   // Calendar rendering
//   const renderCalendar = () => {
//     const daysInMonth = getDaysInMonth(currentMonth);
//     const firstDay = getFirstDayOfMonth(currentMonth);
//     const monthHolidays = getHolidaysByMonth();
    
//     const days = [];
    
//     // Empty cells for days before the first day of month
//     for (let i = 0; i < firstDay; i++) {
//       days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
//     }
    
//     // Days of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const dayHolidays = getHolidaysForDay(day);
//       const isToday = new Date().getDate() === day && 
//                      new Date().getMonth() === currentMonth.getMonth() && 
//                      new Date().getFullYear() === currentMonth.getFullYear();
      
//       days.push(
//         <div key={`day-${day}`} className={`calendar-day ${dayHolidays.length > 0 ? 'has-holiday' : ''} ${isToday ? 'today' : ''}`}>
//           <div className="day-number">{day}</div>
//           {dayHolidays.length > 0 && (
//             <div className="holiday-indicator">
//               <span className="holiday-count">{dayHolidays.length}</span>
//               <div className="holiday-tooltip">
//                 {dayHolidays.map((h, idx) => (
//                   <div key={idx} className="holiday-tooltip-item">
//                     {h.holidayName || h.name}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       );
//     }
    
//     return (
//       <div className="calendar-view">
//         <div className="calendar-header">
//           <button onClick={() => navigateMonth(-1)} className="calendar-nav-btn">
//             &larr; Previous
//           </button>
//           <h3 className="calendar-month-title">{getMonthName(currentMonth)}</h3>
//           <button onClick={() => navigateMonth(1)} className="calendar-nav-btn">
//             Next &rarr;
//           </button>
//         </div>
        
//         <div className="calendar-days-header">
//           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//             <div key={day} className="calendar-day-header">{day}</div>
//           ))}
//         </div>
        
//         <div className="calendar-grid">
//           {days}
//         </div>
        
//         {monthHolidays.length > 0 && (
//           <div className="calendar-summary">
//             <h4>Holidays this month:</h4>
//             <div className="month-holidays-list">
//               {monthHolidays.map((h, idx) => (
//                 <div key={idx} className="month-holiday-item">
//                   <span className="holiday-date">{formatDate(h.holidayDate || h.date)}</span>
//                   <span className="holiday-name">{h.holidayName || h.name}</span>
//                   <span className="holiday-type">{getTypeName(h.holidayTypeId || h.typeId)}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="emp-holiday-container">
//         <div className="loading">
//           <h2>Loading Holiday Calendar...</h2>
//           <p>Fetching your holiday information...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="emp-holiday-container">
//         <div className="error-message">
//           <h2>Error</h2>
//           <p>{error}</p>
//           <button onClick={loadData} className="retry-btn">
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="emp-holiday-container">
//       <div className="header-section">
//         <h2>Holiday Calendar</h2>
//         <div className="header-info">
//           <p><strong>Your Location:</strong> {getLocationName(employeeLocationId)}</p>
//           <p><strong>Total Holidays:</strong> {sortedHolidays.length}</p>
//           <div className="view-toggle">
//             <button 
//               onClick={() => setViewMode("list")}
//               className={`view-btn ${viewMode === "list" ? "active" : ""}`}
//             >
//               📋 List View
//             </button>
//             <button 
//               onClick={() => setViewMode("calendar")}
//               className={`view-btn ${viewMode === "calendar" ? "active" : ""}`}
//             >
//               📅 Calendar View
//             </button>
//           </div>
//           <button onClick={loadData} className="refresh-btn">
//             Refresh
//           </button>
//         </div>
//       </div>

//       <div className="stats-section">
//         <div className="stat-card">
//           <span className="stat-label">Total Holidays</span>
//           <span className="stat-value">{holidays.length}</span>
//         </div>
//         <div className="stat-card">
//           <span className="stat-label">Your Holidays</span>
//           <span className="stat-value">{sortedHolidays.length}</span>
//         </div>
//         <div className="stat-card">
//           <span className="stat-label">Current View</span>
//           <span className="stat-value">{viewMode === "calendar" ? "Calendar" : "List"}</span>
//         </div>
//       </div>

//       {sortedHolidays.length === 0 ? (
//         <div className="no-holidays">
//           <h3>No Holidays Found</h3>
//           <p>No holidays are scheduled for your location at the moment.</p>
//           <div className="location-info">
//             <p>Your Location ID: {employeeLocationId}</p>
//             <p>Location Name: {getLocationName(employeeLocationId)}</p>
//           </div>
//         </div>
//       ) : (
//         <>
//           {viewMode === "calendar" ? (
//             renderCalendar()
//           ) : (
//             <>
//               <table className="emp-holiday-table">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Date</th>
//                     <th>Holiday Name</th>
//                     <th>Type</th>
//                     <th>Location</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sortedHolidays.map((h, index) => {
//                     const holidayId = h.holidayId || h.id || h.hId || `holiday-${index}`;
//                     const holidayDate = h.holidayDate || h.date;
//                     const holidayName = h.holidayName || h.name;
//                     const typeId = h.holidayTypeId || h.typeId;
//                     const locationId = h.holidayLocationId || h.locationId;
                    
//                     return (
//                       <tr key={holidayId}>
//                         <td className="serial">{index + 1}</td>
//                         <td className="date-cell">
//                           <div className="date-display">{formatDate(holidayDate)}</div>
//                         </td>
//                         <td className="name-cell">
//                           <strong>{holidayName}</strong>
//                         </td>
//                         <td className="type-cell">
//                           <div className="type-display">{getTypeName(typeId)}</div>
//                         </td>
//                         <td className="location-cell">
//                           <div className="location-display">{getLocationName(locationId)}</div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
              
//               <div className="summary">
//                 <p>
//                   Showing <strong>{sortedHolidays.length}</strong> holiday{sortedHolidays.length !== 1 ? 's' : ''} 
//                   for your location: <strong>{getLocationName(employeeLocationId)}</strong>
//                 </p>
//               </div>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeHolidayCalendar.css";

export default function EmployeeHolidayCalendar() {
  const [holidays, setHolidays] = useState([]);
  const [types, setTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("calendar"); // "calendar" or "list"
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAllLocations, setShowAllLocations] = useState(true); // Toggle to show all locations or just employee's

  // Get employee location ID
  const employeeLocationId = sessionStorage.getItem("empLocationId") || 
                           localStorage.getItem("empLocationId") || 
                           "2"; // Default for testing

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      // Load all data in parallel
      const [holidayRes, typeRes, locationRes] = await Promise.all([
        axios.get("http://localhost:8080/hr/holiday", { withCredentials: true }),
        axios.get("http://localhost:8080/hr/holidaymaster", { withCredentials: true }),
        axios.get("http://localhost:8080/hr/holidaylocation", { withCredentials: true })
      ]);

      setHolidays(holidayRes.data || []);
      setTypes(typeRes.data || []);
      setLocations(locationRes.data || []);
      
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load holiday data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get type name by ID (case-insensitive)
  const getTypeName = (id) => {
    if (!id && id !== 0) return "Not Selected";
    
    const type = types.find(t => {
      const tId = t.htId || t.id || t.typeId;
      return String(tId).toLowerCase() === String(id).toLowerCase();
    });
    
    return type ? (type.holidayType || type.type || "Unknown") : "Unknown";
  };

  // Get location name by ID (case-insensitive)
  const getLocationName = (id) => {
    if (!id && id !== 0) return "Not Selected";
    
    const location = locations.find(l => {
      const lId = l.hlId || l.id || l.locationId;
      return String(lId).toLowerCase() === String(id).toLowerCase();
    });
    
    return location ? (location.locationName || location.name || "Unknown") : "Unknown";
  };

  // Get location color (for calendar display)
  const getLocationColor = (locationId) => {
    const locationColors = [
      "#3B82F6", // Blue
      "#10B981", // Green
      "#F59E0B", // Yellow
      "#EF4444", // Red
      "#8B5CF6", // Purple
      "#EC4899", // Pink
      "#6366F1", // Indigo
      "#14B8A6", // Teal
      "#F97316", // Orange
      "#84CC16", // Lime
    ];
    
    const locationIndex = locations.findIndex(l => {
      const lId = l.hlId || l.id || l.locationId;
      return String(lId).toLowerCase() === String(locationId).toLowerCase();
    });
    
    return locationColors[locationIndex % locationColors.length] || "#6B7280";
  };

  // Filter holidays based on toggle
  const filteredHolidays = holidays.filter(h => {
    if (showAllLocations) return true; // Show all locations
    
    // Show only employee's location
    const holidayLocationId = h.holidayLocationId || h.locationId;
    return String(holidayLocationId).toLowerCase() === String(employeeLocationId).toLowerCase();
  });

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Sort holidays by date
  const sortedHolidays = [...filteredHolidays].sort((a, b) => {
    return new Date(a.holidayDate || a.date) - new Date(b.holidayDate || b.date);
  });

  // Calendar View Functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const getHolidaysForDay = (day) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return sortedHolidays.filter(h => {
      const holidayDate = h.holidayDate || h.date;
      return holidayDate && holidayDate.startsWith(dateStr);
    });
  };

  const getHolidaysByMonth = () => {
    const currentYear = currentMonth.getFullYear();
    const currentMonthNum = currentMonth.getMonth() + 1;
    
    return sortedHolidays.filter(h => {
      const holidayDate = h.holidayDate || h.date;
      if (!holidayDate) return false;
      
      const date = new Date(holidayDate);
      return date.getFullYear() === currentYear && 
             date.getMonth() + 1 === currentMonthNum;
    });
  };

  // Group holidays by location for the current month
  const getHolidaysByLocation = () => {
    const monthHolidays = getHolidaysByMonth();
    const grouped = {};
    
    monthHolidays.forEach(h => {
      const locationId = h.holidayLocationId || h.locationId;
      const locationName = getLocationName(locationId);
      
      if (!grouped[locationName]) {
        grouped[locationName] = {
          color: getLocationColor(locationId),
          holidays: []
        };
      }
      
      grouped[locationName].holidays.push({
        date: h.holidayDate || h.date,
        name: h.holidayName || h.name,
        type: getTypeName(h.holidayTypeId || h.typeId)
      });
    });
    
    return grouped;
  };

  // Calendar rendering
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const monthHolidays = getHolidaysByMonth();
    const holidaysByLocation = getHolidaysByLocation();
    
    const days = [];
    
    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayHolidays = getHolidaysForDay(day);
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentMonth.getMonth() && 
                     new Date().getFullYear() === currentMonth.getFullYear();
      
      // Get unique locations for this day
      const dayLocations = [...new Set(dayHolidays.map(h => 
        getLocationName(h.holidayLocationId || h.locationId)
      ))];
      
      days.push(
        <div key={`day-${day}`} className={`calendar-day ${dayHolidays.length > 0 ? 'has-holiday' : ''} ${isToday ? 'today' : ''}`}>
          <div className="day-number">{day}</div>
          {dayHolidays.length > 0 && (
            <div className="holiday-indicators">
              <div className="holiday-count">{dayHolidays.length} holiday{dayHolidays.length !== 1 ? 's' : ''}</div>
              <div className="location-dots">
                {dayLocations.map((locationName, idx) => {
                  const locationHolidays = dayHolidays.filter(h => 
                    getLocationName(h.holidayLocationId || h.locationId) === locationName
                  );
                  const location = locations.find(l => 
                    getLocationName(l.hlId || l.id || l.locationId) === locationName
                  );
                  const locationId = location ? (location.hlId || location.id || location.locationId) : '';
                  
                  return (
                    <div 
                      key={idx} 
                      className="location-dot"
                      style={{ backgroundColor: getLocationColor(locationId) }}
                      title={`${locationName}: ${locationHolidays.map(h => h.holidayName || h.name).join(', ')}`}
                    >
                      <span className="dot-count">{locationHolidays.length}</span>
                    </div>
                  );
                })}
              </div>
              <div className="holiday-tooltip">
                {dayHolidays.map((h, idx) => {
                  const locationName = getLocationName(h.holidayLocationId || h.locationId);
                  const locationColor = getLocationColor(h.holidayLocationId || h.locationId);
                  
                  return (
                    <div key={idx} className="holiday-tooltip-item">
                      <div className="holiday-tooltip-header">
                        <span 
                          className="location-color-dot"
                          style={{ backgroundColor: locationColor }}
                        ></span>
                        <span className="holiday-name">{h.holidayName || h.name}</span>
                      </div>
                      <div className="holiday-tooltip-details">
                        <span className="holiday-location">{locationName}</span>
                        <span className="holiday-type">{getTypeName(h.holidayTypeId || h.typeId)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="calendar-view">
        <div className="calendar-controls">
          <div className="location-toggle">
            <button 
              onClick={() => setShowAllLocations(true)}
              className={`location-toggle-btn ${showAllLocations ? "active" : ""}`}
            >
              All Locations
            </button>
            <button 
              onClick={() => setShowAllLocations(false)}
              className={`location-toggle-btn ${!showAllLocations ? "active" : ""}`}
            >
              My Location Only
            </button>
          </div>
          
          <div className="calendar-header">
            <button onClick={() => navigateMonth(-1)} className="calendar-nav-btn">
              &larr; Previous
            </button>
            <h3 className="calendar-month-title">{getMonthName(currentMonth)}</h3>
            <button onClick={() => navigateMonth(1)} className="calendar-nav-btn">
              Next &rarr;
            </button>
          </div>
        </div>
        
        <div className="location-legend">
          {Object.entries(holidaysByLocation).map(([locationName, data], idx) => (
            <div key={idx} className="legend-item">
              <span 
                className="legend-color" 
                style={{ backgroundColor: data.color }}
              ></span>
              <span className="legend-text">{locationName} ({data.holidays.length})</span>
            </div>
          ))}
        </div>
        
        <div className="calendar-days-header">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
        </div>
        
        <div className="calendar-grid">
          {days}
        </div>
        
        {monthHolidays.length > 0 && (
          <div className="calendar-summary">
            <h4>Holidays in {getMonthName(currentMonth)}:</h4>
            {Object.entries(holidaysByLocation).map(([locationName, data], idx) => (
              <div key={idx} className="location-holiday-group">
                <div className="location-group-header" style={{ borderLeftColor: data.color }}>
                  <h5>{locationName} <span className="holiday-count-badge">{data.holidays.length}</span></h5>
                </div>
                <div className="location-holidays-list">
                  {data.holidays.map((h, hIdx) => (
                    <div key={hIdx} className="location-holiday-item">
                      <span className="holiday-date">{formatDate(h.date)}</span>
                      <span className="holiday-name">{h.name}</span>
                      <span className="holiday-type">{h.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="emp-holiday-container">
        <div className="loading">
          <h2>Loading Holiday Calendar...</h2>
          <p>Fetching your holiday information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="emp-holiday-container">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={loadData} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="emp-holiday-container">
      <div className="header-section">
        <h2>Holiday Calendar</h2>
        <div className="header-info">
          <p><strong>Your Location:</strong> {getLocationName(employeeLocationId)}</p>
          <p><strong>Total Holidays:</strong> {sortedHolidays.length}</p>
          <div className="header-controls">
            <div className="view-toggle">
              <button 
                onClick={() => setViewMode("list")}
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
              >
                📋 List View
              </button>
              <button 
                onClick={() => setViewMode("calendar")}
                className={`view-btn ${viewMode === "calendar" ? "active" : ""}`}
              >
                📅 Calendar View
              </button>
            </div>
            <button onClick={loadData} className="refresh-btn">
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <span className="stat-label">Total Holidays</span>
          <span className="stat-value">{holidays.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">{showAllLocations ? "All Locations" : "Your Location"}</span>
          <span className="stat-value">{sortedHolidays.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Locations</span>
          <span className="stat-value">{locations.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Current View</span>
          <span className="stat-value">{viewMode === "calendar" ? "Calendar" : "List"}</span>
        </div>
      </div>

      {sortedHolidays.length === 0 ? (
        <div className="no-holidays">
          <h3>No Holidays Found</h3>
          <p>No holidays are scheduled {showAllLocations ? "for any location" : "for your location"} at the moment.</p>
          <div className="location-info">
            <p>Your Location ID: {employeeLocationId}</p>
            <p>Location Name: {getLocationName(employeeLocationId)}</p>
          </div>
        </div>
      ) : (
        <>
          {viewMode === "calendar" ? (
            renderCalendar()
          ) : (
            <>
              <div className="location-filter-banner">
                <span>Showing: <strong>{showAllLocations ? "All Locations" : "Your Location Only"}</strong></span>
                <button 
                  onClick={() => setShowAllLocations(!showAllLocations)}
                  className="toggle-locations-btn"
                >
                  {showAllLocations ? "Show My Location Only" : "Show All Locations"}
                </button>
              </div>
              
              <table className="emp-holiday-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Holiday Name</th>
                    <th>Type</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedHolidays.map((h, index) => {
                    const holidayId = h.holidayId || h.id || h.hId || `holiday-${index}`;
                    const holidayDate = h.holidayDate || h.date;
                    const holidayName = h.holidayName || h.name;
                    const typeId = h.holidayTypeId || h.typeId;
                    const locationId = h.holidayLocationId || h.locationId;
                    
                    return (
                      <tr key={holidayId}>
                        <td className="serial">{index + 1}</td>
                        <td className="date-cell">
                          <div className="date-display">{formatDate(holidayDate)}</div>
                        </td>
                        <td className="name-cell">
                          <strong>{holidayName}</strong>
                        </td>
                        <td className="type-cell">
                          <div className="type-display">{getTypeName(typeId)}</div>
                        </td>
                        <td className="location-cell">
                          <div className="location-display">
                            <span 
                              className="location-color-indicator"
                              style={{ backgroundColor: getLocationColor(locationId) }}
                            ></span>
                            {getLocationName(locationId)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              <div className="summary">
                <p>
                  Showing <strong>{sortedHolidays.length}</strong> holiday{sortedHolidays.length !== 1 ? 's' : ''} 
                  {showAllLocations ? " for all locations" : " for your location: " + getLocationName(employeeLocationId)}
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}