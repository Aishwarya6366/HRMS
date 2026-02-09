// import { useState } from "react";
// import axios from "axios";

// export default function EmployeeSearchBar() {
//   const [filters, setFilters] = useState({
//     username: "",
//     firstName: "",
//     departmentName: "",
//     designationName: "",
//     startDate: "",
//     endDate: "",
//   });

//   const [results, setResults] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSearch = async () => {
//     try {
//       setLoading(true);
//       const cleanedParams = Object.fromEntries(
//         Object.entries(filters).filter(([_, v]) => v !== "")
//       );

//       const response = await axios.get(
//         "http://localhost:8080/hr/search",
//         { params: cleanedParams }
//       );

//       setResults(response.data);
//       setSelectedEmployee(null); // Clear previous selection when new search
//     } catch (error) {
//       console.error("Search error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle clicking on employee name
//   const handleEmployeeClick = (employee) => {
//     setSelectedEmployee(employee);
//   };

//   return (
//     <div className="search-container">
//       <div className="search-fields">
//         <input name="username" placeholder="Username" onChange={handleChange} />
//         <input name="firstName" placeholder="First Name" onChange={handleChange} />
//         <input name="departmentName" placeholder="Department" onChange={handleChange} />
//         <input name="designationName" placeholder="Designation" onChange={handleChange} />
//         <input type="date" name="startDate" onChange={handleChange} />
//         <input type="date" name="endDate" onChange={handleChange} />
//         <button onClick={handleSearch} disabled={loading}>
//           {loading ? "Searching..." : "Search"}
//         </button>
//       </div>

//       {/* Search Results Table */}
//       {results.length > 0 && (
//         <div className="search-results">
//           <h3>Search Results ({results.length})</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>MIN</th>
//                 <th>DOB</th>
//                 <th>Email</th>
//                 <th>Department</th>
//                 <th>Designation</th>
//                 <th>CTC</th>
//               </tr>
//             </thead>
//             <tbody>
//               {results.map((emp, index) => (
//                 <tr key={index} className={selectedEmployee?.min === emp.min ? "selected" : ""}>
//                   <td>
//                     <button 
//                       className="employee-name-btn"
//                       onClick={() => handleEmployeeClick(emp)}
//                     >
//                       {emp.firstName} {emp.lastName || ''}
//                     </button>
//                   </td>
//                   <td>{emp.min}</td>
//                   <td>{emp.dob}</td>
//                   <td>{emp.emailId}</td>
//                   <td>{emp.departmentName}</td>
//                   <td>{emp.designationName}</td>
//                   <td>{emp.ctc}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Employee Details Panel */}
//       {selectedEmployee && (
//         <div className="employee-details-panel">
//           <h3>Employee Details</h3>
//           <div className="details-grid">
            
//             {/* Personal Details */}
//             <div className="detail-section">
//               <h4>Personal Details</h4>
//               <div className="detail-row">
//                 <span>Name:</span>
//                 <span>{selectedEmployee.firstName} {selectedEmployee.middleName || ''} {selectedEmployee.lastName || ''}</span>
//               </div>
//               <div className="detail-row">
//                 <span>DOB:</span>
//                 <span>{selectedEmployee.dob}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Gender:</span>
//                 <span>{selectedEmployee.gender || 'N/A'}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Email:</span>
//                 <span>{selectedEmployee.emailId}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Phone:</span>
//                 <span>{selectedEmployee.phoneNumber || 'N/A'}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Aadhaar:</span>
//                 <span>{selectedEmployee.aadhaarNumber || 'N/A'}</span>
//               </div>
//               <div className="detail-row">
//                 <span>PAN:</span>
//                 <span>{selectedEmployee.panNumber || 'N/A'}</span>
//               </div>
//             </div>

//             {/* Job Details */}
//             <div className="detail-section">
//               <h4>Job Details</h4>
//               <div className="detail-row">
//                 <span>Department:</span>
//                 <span>{selectedEmployee.departmentName || selectedEmployee.departmentId || 'N/A'}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Designation:</span>
//                 <span>{selectedEmployee.designationName || selectedEmployee.designationId || 'N/A'}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Date of Joining:</span>
//                 <span>{selectedEmployee.dateOfJoining || 'N/A'}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Work Location:</span>
//                 <span>{selectedEmployee.workLocation || 'N/A'}</span>
//               </div>
//             </div>

