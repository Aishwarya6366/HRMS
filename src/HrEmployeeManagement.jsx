
import { useEffect, useState } from "react"; 
import axios from "axios"; 
import "./HrEmployeeManagement.css"; 

export default function HrEmployeeManagement() { 
  const loggedInUserId = sessionStorage.getItem("userId");

  const [address1Error, setAddress1Error] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [aadhaarError, setAadhaarError] = useState("");
  const [dobError, setDobError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

 const [loading, setLoading] = useState(false);
 const [emergencyNameError, setEmergencyNameError] = useState("");
  const [message, setMessage] = useState(""); 
  const [mode, setMode] = useState("create"); // 'create' or 'edit' 
  const [userId, setUserId] = useState(null); 
  const [searchValue, setSearchValue] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dateOfJoiningError, setDateOfJoiningError] = useState("");
  const [emergencyPhoneError, setEmergencyPhoneError] = useState("");


  
  /* ================= API DATA ================= */ 
  const [departments, setDepartments] = useState([]); 
  const [designations, setDesignations] = useState([]); 
  const [percentages, setPercentages] = useState(null);
  
  /* ================= FORM STATE ================= */ 
  const [form, setForm] = useState({ 
    personalDetailsDTO: { 
      firstName: "", 
      middleName: "", 
      lastName: "", 
      gender: "", 
      dob: "", 
      nationality: "", 
      maritalStatus: "", 
      bloodGroup: "", 
      aadhaarNumber: "", 
      panNumber: "", 
      phoneNumber: "", 
      emailId: "", 
      address1: "", 
      address2: "", 
      emergencyContactName: "", 
      emergencyContactRelation: "", 
      emergencyPhoneNumber: "", 
    }, 
    jobDetailsDTO: { 
      departmentId: "", 
      designationId: "", 
      workLocation: "Bangalore", 
      dateOfJoining: "", 
    }, 
    bankDetailsDTO: { 
      bankName: "", 
      accountNumber: "", 
      ifsc: "", 
    }, 
    employeeStatutoryDetailsDTO: { 
      pfUan: "", 
      esi: "", 
      min: "", 
    }, 
    salaryDetailsDTO: { 
      ctc: "", 
      basic: "", 
      hra: "", 
      conveyanceAllowance: "", 
      pf: "", 
    }, 
  }); 
  
  // Add net salary state for display
  const [netSalary, setNetSalary] = useState(0);
  
  /* ================= FETCH DEPARTMENTS, DESIGNATIONS & SALARY PERCENTAGES ================= */ 
  useEffect(() => { 
    // Fetch departments 
    axios.get("http://localhost:8080/api/departments", { withCredentials: true }) 
      .then((res) => setDepartments(res.data)) 
      .catch((err) => console.error("Department API error", err)); 
    
    // Fetch designations 
    axios.get("http://localhost:8080/api/designations", { withCredentials: true }) 
      .then((res) => setDesignations(res.data)) 
      .catch((err) => console.error("Designation API error", err)); 
    
    // Fetch salary calculation percentages 
    axios.get("http://localhost:8080/salary/calculator/get", { withCredentials: true }) 
      .then((res) => { 
        console.log("Salary API response:", res.data); 
        
        // ✅ pick record with actual percentages
        const validItem = Array.isArray(res.data) 
          ? res.data.find(item => item.basicPercentage > 0)
          : res.data;
        
        if (!validItem) {
          console.warn("No valid salary config found");
          return;
        }
        
        setPercentages({
          basic: Number(validItem.basicPercentage),
          hra: Number(validItem.hraPercentage),
          pf: Number(validItem.pfPercentage),
        });
        
        setMessage("✅ Salary percentages loaded successfully");
      }) 
      .catch((err) => { 
        console.error("Salary percentages API error", err); 
        setMessage("⚠️ Using default salary percentages");
      }); 
  }, []); 
  
  /* ================= CALCULATE SALARY WHEN CTC OR PERCENTAGES CHANGE ================= */ 
  useEffect(() => {
    if (!percentages || !form.salaryDetailsDTO.ctc) return;
    
    const ctcAmount = Number(form.salaryDetailsDTO.ctc);
    if (isNaN(ctcAmount) || ctcAmount <= 0) return;
    
    // Calculate salary breakdown
    const basic = (ctcAmount * percentages.basic) / 100;
    const hra = (basic * percentages.hra) / 100;
    const pf = (basic * percentages.pf) / 100;
    const conveyanceAllowance = ctcAmount - (basic + hra + pf);
    const net = ctcAmount - pf; // Net salary = CTC - PF
    
    // Update form with calculated values
    setForm(prev => ({
      ...prev,
      salaryDetailsDTO: {
        ...prev.salaryDetailsDTO,
        basic: basic.toFixed(0),
        hra: hra.toFixed(0),
        pf: pf.toFixed(0),
        conveyanceAllowance: conveyanceAllowance.toFixed(0)
      }
    }));
    
    // Set net salary for display
    setNetSalary(net.toFixed(0));
    
    // Show calculation message
    if (ctcAmount > 0) {
      setMessage(`✅ Salary calculated: Basic (${percentages.basic}%), HRA (${percentages.hra}%), PF (${percentages.pf}%)`);
    }
  }, [form.salaryDetailsDTO.ctc, percentages]);
  
  /* ================= HANDLE INPUT ================= */ 
  const handleChange = (section, field, value) => { 
    setForm((prev) => ({ 
      ...prev, 
      [section]: { ...prev[section], [field]: value }, 
    })); 
  };

  const handleDobChange = (value) => {
  if (!value) {
    setDobError("Date of Birth is required");
    handleChange("personalDetailsDTO", "dob", "");
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dob = new Date(value);
  dob.setHours(0, 0, 0, 0);

  // ❌ Future date check
  if (dob > today) {
    setDobError("Date of Birth cannot be a future date");
    handleChange("personalDetailsDTO", "dob", "");
    return;
  }

  // ✅ Age calculation
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();

  const isBelow20 =
    age < 20 ||
    (age === 20 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));

  if (isBelow20) {
    setDobError("Employee must be at least 20 years old");
    handleChange("personalDetailsDTO", "dob", "");
    return;
  }

  setDobError("");
  handleChange("personalDetailsDTO", "dob", value);
};

  const handleAadhaarChange = (value) => {
  // allow digits only
  const cleaned = value.replace(/\D/g, "");

  // max 12 digits
  if (cleaned.length > 12) return;

  // Aadhaar must not start with 0 or 1
  if (cleaned.length === 1 && /^[01]$/.test(cleaned)) {
    setAadhaarError("Aadhaar number must not start with 0 or 1");
    handleChange("personalDetailsDTO", "aadhaarNumber", "");
    return;
  }

  // full validation (12 digits, starts with 2–9)
  if (cleaned.length === 12 && !/^[2-9][0-9]{11}$/.test(cleaned)) {
    setAadhaarError("Enter a valid 12-digit Aadhaar number");
    handleChange("personalDetailsDTO", "aadhaarNumber", "");
    return;
  }

  setAadhaarError("");
  handleChange("personalDetailsDTO", "aadhaarNumber", cleaned);
};

  const handlePhoneNumberChange = (value) => {
  // allow digits only
  const cleaned = value.replace(/\D/g, "");

  // max 10 digits
  if (cleaned.length > 10) return;

  // starting digit validation
  if (cleaned.length === 1 && !/^[6-9]$/.test(cleaned)) {
    setPhoneError(
      "Phone number must start with 6, 7, 8, or 9"
    );
    handleChange("personalDetailsDTO", "phoneNumber", "");
    return;
  }

  // full validation when 10 digits
  if (cleaned.length === 10 && !/^[6-9][0-9]{9}$/.test(cleaned)) {
    setPhoneError("Enter a valid 10-digit phone number");
    handleChange("personalDetailsDTO", "phoneNumber", "");
    return;
  }

  setPhoneError("");
  handleChange("personalDetailsDTO", "phoneNumber", cleaned);
};
const handleFirstNameChange = (value) => {
  // allow alphabets and spaces only
  let cleaned = value.replace(/[^A-Za-z\s]/g, "");

  // max 50 characters (safe cap)
  if (cleaned.length > 50) {
    cleaned = cleaned.slice(0, 50);
  }

  handleChange("personalDetailsDTO", "firstName", cleaned);

  const trimmed = cleaned.trim();

  if (trimmed.length > 0 && trimmed.length < 2) {
    setFirstNameError("First Name must contain at least 2 characters");
    return;
  }

  setFirstNameError("");
};
const handleLastNameChange = (value) => {
  // allow alphabets and spaces only
  let cleaned = value.replace(/[^A-Za-z\s]/g, "");

  // restrict to 50 characters
  if (cleaned.length > 50) {
    cleaned = cleaned.slice(0, 50);
    setLastNameError("Last Name cannot exceed 50 characters");
  } else {
    setLastNameError("");
  }

  handleChange("personalDetailsDTO", "lastName", cleaned);
};


  const handleEmailChange = (value) => {
  handleChange("personalDetailsDTO", "emailId", value);

  const trimmed = value.trim();

  // Allow empty while typing
  if (!trimmed) {
    setEmailError("");
    return;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(trimmed)) {
    setEmailError("Enter a valid email address (example@domain.com)");
    return;
  }

  setEmailError("");
};
 
  const handleAddress1Change = (value) => {
  // limit to 200 characters
  if (value.length > 200) {
    setAddress1Error("Current Address cannot exceed 200 characters");
    handleChange(
      "personalDetailsDTO",
      "address1",
      value.slice(0, 200)
    );
    return;
  }

  handleChange("personalDetailsDTO", "address1", value);

  const trimmed = value.trim();

  if (trimmed.length > 0 && trimmed.length < 10) {
    setAddress1Error(
      "Current Address must contain at least 10 characters"
    );
    return;
  }

  setAddress1Error("");
};

const handleEmergencyNameChange = (value) => {
  // allow alphabets and spaces only
  let cleaned = value.replace(/[^A-Za-z\s]/g, "");

  // limit to 50 characters
  if (cleaned.length > 50) {
    cleaned = cleaned.slice(0, 50);
    setEmergencyNameError(
      "Emergency Contact Name cannot exceed 50 characters"
    );
    handleChange("personalDetailsDTO", "emergencyContactName", cleaned);
    return;
  }

  handleChange("personalDetailsDTO", "emergencyContactName", cleaned);

  const trimmed = cleaned.trim();

  if (trimmed.length > 0 && trimmed.length < 2) {
    setEmergencyNameError(
      "Emergency Contact Name must contain at least 2 characters"
    );
    return;
  }

  setEmergencyNameError("");
};



  const handleEmergencyPhoneChange = (value) => {
  // digits only
  const cleaned = value.replace(/\D/g, "");

  // max 10 digits
  if (cleaned.length > 10) return;

  // validate starting digit
  if (cleaned.length === 1 && !/^[6-9]$/.test(cleaned)) {
    setEmergencyPhoneError(
      "Emergency contact number must start with 6, 7, 8, or 9"
    );
    handleChange("personalDetailsDTO", "emergencyPhoneNumber", "");
    return;
  }

  // full validation (10 digits)
  if (cleaned.length === 10 && !/^[6-9][0-9]{9}$/.test(cleaned)) {
    setEmergencyPhoneError(
      "Enter a valid 10-digit emergency contact number"
    );
    handleChange("personalDetailsDTO", "emergencyPhoneNumber", "");
    return;
  }

  setEmergencyPhoneError("");
  handleChange("personalDetailsDTO", "emergencyPhoneNumber", cleaned);
};


  const handleDateOfJoiningChange = (value) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(value);

  if (selectedDate > today) {
    setDateOfJoiningError("Date of Joining cannot be a future date");
    handleChange("jobDetailsDTO", "dateOfJoining", "");
    return;
  }

  setDateOfJoiningError("");
  handleChange("jobDetailsDTO", "dateOfJoining", value);
};

  /* ================= VALIDATE FORM ================= */
  const validateForm = () => {
    const {
      personalDetailsDTO: p,
      jobDetailsDTO: j,
      bankDetailsDTO: b,
      employeeStatutoryDetailsDTO: s,
      salaryDetailsDTO: sal,
    } = form;

    // PERSONAL DETAILS
    if (!p.firstName.trim()) return alert("First Name is required"), false;
    if (!p.lastName.trim()) return alert("Last Name is required"), false;
    if (!p.gender) return alert("Gender is required"), false;
    if (!p.dob) return alert("Date of Birth is required"), false;
    if (!p.nationality) return alert("Nationality is required"), false;
    if (!p.maritalStatus) return alert("Marital Status is required"), false;
if (address1Error) return false;
if (emailError) return false;
if (aadhaarError) return false;
if (dobError) return false;
if (firstNameError) return false;
if (lastNameError) return false;



    if (!/^[2-9][0-9]{11}$/.test(p.aadhaarNumber))
  return alert("Aadhaar number must be 12 digits and not start with 0 or 1"), false;


    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(p.panNumber.toUpperCase()))
      return alert("Invalid PAN format (ABCDE1234F)"), false;

    if (!/^[0-9]{10}$/.test(p.phoneNumber))
      return alert("Phone Number must be 10 digits"), false;