//             {/* Salary Details */}
//             <div className="detail-section">
//               <h4>Salary Details</h4>
//               <div className="detail-row">
//                 <span>CTC:</span>
//                 <span>{selectedEmployee.ctc || 'N/A'}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Basic:</span>
//                 <span>{selectedEmployee.basic || 'N/A'}</span>
//               </div>
//               <div className="detail-row">
//                 <span>HRA:</span>
//                 <span>{selectedEmployee.hra || 'N/A'}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Conveyance:</span>
//                 <span>{selectedEmployee.conveyanceAllowance || 'N/A'}</span>
//               </div>
//               <div className="detail-row">
//                 <span>PF:</span>
//                 <span>{selectedEmployee.pf || 'N/A'}</span>
//               </div>
//             </div>

//             {/* Bank Details */}
//             <div className="detail-section">
//               <h4>Bank Details</h4>
//               <div className="detail-row">
//                 <span>Bank Name:</span>
//                 <span>{selectedEmployee.bankName || 'N/A'}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Account Number:</span>
//                 <span>{selectedEmployee.accountNumber || 'N/A'}</span>
//               </div>
//               <div className="detail-row">
//                 <span>IFSC:</span>
//                 <span>{selectedEmployee.ifsc || 'N/A'}</span>
//               </div>
//             </div>

//             {/* Statutory Details */}
//             <div className="detail-section">
//               <h4>Statutory Details</h4>
//               <div className="detail-row">
//                 <span>MIN:</span>
//                 <span>{selectedEmployee.min}</span>
//               </div>
//               <div className="detail-row">
//                 <span>PF UAN:</span>
//                 <span>{selectedEmployee.pfUan || 'N/A'}</span>
//               </div>
//               <div className="detail-row">
//                 <span>ESI:</span>
//                 <span>{selectedEmployee.esi || 'N/A'}</span>
//               </div>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState } from "react";
import axios from "axios";

export default function EmployeeSearchBar() {
  const [filters, setFilters] = useState({
    username: "",
    firstName: "",
    departmentName: "",
    designationName: "",
    startDate: "",
    endDate: "",
  });

  const [results, setResults] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const cleanedParams = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );

      const response = await axios.get(
        "http://localhost:8080/hr/search",
        { params: cleanedParams }
      );

      setResults(response.data);
      setSelectedEmployee(null);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle clicking on employee name - Fetch full details
  const handleEmployeeClick = async (employee) => {
    try {
      setDetailsLoading(true);
      
      // Fetch complete employee details using their MIN/ID
      const response = await axios.get(
        `http://localhost:8080/hr/employee/${employee.min || employee.id}`,
        {
          params: { 
            min: employee.min 
          },
          withCredentials: true
        }
      );
      
      // If the API returns data in the expected structure
      if (response.data) {
        setSelectedEmployee(response.data);
      } else {
        // If API doesn't have all details, use search result data
        // and structure it according to your form format
        const structuredEmployee = {
          personalDetailsDTO: {
            firstName: employee.firstName || "",
            middleName: employee.middleName || "",
            lastName: employee.lastName || "",
            gender: employee.gender || "",
            dob: employee.dob || "",
            nationality: employee.nationality || "",
            maritalStatus: employee.maritalStatus || "",
            bloodGroup: employee.bloodGroup || "",
            aadhaarNumber: employee.aadhaarNumber || "",
            panNumber: employee.panNumber || "",
            phoneNumber: employee.phoneNumber || "",
            emailId: employee.emailId || "",
            address1: employee.address1 || "",
            address2: employee.address2 || "",
            emergencyContactName: employee.emergencyContactName || "",
            emergencyContactRelation: employee.emergencyContactRelation || "",
            emergencyPhoneNumber: employee.emergencyPhoneNumber || "",
          },
          jobDetailsDTO: {
            departmentId: employee.departmentId || "",
            designationId: employee.designationId || "",
            workLocation: employee.workLocation || "Bangalore",
            dateOfJoining: employee.dateOfJoining || "",
          },
          bankDetailsDTO: {
            bankName: employee.bankName || "",
            accountNumber: employee.accountNumber || "",
            ifsc: employee.ifsc || "",
          },
          employeeStatutoryDetailsDTO: {
            pfUan: employee.pfUan || "",
            esi: employee.esi || "",
            min: employee.min || "",
          },
          salaryDetailsDTO: {
            ctc: employee.ctc || "",
            basic: employee.basic || "",
            hra: employee.hra || "",
            conveyanceAllowance: employee.conveyanceAllowance || "",
            pf: employee.pf || "",
          },
        };
        setSelectedEmployee(structuredEmployee);
      }
    } catch (error) {
      console.error("Error fetching employee details:", error);
      // If API fails, structure the search result data
      const structuredEmployee = {
        personalDetailsDTO: {
          firstName: employee.firstName || "",
          middleName: employee.middleName || "",
          lastName: employee.lastName || "",
          gender: employee.gender || "",
          dob: employee.dob || "",
          nationality: employee.nationality || "",
          maritalStatus: employee.maritalStatus || "",
          bloodGroup: employee.bloodGroup || "",
          aadhaarNumber: employee.aadhaarNumber || "",
          panNumber: employee.panNumber || "",
          phoneNumber: employee.phoneNumber || "",
          emailId: employee.emailId || "",
          address1: employee.address1 || "",
          address2: employee.address2 || "",
          emergencyContactName: employee.emergencyContactName || "",
          emergencyContactRelation: employee.emergencyContactRelation || "",
          emergencyPhoneNumber: employee.emergencyPhoneNumber || "",
        },
        jobDetailsDTO: {
          departmentId: employee.departmentId || "",
          designationId: employee.designationId || "",
          workLocation: employee.workLocation || "Bangalore",
          dateOfJoining: employee.dateOfJoining || "",
        },
        bankDetailsDTO: {
          bankName: employee.bankName || "",
          accountNumber: employee.accountNumber || "",
          ifsc: employee.ifsc || "",
        },
        employeeStatutoryDetailsDTO: {
          pfUan: employee.pfUan || "",
          esi: employee.esi || "",
          min: employee.min || "",
        },
        salaryDetailsDTO: {
          ctc: employee.ctc || "",
          basic: employee.basic || "",
          hra: employee.hra || "",
          conveyanceAllowance: employee.conveyanceAllowance || "",
          pf: employee.pf || "",
        },
      };
      setSelectedEmployee(structuredEmployee);
    } finally {
      setDetailsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-fields">
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="firstName" placeholder="First Name" onChange={handleChange} />
        <input name="departmentName" placeholder="Department" onChange={handleChange} />
        <input name="designationName" placeholder="Designation" onChange={handleChange} />
        <input type="date" name="startDate" onChange={handleChange} />
        <input type="date" name="endDate" onChange={handleChange} />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Search Results Table */}
      {results.length > 0 && (
        <div className="search-results">
          <h3>Search Results ({results.length})</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>MIN</th>
                <th>DOB</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>CTC</th>
              </tr>
            </thead>
            <tbody>
              {results.map((emp, index) => (
                <tr key={index} className={selectedEmployee?.employeeStatutoryDetailsDTO?.min === emp.min ? "selected" : ""}>
                  <td>
                    <button 
                      className="employee-name-btn"
                      onClick={() => handleEmployeeClick(emp)}
                      disabled={detailsLoading}
                    >
                      {emp.firstName} {emp.lastName || ''}
                    </button>
                  </td>
                  <td>{emp.min}</td>
                  <td>{emp.dob}</td>
                  <td>{emp.emailId}</td>
                  <td>{emp.departmentName}</td>
                  <td>{emp.designationName}</td>
                  <td>{emp.ctc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Loading indicator for details */}
      {detailsLoading && (
        <div className="loading-details">
          <p>Loading employee details...</p>
        </div>
      )}

      {/* Employee Details Panel */}
      {selectedEmployee && !detailsLoading && (
        <div className="employee-details-panel">
          <div className="panel-header">
            <h3>Employee Details</h3>
            <button 
              className="close-btn"
              onClick={() => setSelectedEmployee(null)}
            >
              × Close
            </button>
          </div>
          
          <div className="details-grid">
            
            {/* Personal Details */}
            <div className="detail-section">
              <h4>Personal Details</h4>
              <div className="detail-row">
                <span>Name:</span>
                <span>{selectedEmployee.personalDetailsDTO.firstName} {selectedEmployee.personalDetailsDTO.middleName || ''} {selectedEmployee.personalDetailsDTO.lastName || ''}</span>
              </div>
              <div className="detail-row">
                <span>DOB:</span>
                <span>{selectedEmployee.personalDetailsDTO.dob}</span>
              </div>
              <div className="detail-row">
                <span>Gender:</span>
                <span>{selectedEmployee.personalDetailsDTO.gender || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Email:</span>
                <span>{selectedEmployee.personalDetailsDTO.emailId}</span>
              </div>
              <div className="detail-row">
                <span>Phone:</span>
                <span>{selectedEmployee.personalDetailsDTO.phoneNumber || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Aadhaar:</span>
                <span>{selectedEmployee.personalDetailsDTO.aadhaarNumber || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>PAN:</span>
                <span>{selectedEmployee.personalDetailsDTO.panNumber || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Blood Group:</span>
                <span>{selectedEmployee.personalDetailsDTO.bloodGroup || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Marital Status:</span>
                <span>{selectedEmployee.personalDetailsDTO.maritalStatus || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Nationality:</span>
                <span>{selectedEmployee.personalDetailsDTO.nationality || 'N/A'}</span>
              </div>
            </div>

            {/* Address Details */}
            <div className="detail-section">
              <h4>Address Details</h4>
              <div className="detail-row">
                <span>Address Line 1:</span>
                <span>{selectedEmployee.personalDetailsDTO.address1 || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Address Line 2:</span>
                <span>{selectedEmployee.personalDetailsDTO.address2 || 'N/A'}</span>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="detail-section">
              <h4>Emergency Contact</h4>
              <div className="detail-row">
                <span>Contact Name:</span>
                <span>{selectedEmployee.personalDetailsDTO.emergencyContactName || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Relationship:</span>
                <span>{selectedEmployee.personalDetailsDTO.emergencyContactRelation || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Phone Number:</span>
                <span>{selectedEmployee.personalDetailsDTO.emergencyPhoneNumber || 'N/A'}</span>
              </div>
            </div>

            {/* Job Details */}
            <div className="detail-section">
              <h4>Job Details</h4>
              <div className="detail-row">
                <span>Department:</span>
                <span>{selectedEmployee.jobDetailsDTO.departmentId || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Designation:</span>
                <span>{selectedEmployee.jobDetailsDTO.designationId || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Date of Joining:</span>
                <span>{selectedEmployee.jobDetailsDTO.dateOfJoining || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Work Location:</span>
                <span>{selectedEmployee.jobDetailsDTO.workLocation || 'N/A'}</span>
              </div>
            </div>

            {/* Bank Details */}
            <div className="detail-section">
              <h4>Bank Details</h4>
              <div className="detail-row">
                <span>Bank Name:</span>
                <span>{selectedEmployee.bankDetailsDTO.bankName || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Account Number:</span>
                <span>{selectedEmployee.bankDetailsDTO.accountNumber || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>IFSC Code:</span>
                <span>{selectedEmployee.bankDetailsDTO.ifsc || 'N/A'}</span>
              </div>
            </div>

            {/* Statutory Details */}
            <div className="detail-section">
              <h4>Statutory Details</h4>
              <div className="detail-row">
                <span>MIN:</span>
                <span>{selectedEmployee.employeeStatutoryDetailsDTO.min}</span>
              </div>
              <div className="detail-row">
                <span>PF UAN:</span>
                <span>{selectedEmployee.employeeStatutoryDetailsDTO.pfUan || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>ESI:</span>
                <span>{selectedEmployee.employeeStatutoryDetailsDTO.esi || 'N/A'}</span>
              </div>
            </div>

            {/* Salary Details */}
            <div className="detail-section">
              <h4>Salary Details</h4>
              <div className="detail-row">
                <span>CTC:</span>
                <span>{selectedEmployee.salaryDetailsDTO.ctc || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Basic Salary:</span>
                <span>{selectedEmployee.salaryDetailsDTO.basic || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>HRA:</span>
                <span>{selectedEmployee.salaryDetailsDTO.hra || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Conveyance Allowance:</span>
                <span>{selectedEmployee.salaryDetailsDTO.conveyanceAllowance || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>PF:</span>
                <span>{selectedEmployee.salaryDetailsDTO.pf || 'N/A'}</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}