if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(p.emailId))
  return alert("Enter a valid Email Address"), false;


if (!p.address1.trim() || p.address1.trim().length < 10)
  return alert("Current Address must be at least 10 characters"), false;

    if (dateOfJoiningError) return false;

    if (emergencyPhoneError) return false;



    if (!p.emergencyContactName.trim())
      return alert("Emergency Contact Name is required"), false;

    if (!p.emergencyContactRelation)
      return alert("Emergency Contact Relation is required"), false;

    if (!/^[0-9]{10}$/.test(p.emergencyPhoneNumber))
      return alert("Emergency Contact Number must be 10 digits"), false;

    // JOB DETAILS
    if (!j.departmentId || Number(j.departmentId) <= 0)
      return alert("Select a valid Department"), false;

    if (!j.designationId || Number(j.designationId) <= 0)
      return alert("Select a valid Designation"), false;

    if (!j.dateOfJoining)
      return alert("Date of Joining is required"), false;

    if (!j.workLocation.trim())
      return alert("Work Location is required"), false;

    // BANK DETAILS
    if (!b.bankName.trim())
      return alert("Bank Name is required"), false;
    if (!/^[0-9]{9,18}$/.test(b.accountNumber))
      return alert("Account Number must be 9 to 18 digits"), false;

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(b.ifsc.toUpperCase()))
      return alert("Invalid IFSC Code"), false;

    // STATUTORY DETAILS
    if (!s.pfUan || !/^[0-9]{12}$/.test(s.pfUan))
      return alert("Valid PF UAN (12 digits) is required"), false;

    if (!s.esi.trim())
      return alert("ESI Number is required"), false;

    if (!s.min.trim())
      return alert("Medical Insurance Number is required"), false;

    // SALARY DETAILS
    if (!sal.ctc || Number(sal.ctc) <= 0)
      return alert("CTC must be greater than 0"), false;

    // Check if salary has been calculated
    if (!sal.basic || Number(sal.basic) <= 0) {
      alert("Please wait for salary calculation to complete");
      return false;
    }

    return true;
  };
  
  /* ================= ENHANCED SEARCH EMPLOYEE ================= */ 
  const handleSearch = async () => { 
    if (!searchValue.trim()) {
      setMessage("Please enter a search term (employee code, name, email, or phone)");
      return;
    }
    
    try { 
      setSearchLoading(true);
      setMessage(""); 
      setSearchResults([]);
      setSelectedEmployee(null);
      setShowSearchResults(true);
      
      const res = await axios.get(`http://localhost:8080/dept/hr/emp/search?value=${searchValue}`, { 
        withCredentials: true 
      }); 
      
      let results = [];
      if (Array.isArray(res.data)) {
        results = res.data;
      } else if (res.data) {
        results = [res.data];
      }
      
      setSearchResults(results);
      
      if (results.length === 0) {
        setMessage("No employees found. You can create a new one.");
      } else if (results.length === 1) {
        setSelectedEmployee(results[0]);
      }
    } catch (err) { 
      console.error("Search error:", err); 
      setMessage("❌ Failed to search employee."); 
      setSearchResults([]);
      setSelectedEmployee(null);
    } finally {
      setSearchLoading(false);
    } 
  }; 
  
  /* ================= SELECT EMPLOYEE FOR EDITING ================= */ 
  const selectEmployeeForEdit = (employeeData) => { 
    setSelectedEmployee(employeeData);
  }; 
  
  /* ================= LOAD SELECTED EMPLOYEE INTO FORM ================= */ 
  const loadSelectedEmployee = () => { 
    if (!selectedEmployee) {
      setMessage("❌ Please select an employee first.");
      return;
    }
    
    const fetchedUserId = selectedEmployee.ftechUserId?.userid;
    setUserId(fetchedUserId || null); 
    
    setForm({ 
      personalDetailsDTO: { 
        firstName: selectedEmployee.personalDetailsDTO.firstName || "", 
        middleName: selectedEmployee.personalDetailsDTO.middleName || "", 
        lastName: selectedEmployee.personalDetailsDTO.lastName || "", 
        gender: selectedEmployee.personalDetailsDTO.gender || "", 
        dob: selectedEmployee.personalDetailsDTO.dob || "", 
        nationality: selectedEmployee.personalDetailsDTO.nationality || "", 
        maritalStatus: selectedEmployee.personalDetailsDTO.maritalStatus || "", 
        bloodGroup: selectedEmployee.personalDetailsDTO.bloodGroup || "", 
        aadhaarNumber: selectedEmployee.personalDetailsDTO.aadhaarNumber || "", 
        panNumber: selectedEmployee.personalDetailsDTO.panNumber || "", 
        phoneNumber: selectedEmployee.personalDetailsDTO.phoneNumber || "", 
        emailId: selectedEmployee.personalDetailsDTO.emailId || "", 
        address1: selectedEmployee.personalDetailsDTO.address1 || "", 
        address2: selectedEmployee.personalDetailsDTO.address2 || "", 
        emergencyContactName: selectedEmployee.personalDetailsDTO.emergencyContactName || "", 
        emergencyContactRelation: selectedEmployee.personalDetailsDTO.emergencyContactRelation || "", 
        emergencyPhoneNumber: selectedEmployee.personalDetailsDTO.emergencyPhoneNumber || "", 
      }, 
      jobDetailsDTO: { 
        departmentId: selectedEmployee.jobDetailsDTO.departmentId ? selectedEmployee.jobDetailsDTO.departmentId.toString() : "", 
        designationId: selectedEmployee.jobDetailsDTO.designationId ? selectedEmployee.jobDetailsDTO.designationId.toString() : "", 
        workLocation: selectedEmployee.jobDetailsDTO.workLocation || "Bangalore", 
        dateOfJoining: selectedEmployee.jobDetailsDTO.dateOfJoining || "", 
      }, 
      bankDetailsDTO: { 
        bankName: selectedEmployee.bankDetailsDTO.bankName || "", 
        accountNumber: selectedEmployee.bankDetailsDTO.accountNumber ? selectedEmployee.bankDetailsDTO.accountNumber.toString() : "", 
        ifsc: selectedEmployee.bankDetailsDTO.ifsc || "", 
      }, 
      employeeStatutoryDetailsDTO: { 
        pfUan: selectedEmployee.employeeStatutoryDetailsDTO.pfUan || "", 
        esi: selectedEmployee.employeeStatutoryDetailsDTO.esi || "", 
        min: selectedEmployee.employeeStatutoryDetailsDTO.min || "", 
      }, 
      salaryDetailsDTO: { 
        ctc: selectedEmployee.salaryDetailsDTO.ctc ? selectedEmployee.salaryDetailsDTO.ctc.toString() : "", 
        basic: selectedEmployee.salaryDetailsDTO.basic ? selectedEmployee.salaryDetailsDTO.basic.toString() : "", 
        hra: selectedEmployee.salaryDetailsDTO.hra ? selectedEmployee.salaryDetailsDTO.hra.toString() : "", 
        conveyanceAllowance: selectedEmployee.salaryDetailsDTO.conveyanceAllowance ? selectedEmployee.salaryDetailsDTO.conveyanceAllowance.toString() : "", 
        pf: selectedEmployee.salaryDetailsDTO.pf ? selectedEmployee.salaryDetailsDTO.pf.toString() : "", 
      }, 
    }); 
    
    setMode(fetchedUserId ? "edit" : "create");
    setShowSearchResults(false);
    setSelectedEmployee(null);
    setSearchValue("");
    setMessage(fetchedUserId ? `✅ Employee loaded for editing. User ID: ${fetchedUserId}` : "✅ Employee loaded. You can now update the details."); 
  }; 
  
  /* ================= SUBMIT EMPLOYEE ONBOARDING/EDIT ================= */ 
  const submitEmployeeOnboarding = async () => { 
    try { 
      setLoading(true); 
      setMessage(""); 
      
      const payload = { 
        personalDetailsDTO: { 
          firstName: form.personalDetailsDTO.firstName, 
          middleName: form.personalDetailsDTO.middleName || null, 
          lastName: form.personalDetailsDTO.lastName, 
          gender: form.personalDetailsDTO.gender.toUpperCase(), 
          dob: form.personalDetailsDTO.dob, 
          nationality: form.personalDetailsDTO.nationality, 
          maritalStatus: form.personalDetailsDTO.maritalStatus.toUpperCase(), 
          bloodGroup: form.personalDetailsDTO.bloodGroup, 
          aadhaarNumber: form.personalDetailsDTO.aadhaarNumber, 
          panNumber: form.personalDetailsDTO.panNumber.toUpperCase(), 
          phoneNumber: form.personalDetailsDTO.phoneNumber, 
          emailId: form.personalDetailsDTO.emailId, 
          address1: form.personalDetailsDTO.address1, 
          address2: form.personalDetailsDTO.address2, 
          emergencyContactName: form.personalDetailsDTO.emergencyContactName, 
          emergencyContactRelation: form.personalDetailsDTO.emergencyContactRelation || null, 
          emergencyPhoneNumber: form.personalDetailsDTO.emergencyPhoneNumber, 
        }, 
        jobDetailsDTO: { 
          departmentId: Number(form.jobDetailsDTO.departmentId), 
          designationId: Number(form.jobDetailsDTO.designationId), 
          workLocation: form.jobDetailsDTO.workLocation, 
          dateOfJoining: form.jobDetailsDTO.dateOfJoining, 
        }, 
        salaryDetailsDTO: { 
          ctc: Number(form.salaryDetailsDTO.ctc), 
          basic: Number(form.salaryDetailsDTO.basic), 
          hra: Number(form.salaryDetailsDTO.hra), 
          conveyanceAllowance: Number(form.salaryDetailsDTO.conveyanceAllowance), 
          pf: form.salaryDetailsDTO.pf ? Number(form.salaryDetailsDTO.pf) : null, 
        }, 
        bankDetailsDTO: { 
          bankName: form.bankDetailsDTO.bankName, 
          accountNumber: form.bankDetailsDTO.accountNumber, 
          ifsc: form.bankDetailsDTO.ifsc, 
        }, 
        employeeStatutoryDetailsDTO: { 
          pfUan: form.employeeStatutoryDetailsDTO.pfUan || null, 
          esi: form.employeeStatutoryDetailsDTO.esi || null, 
          min: form.employeeStatutoryDetailsDTO.min || null, 
        } 
      }; 
      
      console.log("Submitting employee payload:", JSON.stringify(payload, null, 2)); 
      
      let response; 
      if (mode === "create") { 
        response = await axios.post( 
          "http://localhost:8080/dept/hr/onboarding", 
          payload, 
          { 
            withCredentials: true, 
            headers: { 
              'Content-Type': 'application/json' 
            } 
          } 
        ); 
        console.log("Employee onboarding response:", response.data); 
        
        return { 
          success: true,
          message: "Employee onboarded successfully",
          data: response.data
        };
        
      } else { 
        if (!userId) {
          throw new Error("User ID is required for editing");
        }
        
        response = await axios.put( 
          `http://localhost:8080/dept/hr/employee/edit?userId=${userId}`, 
          payload, 
          { 
            withCredentials: true, 
            headers: { 
              'Content-Type': 'application/json' 
            } 
          } 
        ); 
        console.log("Employee edit response:", response.data); 
        
        return { 
          success: true,
          message: "Employee details updated successfully",
          data: response.data
        };
      } 
    } catch (err) { 
      console.error("Employee submission error:", err); 
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message; 
      throw new Error(`Employee submission failed: ${errorMessage}`); 
    } finally {
      setLoading(false);
    }
  }; 
  
  /* ================= MAIN SUBMIT FUNCTION ================= */ 
  const submitEmployee = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setMessage(`Processing ${mode === "create" ? "new" : "updated"} employee...`);

      const result = await submitEmployeeOnboarding();
      
      // Show success message
      setMessage(`✅ ${result.message}`);
      
      // Handle response based on mode
      if (mode === "create") {
        // For create mode, reset the form
        setTimeout(() => {
          resetForm();
        }, 1500);
      } else {
        // For edit mode, stay in edit mode and keep the form data
        setMode("edit");
      }

    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  /* ================= RESET FORM ================= */ 
  const resetForm = () => { 
    setForm({ 
      personalDetailsDTO: { 
        firstName: "", 
        middleName: "", 
        lastName: "", 
        gender: "", 
        dob: "", 
        nationality: "", 
        maritalStatus: "", 
        bloodGroup: "", 
        aadhaarNumber: "", 
        panNumber: "", 
        phoneNumber: "", 
        emailId: "", 
        address1: "", 
        address2: "", 
        emergencyContactName: "", 
        emergencyContactRelation: "", 
        emergencyPhoneNumber: "", 
      }, 
      jobDetailsDTO: { 
        departmentId: "", 
        designationId: "", 
        workLocation: "Bangalore", 
        dateOfJoining: "", 
      }, 
      bankDetailsDTO: { 
        bankName: "", 
        accountNumber: "", 
        ifsc: "", 
      }, 
      employeeStatutoryDetailsDTO: { 
        pfUan: "", 
        esi: "", 
        min: "", 
      }, 
      salaryDetailsDTO: { 
        ctc: "", 
        basic: "", 
        hra: "", 
        conveyanceAllowance: "", 
        pf: "", 
      }, 
    }); 
    setMode("create"); 
    setUserId(null); 
    setSearchValue(""); 
    setSearchResults([]);
    setSelectedEmployee(null);
    setShowSearchResults(false);
    setNetSalary(0);
    setMessage(""); 
  }; 
  
  /* ================= CREATE NEW EMPLOYEE ================= */ 
  const startNewEmployee = () => {
    resetForm();
    setMode("create");
    setMessage("Ready to create new employee. Fill in the details below.");
  };
  
  return ( 
    <div className="employee-create"> 
      <div className="employee-card"> 
        <div className="header-section"> 
          <h2>{mode === "create" ? "Create Employee" : "Edit Employee"}</h2> 
          <div className="header-actions">
             <button className="reset-btn" onClick={resetForm} disabled={loading}> 
              Reset Form 
            </button> 
          </div>
        </div> 
        
        {/* ENHANCED SEARCH SECTION */} 
        <section className="form-section search-section"> 
          <h4>Search & Edit Employee</h4> 
          <div className="search-container">
            <div className="search-input-group">
              <input 
                value={searchValue} 
                onChange={(e) => setSearchValue(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by Employee Code and Name" 
                className="search-input"
                disabled={loading}
              />
              <button className="search-btn" onClick={handleSearch} disabled={loading || searchLoading}>
                {searchLoading ? "Searching..." : "🔍 Search"}
              </button>
              <button className="clear-search-btn" onClick={() => {
                setSearchValue("");
                setSearchResults([]);
                setSelectedEmployee(null);
                setShowSearchResults(false);
              }} disabled={loading}>
                Clear
              </button>
            </div>
            
            {showSearchResults && searchResults.length > 0 && (
              <>
                <div className="search-results">
                  <div className="search-results-header">
                    <h5>Search Results ({searchResults.length})</h5>
                    <button className="close-results" onClick={() => setShowSearchResults(false)}>×</button>
                  </div>
                  <div className="results-list">
                    {searchResults.map((employee, index) => (
                      <div 
                        key={index} 
                        className={`result-item ${selectedEmployee === employee ? 'selected' : ''}`}
                        onClick={() => selectEmployeeForEdit(employee)}
                      >
                        <div className="result-info">
                          <strong>{employee.personalDetailsDTO?.firstName} {employee.personalDetailsDTO?.lastName}</strong>
                          <div className="result-details">
                            <span>ID: {employee.ftechUserId?.userid || 'N/A'}</span>
                            <span>Email: {employee.personalDetailsDTO?.emailId}</span>
                            <span>Phone: {employee.personalDetailsDTO?.phoneNumber}</span>
                            <span>Dept: {departments.find(d => d.id === employee.jobDetailsDTO?.departmentId)?.departmentName || 'N/A'}</span>
                          </div>
                        </div>
                        <div className="selection-indicator">
                          {selectedEmployee === employee ? '✓ Selected' : 'Click to select'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* EDIT OPTIONS BELOW SEARCH RESULTS */}
                {selectedEmployee && (
                  <div className="edit-options-panel">
                    <div className="selected-employee-info">
                      <h5>Selected Employee</h5>
                      <div className="selected-details">
                        <span><strong>Name:</strong> {selectedEmployee.personalDetailsDTO?.firstName} {selectedEmployee.personalDetailsDTO?.lastName}</span>
                        <span><strong>ID:</strong> {selectedEmployee.ftechUserId?.userid || 'N/A'}</span>
                        <span><strong>Department:</strong> {departments.find(d => d.id === selectedEmployee.jobDetailsDTO?.departmentId)?.departmentName || 'N/A'}</span>
                        <span><strong>Designation:</strong> {designations.find(d => d.id === selectedEmployee.jobDetailsDTO?.designationId)?.designationName || 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="edit-action-buttons">
                      <button 
                        className="load-edit-btn"
                        onClick={loadSelectedEmployee}
                        disabled={loading}
                      >
                        📝 Load for Editing
                      </button>
                      <button 
                        className="cancel-edit-btn"
                        onClick={() => setSelectedEmployee(null)}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <div className="edit-note">
                        <small>Click "Load for Editing" to load this employee's details into the form below</small>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            
            {showSearchResults && searchResults.length === 0 && !searchLoading && (
              <div className="no-results">
                <p>No employees found. Would you like to create a new one?</p>
                <button className="create-new-btn" onClick={startNewEmployee} disabled={loading}>
                  Create New Employee
                </button>
              </div>
            )}
          </div>
          
          <div className="search-hint">
            <small>Tip: Search for an employee, select from results, then click "Load for Editing"</small>
          </div>
        </section> 
        
        {/* EMPLOYEE MODE INDICATOR */}
        {mode && (
          <div className={`mode-indicator ${mode}`}>
            {mode === 'create' ? 'Creating New Employee' : `Editing Employee - User ID: ${userId || 'Not loaded'}`}
          </div>
        )}
        
        {/* PERSONAL DETAILS */} 
        <section className="form-section"> 
          <h4>Personal Details</h4> 
          <div className="form-grid"> 
            <div className="input-group">
  <label>
    First Name <span className="required-star"></span>
  </label>

  <input
    value={form.personalDetailsDTO.firstName}
    onChange={(e) => handleFirstNameChange(e.target.value)}
    maxLength={50}
    required
    disabled={loading}
  />

  {firstNameError && (
    <small className="error-text">{firstNameError}</small>
  )}
</div>

            <div className="input-group"> 
              <label>Middle Name</label> 
              <input 
                value={form.personalDetailsDTO.middleName} 
                onChange={(e)=>handleChange("personalDetailsDTO","middleName",e.target.value)} 
                disabled={loading}
              /> 
            </div> 
<div className="input-group">
  <label>
    Last Name <span className="required-star"></span>
  </label>

  <input
    value={form.personalDetailsDTO.lastName}
    onChange={(e) => handleLastNameChange(e.target.value)}
    maxLength={50}
    required
    disabled={loading}
  />

  {lastNameError && (
    <small className="error-text">{lastNameError}</small>
  )}
</div>

            <div className="input-group"> 
              <label>Gender </label> 
              <select 
                value={form.personalDetailsDTO.gender} 
                onChange={(e)=>handleChange("personalDetailsDTO","gender",e.target.value)} 
                required 
                disabled={loading}
              > 
                <option value="">Select Gender</option> 
                <option value="Male">Male</option> 
                <option value="Female">Female</option> 
                <option value="Other">Other</option> 
              </select> 
            </div> 
<div className="input-group">
  <label>
    Date of Birth <span className="required-star"></span>
  </label>

  <input
    type="date"
    value={form.personalDetailsDTO.dob}
    onChange={(e) => handleDobChange(e.target.value)}
    max={new Date().toISOString().split("T")[0]}
    required
    disabled={loading}
  />
  

  {dobError && (
    <small className="error-text">{dobError}</small>
  )}
</div>

            <div className="input-group">
              <label>
                Nationality <span className="required-star"></span>
              </label>
              <select
                value={form.personalDetailsDTO.nationality}
                onChange={(e) =>
                  handleChange("personalDetailsDTO", "nationality", e.target.value)
                }
                required
                disabled={loading}
              >
                <option value="">Select Nationality</option>
                <option value="Indian">Indian</option>
                <option value="American">American</option>
                <option value="British">British</option>
                <option value="Canadian">Canadian</option>
                <option value="Australian">Australian</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-group"> 
              <label>Marital Status </label> 
              <select 
                value={form.personalDetailsDTO.maritalStatus} 
                onChange={(e)=>handleChange("personalDetailsDTO","maritalStatus",e.target.value)} 
                required 
                disabled={loading}
              > 
                <option value="">Select Status</option> 
                <option value="Single">Single</option> 
                <option value="Married">Married</option> 
                <option value="Divorced">Divorced</option> 
                <option value="Widowed">Widowed</option> 
              </select> 
            </div> 
            <div className="input-group"> 
              <label>Blood Group</label> 
              <select 
                value={form.personalDetailsDTO.bloodGroup} 
                onChange={(e)=>handleChange("personalDetailsDTO","bloodGroup",e.target.value)} 
                disabled={loading}
              > 
                <option value="">Select Blood Group</option> 
                <option value="A+">A+</option> 
                <option value="A-">A-</option> 
                <option value="B+">B+</option> 
                <option value="B-">B-</option> 
                <option value="AB+">AB+</option> 
                <option value="AB-">AB-</option> 
                <option value="O+">O+</option> 
                <option value="O-">O-</option> 
              </select> 
            </div> 
            
<div className="input-group">
  <label>
    Aadhaar Number 
  </label>

  <input
    value={form.personalDetailsDTO.aadhaarNumber}
    onChange={(e) => handleAadhaarChange(e.target.value)}
    maxLength={12}
    placeholder="12-digit Aadhaar"
    inputMode="numeric"
    required
    disabled={loading}
  />

  {aadhaarError && (
    <small className="error-text">{aadhaarError}</small>
  )}
</div>

            
            <div className="input-group"> 
              <label>PAN Number </label> 
              <input
                value={form.personalDetailsDTO.panNumber}
                onChange={(e) => {
                  let value = e.target.value.toUpperCase();
                  value = value.replace(/[^A-Z0-9]/g, "");

                  if (value.length <= 5) {
                    value = value.replace(/[^A-Z]/g, "");
                  } else if (value.length <= 9) {
                    value =
                      value.slice(0, 5).replace(/[^A-Z]/g, "") +
                      value.slice(5).replace(/[^0-9]/g, "");
                  } else {
                    value =
                      value.slice(0, 5).replace(/[^A-Z]/g, "") +
                      value.slice(5, 9).replace(/[^0-9]/g, "") +
                      value.slice(9, 10).replace(/[^A-Z]/g, "");
                  }

                  handleChange("personalDetailsDTO", "panNumber", value);
                }}
                maxLength={10}
                placeholder="ABCDE1234F"
                required
                disabled={loading}
              />
            </div> 
         <div className="input-group">
  <label>
    Phone Number 
  </label>

  <input
    value={form.personalDetailsDTO.phoneNumber}
    onChange={(e) => handlePhoneNumberChange(e.target.value)}
    maxLength={10}
    placeholder="10-digit number starting with 6-9"
    inputMode="numeric"
    required
    disabled={loading}
  />

  {phoneError && (
    <small className="error-text">{phoneError}</small>
  )}
</div>
 
            <div className="input-group">

  <label>
    Email <span className="required-star"></span>
  </label>

  <input
    type="email"
    value={form.personalDetailsDTO.emailId}
    onChange={(e) => handleEmailChange(e.target.value)}
    onBlur={(e) => validateEmail(e.target.value)}   // ✅ validate here
    maxLength={50}
    placeholder="example@domain.com"
    required
    disabled={loading}
  />

  {emailError && (
    <small className="error-text">{emailError}</small>
  )}
</div>


<div className="input-group full-width">
  <label>
    Current Address (Address1) <span className="required-star"></span>
  </label>

  <textarea
    value={form.personalDetailsDTO.address1}
    onChange={(e) => handleAddress1Change(e.target.value)}
    rows="3"
    maxLength={200}   // 🔒 HARD LIMIT
    placeholder="Enter current address (10–200 characters)"
    required
    disabled={loading}
  />

  {address1Error && (
    <small className="error-text">{address1Error}</small>
  )}
</div>

            <div className="input-group full-width"> 
              <label>Permanent Address (Address2)</label> 
              <textarea 
                value={form.personalDetailsDTO.address2} 
                onChange={(e)=>handleChange("personalDetailsDTO","address2",e.target.value)} 
                rows="3" 
                placeholder="Permanent address" 
                disabled={loading}
              /> 
            </div> 
           <div className="input-group">
  <label>
    Emergency Contact Name <span className="required-star"></span>
  </label>

  <input
    value={form.personalDetailsDTO.emergencyContactName}
    onChange={(e) => handleEmergencyNameChange(e.target.value)}
    placeholder="Enter emergency contact name"
    maxLength={50}
    required
    disabled={loading}
  />

  {emergencyNameError && (
    <small className="error-text">{emergencyNameError}</small>
  )}
</div>


            <div className="input-group"> 
              <label>Emergency Contact Relation </label> 
              <select 
                value={form.personalDetailsDTO.emergencyContactRelation} 
                onChange={(e)=>handleChange("personalDetailsDTO","emergencyContactRelation",e.target.value)} 
                required 
                disabled={loading}
              > 
                <option value="">Select Relation</option> 
                <option value="Father">Father</option> 
                <option value="Mother">Mother</option> 
                <option value="Spouse">Spouse</option> 
                <option value="Son">Son</option> 
                <option value="Daughter">Daughter</option> 
                <option value="Brother">Brother</option> 
                <option value="Sister">Sister</option> 
                <option value="Friend">Friend</option> 
                <option value="Other">Other</option> 
              </select> 
            </div> 
           <div className="input-group">
  <label>
    Emergency Contact Number <span className="required-star"> </span>
  </label>

  <input
    value={form.personalDetailsDTO.emergencyPhoneNumber}
    onChange={(e) => handleEmergencyPhoneChange(e.target.value)}
    maxLength="10"
    placeholder="10-digit number starting with 6-9"
    inputMode="numeric"
    required
    disabled={loading}
  />

  {emergencyPhoneError && (
    <small className="error-text">{emergencyPhoneError}</small>
  )}
</div>

          </div> 
        </section> 
        
        {/* JOB DETAILS */} 
        <section className="form-section"> 
          <h4>Job Details</h4> 
          <div className="form-grid"> 
            <div className="input-group"> 
              <label>Department </label> 
              <select 
                value={form.jobDetailsDTO.departmentId} 
                onChange={(e) => handleChange("jobDetailsDTO", "departmentId", e.target.value)} 
                required 
                disabled={loading}
              > 
                <option value="">Select Department</option> 
                {departments.map((dept) => ( 
                  <option key={dept.id} value={dept.id}> 
                    {dept.departmentName} 
                  </option> 
                ))} 
              </select> 
            </div> 
            <div className="input-group"> 
              <label>Designation </label> 
              <select 
                value={form.jobDetailsDTO.designationId} 
                onChange={(e) => handleChange("jobDetailsDTO", "designationId", e.target.value)} 
                required 
                disabled={loading}
              > 
                <option value="">Select Designation</option> 
                {designations.map((des) => ( 
                  <option key={des.id} value={des.id}> 
                    {des.designationName} 
                  </option> 
                ))} 
              </select> 
            </div> 
            <div className="input-group">
  <label>
    Date of Joining <span className="required-star">*</span>
  </label>

  <input
    type="date"
    value={form.jobDetailsDTO.dateOfJoining}
    onChange={(e) => handleDateOfJoiningChange(e.target.value)}
    max={new Date().toISOString().split("T")[0]}  // ❌ future blocked
    required
    disabled={loading}
  />

  {dateOfJoiningError && (
    <small className="error-text">{dateOfJoiningError}</small>
  )}
</div>

            <div className="input-group"> 
              <label>Work Location </label> 
              <input 
                value={form.jobDetailsDTO.workLocation} 
                onChange={(e) => handleChange("jobDetailsDTO", "workLocation", e.target.value)} 
                required 
                disabled={loading}
              /> 
            </div> 
          </div> 
        </section> 
        
        {/* BANK DETAILS */} 
        <section className="form-section"> 
          <h4>Bank Details</h4> 
          <div className="form-grid"> 
            <div className="input-group"> 
              <label>Bank Name </label> 
              <input 
                value={form.bankDetailsDTO.bankName} 
                onChange={(e)=>handleChange("bankDetailsDTO","bankName",e.target.value)} 
                required 
                placeholder="e.g., State Bank of India" 
                disabled={loading}
              /> 
            </div> 
            <div className="input-group"> 
              <label>Account Number </label> 
              <input
                value={form.bankDetailsDTO.accountNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 18) {
                    handleChange("bankDetailsDTO", "accountNumber", value);
                  }
                }}
                maxLength={18}
                placeholder="Bank Account Number"
                inputMode="numeric"
                required
                disabled={loading}
              />
            </div> 
            <div className="input-group"> 
              <label>IFSC Code </label> 
              <input
                value={form.bankDetailsDTO.ifsc}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
                  if (value.length <= 11) {
                    handleChange("bankDetailsDTO", "ifsc", value);
                  }
                }}
                maxLength={11}
                placeholder="SBIN0001234"
                required
                disabled={loading}
              />
            </div> 
          </div> 
        </section> 
        
        {/* STATUTORY DETAILS */}
        <section className="form-section statutory-section">
          <h4>Statutory Details</h4>
          <div className="statutory-grid">
            <div className="input-group">
              <label>
                Provident Fund UAN <span className="required-star"></span>
              </label>
              <input
                value={form.employeeStatutoryDetailsDTO.pfUan}
                onChange={(e) =>
                  handleChange("employeeStatutoryDetailsDTO", "pfUan", e.target.value)
                }
                placeholder="12-digit UAN number"
                maxLength="12"
                required
                inputMode="numeric"
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>
                ESI Number <span className="required-star"></span>
              </label>
              <input
                value={form.employeeStatutoryDetailsDTO.esi}
                onChange={(e) =>
                  handleChange("employeeStatutoryDetailsDTO", "esi", e.target.value)
                }
                placeholder="Employees' State Insurance number"
                maxLength={10}
                inputMode="numeric"
                required
                disabled={loading}
              />
            </div>

            <div className="input-group statutory-full">
              <label>
                Medical Insurance Number <span className="required-star"></span>
              </label>
              <input
                value={form.employeeStatutoryDetailsDTO.min}
                onChange={(e) =>
                  handleChange("employeeStatutoryDetailsDTO", "min", e.target.value)
                }
                placeholder="Medical Insurance number"
                maxLength={20}
                required
                disabled={loading}
              />
            </div>
          </div>
        </section>

        {/* SALARY DETAILS - UPDATED VERSION */} 
        <section className="form-section"> 
          <h4>Salary Details</h4> 
          <div className="salary-info"> 
            <p className="percentage-info"> 
              <strong>Dynamic Salary Percentages (from API):</strong> 
              <br /> 
              Basic: <span className="percentage-value">{percentages?.basic || 0}%</span> of CTC, 
              HRA: <span className="percentage-value">{percentages?.hra || 0}%</span> of Basic, 
              PF: <span className="percentage-value">{percentages?.pf || 0}%</span> of Basic 
            </p> 
            <p className="formula-info"> 
              <strong>Formulas:</strong> 
              Basic = CTC × {percentages?.basic || 0}% | 
              HRA = Basic × {percentages?.hra || 0}% | 
              PF = Basic × {percentages?.pf || 0}% | 
              Net Salary = CTC - PF 
            </p> 
          </div> 
          <div className="form-grid"> 
            <div className="input-group full-width"> 
              <label>
                CTC (Cost to Company) <span className="required-star">*</span>
              </label>
              <div className="ctc-input-group"> 
                <input 
                  type="number" 
                  value={form.salaryDetailsDTO.ctc} 
                  onChange={(e)=>handleChange("salaryDetailsDTO","ctc",e.target.value)} 
                  required 
                  min="0" 
                  step="1000" 
                  placeholder="Enter annual CTC" 
                  disabled={loading}
                /> 
                <div className="auto-calculation-note">
                  <small>Salary auto-calculates when you enter CTC</small>
                </div>
              </div> 
            </div> 
            <div className="input-group"> 
              <label>Basic Salary <span className="required-star">*</span></label> 
              <input 
                type="number" 
                value={form.salaryDetailsDTO.basic} 
                readOnly 
                disabled={loading}
                className="calculated-field"
              /> 
            </div> 
            <div className="input-group"> 
              <label>HRA <span className="required-star">*</span></label> 
              <input 
                type="number" 
                value={form.salaryDetailsDTO.hra} 
                readOnly 
                disabled={loading}
                className="calculated-field"
              /> 
            </div> 
            <div className="input-group"> 
              <label>PF <span className="required-star">*</span> </label> 
              <input 
                type="number" 
                value={form.salaryDetailsDTO.pf} 
                readOnly 
                disabled={loading}
                className="calculated-field"
              /> 
            </div> 
            <div className="input-group"> 
              <label>Conveyance Allowance <span className="required-star">*</span></label> 
              <input 
                type="number" 
                value={form.salaryDetailsDTO.conveyanceAllowance} 
                readOnly 
                disabled={loading}
                className="calculated-field"
              /> 
            </div> 
            <div className="input-group net-salary"> 
              <label>Net Salary (Annual)<span className="required-star">*</span> </label> 
              <input 
                type="number" 
                value={netSalary} 
                readOnly 
                disabled={loading}
                className="net-salary-field"
              /> 
              <div className="salary-note">
                <small>Net = CTC - PF</small>
              </div>
            </div> 
          </div> 
        </section> 
        
        <div className="action-buttons"> 
          <button className="submit-btn" onClick={submitEmployee} disabled={loading}> 
            {loading ? ( 
              <> 
                <span className="spinner"></span> 
                {mode === "create" ? "Creating Employee..." : "Updating Employee..."} 
              </> 
            ) : (mode === "create" ? "Submit" : "Update Employee")} 
          </button> 
        </div> 
        
        {message && ( 
          <div className={`form-message ${message.includes('✅') ? 'success' : message.includes('❌') ? 'error' : 'info'}`}> 
            {message} 
          </div> 
        )} 
      </div> 
    </div> 
  ); 
}