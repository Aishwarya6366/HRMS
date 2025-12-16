import React, { useState, useEffect } from "react";
import "./Register.css";
import Attendance from "./Attendance";
import { validators } from "./utils/validation";
import LeaveManagement from "./Leave/LeaveManagement";



const Register = ({ setIsRegister }) => {
  const [employeeType, setEmployeeType] = useState("fresher");
  const [activeTab, setActiveTab] = useState("personal");
  const [showEmployeeMenu, setShowEmployeeMenu] = useState(false);
  const [errors, setErrors] = useState({}); // ADDED: Error state

  const [user, setUser] = useState({
    // Personal Info
    firstName: "",
    middleName: "",
    lastName: "",
    fullName: "",
    gender: "",
    dob: "",
    nationality: "Indian",
    maritalStatus: "",
    bloodGroup: "",
    aadhaar: "",
    pan: "",
    personalEmail: "",
    personalMobile: "",
    permanentAddress: "",
    currentAddress: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyMobile: "",
    photo: null,

    // Job Details
    employeeId: "",
    dateOfJoining: "",
    department: "",
    designation: "",
    reportingManager: "",
    employmentType: "Full-time",
    workLocation: "",
    officialEmail: "",

    // Salary / Bank
    ctc: "",
    basicPay: "",
    hra: "",
    otherAllowances: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
    pfEligibility: "",
    esiEligibility: "",
    pfNumber: "",
    uanNumber: "",

    // Education Details (Fresher)
    tenthCertificate: null,
    twelfthCertificate: null,
    graduationCertificate: null,
    postGraduationCertificate: null,
    collegeName: "",
    yearOfPassing: "",
    percentage: "",

    // Fresher Documents
    resume: null,
    govtId: null,
    govtIdType: "",

    // Experience Details (Experienced)
    previousCompanyName: "",
    previousDesignation: "",
    experienceFromDate: "",
    experienceToDate: "",
    lastDrawnSalary: "",
    reasonForLeaving: "",
    experienceLetter: null,
    relievingLetter: null,
    payslips: null,

    // Experienced Optional Documents
    certifications: null,
    awards: null,
    professionalMembershipIds: null,
  });

  const [previewPhoto, setPreviewPhoto] = useState(null);

  // Auto-calculate Basic and HRA from CTC
  useEffect(() => {
    if (user.ctc) {
      const ctcValue = parseFloat(user.ctc) || 0;
      const basic = (ctcValue * 0.4).toFixed(2);
      const hra = (ctcValue * 0.2).toFixed(2);
      const allowances = (ctcValue * 0.1).toFixed(2);
      
      setUser((prev) => ({
        ...prev,
        basicPay: basic,
        hra: hra,
        otherAllowances: allowances,
      }));
    }
  }, [user.ctc]);

  // ADDED: Validate single field
  const validateField = (name, value) => {
    let error = null;
    
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'emergencyName':
        error = validators.name(value);
        break;
      case 'aadhaar':
        error = validators.uid(value);
        break;
      case 'pan':
        error = validators.panNumber(value);
        break;
      case 'gender':
        error = validators.gender(value);
        break;
      case 'nationality':
        error = validators.nationality(value);
        break;
      case 'maritalStatus':
        error = validators.maritalStatus(value);
        break;
      case 'dob':
        error = validators.dateOfBirth(value);
        break;
      case 'personalEmail':
        error = validators.email(value);
        break;
      case 'personalMobile':
      case 'emergencyMobile':
        error = validators.mobileNumber(value);
        break;
      case 'bloodGroup':
        error = validators.bloodGroup(value);
        break;
      case 'permanentAddress':
      case 'currentAddress':
        error = validators.address(value, name === 'permanentAddress' ? 'Permanent Address' : 'Current Address');
        break;
      case 'emergencyRelation':
        error = validators.emergencyRelation(value);
        break;
      case 'collegeName':
        if (employeeType === 'fresher' && (!value || value.trim() === '')) {
          error = 'College/University Name is required';
        }
        break;
      case 'previousCompanyName':
        if (employeeType === 'experienced' && (!value || value.trim() === '')) {
          error = 'Previous Company Name is required';
        }
        break;
      default:
        error = null;
    }
    
    return error;
  };

  // ADDED: Clear specific field error
  const clearFieldError = (fieldName) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: null
    }));
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    
    if (type === "file") {
      if (name === "photo") {
        setUser({ ...user, photo: files[0] });
        setPreviewPhoto(URL.createObjectURL(files[0]));
      } else {
        setUser({ ...user, [name]: files[0] });
      }
    } else {
      setUser({ ...user, [name]: value });
      // ADDED: Clear error when user starts typing
      clearFieldError(name);
    }
  };

  // ADDED: Handle blur for validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const copyAddress = () => {
    setUser({ ...user, currentAddress: user.permanentAddress });
    // ADDED: Clear error when copying address
    clearFieldError('currentAddress');
  };

  // ADDED: Enhanced validation function
  const validateCurrentTab = () => {
    const newErrors = {};
    
    if (activeTab === 'personal') {
      // Validate personal information fields
      const fieldsToValidate = [
        'firstName', 'lastName', 'gender', 'dob', 'nationality',
        'maritalStatus', 'aadhaar', 'pan', 'personalEmail',
        'personalMobile', 'permanentAddress', 'currentAddress',
        'emergencyName', 'emergencyRelation', 'emergencyMobile'
      ];
      
      fieldsToValidate.forEach(field => {
        const error = validateField(field, user[field]);
        if (error) newErrors[field] = error;
      });
      
    } else if (activeTab === 'job') {
      // Validate job details
      if (!user.dateOfJoining) newErrors.dateOfJoining = 'Date of Joining is required';
      if (!user.department) newErrors.department = 'Department is required';
      if (!user.designation) newErrors.designation = 'Designation is required';
      if (!user.reportingManager) newErrors.reportingManager = 'Reporting Manager is required';
      if (!user.workLocation) newErrors.workLocation = 'Work Location is required';
      
    } else if (activeTab === 'salary') {
      // Validate salary & bank
      if (!user.ctc) newErrors.ctc = 'CTC is required';
      if (!user.bankName) newErrors.bankName = 'Bank Name is required';
      if (!user.accountNumber) newErrors.accountNumber = 'Account Number is required';
      if (!user.ifscCode) newErrors.ifscCode = 'IFSC Code is required';
      if (!user.branchName) newErrors.branchName = 'Branch Name is required';
      if (!user.pfEligibility) newErrors.pfEligibility = 'PF Eligibility is required';
      if (!user.esiEligibility) newErrors.esiEligibility = 'ESI Eligibility is required';
      
    } else if (activeTab === 'education' && employeeType === 'fresher') {
      // Validate education details for fresher
      if (!user.collegeName) newErrors.collegeName = 'College/University Name is required';
      if (!user.yearOfPassing) newErrors.yearOfPassing = 'Year of Passing is required';
      if (!user.percentage) newErrors.percentage = 'Percentage/Grade is required';
      if (!user.tenthCertificate) newErrors.tenthCertificate = '10th Certificate is required';
      if (!user.twelfthCertificate) newErrors.twelfthCertificate = '12th Certificate is required';
      if (!user.graduationCertificate) newErrors.graduationCertificate = 'Graduation Certificate is required';
      if (!user.resume) newErrors.resume = 'Resume is required';
      if (!user.govtIdType) newErrors.govtIdType = 'Government ID Type is required';
      if (!user.govtId) newErrors.govtId = 'Government ID is required';
      
    } else if (activeTab === 'experience' && employeeType === 'experienced') {
      // Validate experience details
      if (!user.previousCompanyName) newErrors.previousCompanyName = 'Previous Company Name is required';
      if (!user.previousDesignation) newErrors.previousDesignation = 'Previous Designation is required';
      if (!user.experienceFromDate) newErrors.experienceFromDate = 'From Date is required';
      if (!user.experienceToDate) newErrors.experienceToDate = 'To Date is required';
      if (!user.lastDrawnSalary) newErrors.lastDrawnSalary = 'Last Drawn Salary is required';
      if (!user.reasonForLeaving) newErrors.reasonForLeaving = 'Reason for Leaving is required';
      if (!user.experienceLetter) newErrors.experienceLetter = 'Experience Letter is required';
      if (!user.relievingLetter) newErrors.relievingLetter = 'Relieving Letter is required';
      if (!user.payslips) newErrors.payslips = 'Payslips are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerEmployee = (e) => {
    e.preventDefault();
    
    // ADDED: Validate current tab before proceeding
    if (!validateCurrentTab()) {
      alert("Please fix the validation errors before proceeding.");
      return;
    }
    
    // ADDED: Final validation before submission
    if (!validateForm()) return;
    
    console.log("Employee Registered:", user);
    alert("✅ Employee Registered Successfully!");
  };

  // ADDED: Navigation with validation
  const navigateToTab = (targetTab) => {
    if (!validateCurrentTab()) {
      alert("Please fix the validation errors before proceeding to the next tab.");
      return;
    }
    setActiveTab(targetTab);
    setErrors({}); // Clear errors when changing tabs
  };

  const validateForm = () => {
    if (!user.firstName || !user.lastName) {
      alert("Please enter first and last name");
      return false;
    }
    
    if (!user.aadhaar || user.aadhaar.length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar number");
      return false;
    }
    
    // Fresher validation
    if (employeeType === "fresher") {
      if (!user.collegeName || !user.yearOfPassing) {
        alert("Please fill all educational details");
        return false;
      }
    }
    
    // Experienced validation
    if (employeeType === "experienced") {
      if (!user.previousCompanyName || !user.experienceFromDate) {
        alert("Please fill previous work experience details");
        return false;
      }
    }
    
    return true;
  };

  return (
    <div className="register-container">
      {/* Header */}
      <div className="portal-header">
        <div className="header-left">
          <h1>Employee Registration Portal</h1>
        </div>
        <button className="back-btn" onClick={() => setIsRegister(false)}>
          ← Back to Login
        </button>
      </div>

      <div className="main-content">
        {/* Left Sidebar */}
        <div className="sidebar">
          {/* Toggle Header */}
          <div 
            className="employee-menu-header"
            onClick={() => setShowEmployeeMenu(!showEmployeeMenu)}
          >
            <span className="menu-icon">☰</span>
            <h3 className="sidebar-title">Select Employee Type</h3>
          </div>

          {/* Animated Slide Menu */}
          <div 
            className={`employee-type-selector slide-menu ${
              showEmployeeMenu ? "open" : "closed"
            }`}
          >
            <div 
              className={`type-option ${employeeType === "fresher" ? "selected" : ""}`}
              onClick={() => setEmployeeType("fresher")}
            >
              <div className="option-icon">🎓</div>
              <div className="option-content">
                <h4>Fresher Employee</h4>
                <p className="option-description">New graduate with no prior work experience</p>
              </div>
            </div>

            <div 
              className={`type-option ${employeeType === "experienced" ? "selected" : ""}`}
              onClick={() => setEmployeeType("experienced")}
            >
              <div className="option-icon">💼</div>
              <div className="option-content">
                <h4>Experienced Employee</h4>
                <p className="option-description">Has prior work experience</p>
              </div>
            </div>

            <div 
              className={`type-option ${employeeType === "attendance" ? "selected" : ""}`}
              onClick={() => setEmployeeType("attendance")}
            >
              <div className="option-icon">🕒</div>
              <div className="option-content">
                <h4>Attendance</h4>
                <p className="option-description">Daily attendance entry</p>
              </div>
            </div>
            <div
  className={`type-option ${employeeType === "leave" ? "selected" : ""}`}
  onClick={() => setEmployeeType("leave")}
>
  <div className="option-icon">📝</div>
  <div className="option-content">
    <h4>Leave Management</h4>
    <p className="option-description">
      Leave dashboard, requests & approvals
    </p>
  </div>
</div>

          </div>
        </div>

        {/* Main Form Area */}
        <div className="form-area">
          {/* ✅ SHOW ONLY ATTENDANCE AND HIDE ALL OTHER TABS & FORMS */}
          {employeeType === "attendance" ? (
            <Attendance />
            ) : employeeType === "leave" ? (
  <LeaveManagement />

  
          ) : (
            <>
              {/* Tabs */}
              <div className="tabs-bar">
                <button 
                  className={`tab ${activeTab === "personal" ? "active" : ""}`}
                  onClick={() => navigateToTab("personal")}
                >
                  1. Personal Information
                </button>

                <button 
                  className={`tab ${activeTab === "job" ? "active" : ""}`}
                  onClick={() => navigateToTab("job")}
                >
                  2. Job Details
                </button>

                <button 
                  className={`tab ${activeTab === "salary" ? "active" : ""}`}
                  onClick={() => navigateToTab("salary")}
                >
                  3. Salary & Bank
                </button>

                {employeeType === "fresher" ? (
                  <button 
                    className={`tab ${activeTab === "education" ? "active" : ""}`}
                    onClick={() => navigateToTab("education")}
                  >
                    4. Education & Documents
                  </button>
                ) : (
                  <button 
                    className={`tab ${activeTab === "experience" ? "active" : ""}`}
                    onClick={() => navigateToTab("experience")}
                  >
                    4. Experience & Documents
                  </button>
                )}
              </div>

              {/* Registration Form */}
              <form onSubmit={registerEmployee} className="registration-form">
                {/* Personal Information Tab */}
                {activeTab === "personal" && (
                  <div className="form-tab">
                    <h2>Personal Information</h2>
                    
                    {/* Photo Upload */}
                    <div className="photo-section">
                      <div className="photo-preview">
                        {previewPhoto ? (
                          <img src={previewPhoto} alt="Employee" className="preview-img" />
                        ) : (
                          <div className="photo-placeholder">
                            <span>👤</span>
                            <p>Passport Size Photo</p>
                          </div>
                        )}
                      </div>
                      <div className="photo-upload-control">
                        <input
                          type="file"
                          id="photo"
                          name="photo"
                          accept="image/*"
                          onChange={handleChange}
                          hidden
                        />
                        <label htmlFor="photo" className="upload-btn">
                          📷 Upload Photo
                        </label>
                      </div>
                    </div>

                    <div className="form-grid">
                      {/* Basic Info */}
                      <div className="form-group">
                        <label>First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={user.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.firstName ? 'input-error' : ''}
                        />
                        {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Middle Name</label>
                        <input
                          type="text"
                          name="middleName"
                          value={user.middleName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={user.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.lastName ? 'input-error' : ''}
                        />
                        {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                      </div>
                      
                      
                      {/* Personal Details */}
                      <div className="form-group">
                        <label>Gender *</label>
                        <select 
                          name="gender" 
                          value={user.gender} 
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          required
                          className={errors.gender ? 'input-error' : ''}
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.gender && <span className="error-text">{errors.gender}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Date of Birth *</label>
                        <input
                          type="date"
                          name="dob"
                          value={user.dob}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.dob ? 'input-error' : ''}
                        />
                        {errors.dob && <span className="error-text">{errors.dob}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Nationality *</label>
                        <select 
                          name="nationality" 
                          value={user.nationality} 
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          required
                          className={errors.nationality ? 'input-error' : ''}
                        >
                          <option value="Indian">Indian</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.nationality && <span className="error-text">{errors.nationality}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Marital Status *</label>
                        <select 
                          name="maritalStatus" 
                          value={user.maritalStatus} 
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          required
                          className={errors.maritalStatus ? 'input-error' : ''}
                        >
                          <option value="">Select</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                        </select>
                        {errors.maritalStatus && <span className="error-text">{errors.maritalStatus}</span>}
                      </div>

                      {/* Government IDs */}
                      <div className="form-group">
                        <label>Aadhaar Number *</label>
                        <input
                          type="text"
                          name="aadhaar"
                          value={user.aadhaar}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          maxLength="12"
                          className={errors.aadhaar ? 'input-error' : ''}
                        />
                        {errors.aadhaar && <span className="error-text">{errors.aadhaar}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>PAN Number *</label>
                        <input
                          type="text"
                          name="pan"
                          value={user.pan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          maxLength="10"
                          className={errors.pan ? 'input-error' : ''}
                        />
                        {errors.pan && <span className="error-text">{errors.pan}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Blood Group</label>
                        <select 
                          name="bloodGroup" 
                          value={user.bloodGroup} 
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          className={errors.bloodGroup ? 'input-error' : ''}
                        >
                          <option value="">Select</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </select>
                        {errors.bloodGroup && <span className="error-text">{errors.bloodGroup}</span>}
                      </div>

                      {/* Contact Info */}
                      <div className="form-group full-width">
                        <label>Personal Email *</label>
                        <input
                          type="email"
                          name="personalEmail"
                          value={user.personalEmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.personalEmail ? 'input-error' : ''}
                        />
                        {errors.personalEmail && <span className="error-text">{errors.personalEmail}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Mobile Number *</label>
                        <input
                          type="tel"
                          name="personalMobile"
                          value={user.personalMobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          maxLength="10"
                          className={errors.personalMobile ? 'input-error' : ''}
                        />
                        {errors.personalMobile && <span className="error-text">{errors.personalMobile}</span>}
                      </div>

                      {/* Address */}
                      <div className="form-group full-width">
                        <label>Permanent Address *</label>
                        <textarea
                          name="permanentAddress"
                          value={user.permanentAddress}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          rows="3"
                          className={errors.permanentAddress ? 'input-error' : ''}
                        />
                        {errors.permanentAddress && <span className="error-text">{errors.permanentAddress}</span>}
                      </div>
                      
                      <div className="form-group full-width">
                        <div className="address-header">
                          <label>Current Address *</label>
                          <button type="button" className="copy-btn" onClick={copyAddress}>
                            Same as Permanent
                          </button>
                        </div>
                        <textarea
                          name="currentAddress"
                          value={user.currentAddress}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          rows="3"
                          className={errors.currentAddress ? 'input-error' : ''}
                        />
                        {errors.currentAddress && <span className="error-text">{errors.currentAddress}</span>}
                      </div>

                      {/* Emergency Contact */}
                      <div className="form-group">
                        <label>Emergency Contact Name *</label>
                        <input
                          type="text"
                          name="emergencyName"
                          value={user.emergencyName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.emergencyName ? 'input-error' : ''}
                        />
                        {errors.emergencyName && <span className="error-text">{errors.emergencyName}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Relation *</label>
                        <input
                          type="text"
                          name="emergencyRelation"
                          value={user.emergencyRelation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.emergencyRelation ? 'input-error' : ''}
                        />
                        {errors.emergencyRelation && <span className="error-text">{errors.emergencyRelation}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Emergency Mobile *</label>
                        <input
                          type="tel"
                          name="emergencyMobile"
                          value={user.emergencyMobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          maxLength="10"
                          className={errors.emergencyMobile ? 'input-error' : ''}
                        />
                        {errors.emergencyMobile && <span className="error-text">{errors.emergencyMobile}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Job Details Tab */}
                {activeTab === "job" && (
                  <div className="form-tab">
                    <h2>Job / Employment Details</h2>
                    
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Employee ID </label>
                        <input
                          type="text"
                          value={user.employeeId}
                          readOnly
                          className="readonly"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Date of Joining *</label>
                        <input
                          type="date"
                          name="dateOfJoining"
                          value={user.dateOfJoining}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.dateOfJoining ? 'input-error' : ''}
                        />
                        {errors.dateOfJoining && <span className="error-text">{errors.dateOfJoining}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Department *</label>
                        <select 
                          name="department" 
                          value={user.department} 
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          required
                          className={errors.department ? 'input-error' : ''}
                        >
                          <option value="">Select Department</option>
                          <option value="IT">Information Technology</option>
                          <option value="HR">Human Resources</option>
                          <option value="Finance">Finance</option>
                          <option value="Sales">Sales</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Operations">Operations</option>
                        </select>
                        {errors.department && <span className="error-text">{errors.department}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Designation *</label>
                        <input
                          type="text"
                          name="designation"
                          value={user.designation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.designation ? 'input-error' : ''}
                        />
                        {errors.designation && <span className="error-text">{errors.designation}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Reporting Manager *</label>
                        <input
                          type="text"
                          name="reportingManager"
                          value={user.reportingManager}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.reportingManager ? 'input-error' : ''}
                        />
                        {errors.reportingManager && <span className="error-text">{errors.reportingManager}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Employment Type *</label>
                        <select 
                          name="employmentType" 
                          value={user.employmentType} 
                          onChange={handleChange} 
                          required
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Intern">Intern</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Work Location *</label>
                        <input
                          type="text"
                          name="workLocation"
                          value={user.workLocation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.workLocation ? 'input-error' : ''}
                        />
                        {errors.workLocation && <span className="error-text">{errors.workLocation}</span>}
                      </div>
                      
                      <div className="form-group full-width">
                        <label>Official Email </label>
                        <input
                          type="email"
                          value={user.officialEmail}
                          readOnly
                          className="readonly"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Salary & Bank Tab */}
                {activeTab === "salary" && (
                  <div className="form-tab">
                    <h2>Salary & Bank Details</h2>
                    
                    <div className="form-grid">
                      <div className="form-group">
                        <label>CTC (Annual) *</label>
                        <div className="currency-input">
                          <span>₹</span>
                          <input
                            type="number"
                            name="ctc"
                            value={user.ctc}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={errors.ctc ? 'input-error' : ''}
                          />
                        </div>
                        {errors.ctc && <span className="error-text">{errors.ctc}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Basic Pay</label>
                        <div className="currency-input">
                          <span>₹</span>
                          <input
                            type="text"
                            value={user.basicPay}
                            readOnly
                            className="readonly"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label>HRA</label>
                        <div className="currency-input">
                          <span>₹</span>
                          <input
                            type="text"
                            value={user.hra}
                            readOnly
                            className="readonly"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label>Other Allowances</label>
                        <div className="currency-input">
                          <span>₹</span>
                          <input
                            type="text"
                            value={user.otherAllowances}
                            readOnly
                            className="readonly"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label>Bank Name *</label>
                        <select 
                          name="bankName" 
                          value={user.bankName} 
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          required
                          className={errors.bankName ? 'input-error' : ''}
                        >
                          <option value="">Select Bank</option>
                          <option value="SBI">SBI</option>
                          <option value="HDFC">HDFC</option>
                          <option value="ICICI">ICICI</option>
                          <option value="Axis">Axis</option>
                        </select>
                        {errors.bankName && <span className="error-text">{errors.bankName}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Account Number *</label>
                        <input
                          type="text"
                          name="accountNumber"
                          value={user.accountNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.accountNumber ? 'input-error' : ''}
                        />
                        {errors.accountNumber && <span className="error-text">{errors.accountNumber}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>IFSC Code *</label>
                        <input
                          type="text"
                          name="ifscCode"
                          value={user.ifscCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.ifscCode ? 'input-error' : ''}
                        />
                        {errors.ifscCode && <span className="error-text">{errors.ifscCode}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Branch Name *</label>
                        <input
                          type="text"
                          name="branchName"
                          value={user.branchName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.branchName ? 'input-error' : ''}
                        />
                        {errors.branchName && <span className="error-text">{errors.branchName}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>PF Eligibility *</label>
                        <select 
                          name="pfEligibility" 
                          value={user.pfEligibility} 
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          required
                          className={errors.pfEligibility ? 'input-error' : ''}
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.pfEligibility && <span className="error-text">{errors.pfEligibility}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>ESI Eligibility *</label>
                        <select 
                          name="esiEligibility" 
                          value={user.esiEligibility} 
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          required
                          className={errors.esiEligibility ? 'input-error' : ''}
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.esiEligibility && <span className="error-text">{errors.esiEligibility}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>PF Number</label>
                        <input
                          type="text"
                          name="pfNumber"
                          value={user.pfNumber}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>UAN Number</label>
                        <input
                          type="text"
                          name="uanNumber"
                          value={user.uanNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Education & Documents Tab (Fresher) */}
                {activeTab === "education" && employeeType === "fresher" && (
                  <div className="form-tab">
                    <h2>Education & Documents (Fresher)</h2>
                    
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>College/University Name *</label>
                        <input
                          type="text"
                          name="collegeName"
                          value={user.collegeName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.collegeName ? 'input-error' : ''}
                        />
                        {errors.collegeName && <span className="error-text">{errors.collegeName}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Year of Passing *</label>
                        <input
                          type="number"
                          name="yearOfPassing"
                          value={user.yearOfPassing}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.yearOfPassing ? 'input-error' : ''}
                        />
                        {errors.yearOfPassing && <span className="error-text">{errors.yearOfPassing}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Percentage/Grade *</label>
                        <input
                          type="text"
                          name="percentage"
                          value={user.percentage}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.percentage ? 'input-error' : ''}
                        />
                        {errors.percentage && <span className="error-text">{errors.percentage}</span>}
                      </div>

                      {/* File Uploads */}
                      <div className="form-group">
                        <label>10th Certificate *</label>
                        <input
                          type="file"
                          name="tenthCertificate"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.tenthCertificate ? 'input-error' : ''}
                        />
                        {errors.tenthCertificate && <span className="error-text">{errors.tenthCertificate}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>12th Certificate *</label>
                        <input
                          type="file"
                          name="twelfthCertificate"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.twelfthCertificate ? 'input-error' : ''}
                        />
                        {errors.twelfthCertificate && <span className="error-text">{errors.twelfthCertificate}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Graduation Degree *</label>
                        <input
                          type="file"
                          name="graduationCertificate"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.graduationCertificate ? 'input-error' : ''}
                        />
                        {errors.graduationCertificate && <span className="error-text">{errors.graduationCertificate}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Post Graduation</label>
                        <input
                          type="file"
                          name="postGraduationCertificate"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Resume/CV *</label>
                        <input
                          type="file"
                          name="resume"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.resume ? 'input-error' : ''}
                        />
                        {errors.resume && <span className="error-text">{errors.resume}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Government ID Type *</label>
                        <select 
                          name="govtIdType" 
                          value={user.govtIdType} 
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          required
                          className={errors.govtIdType ? 'input-error' : ''}
                        >
                          <option value="">Select</option>
                          <option value="Aadhaar">Aadhaar</option>
                          <option value="Voter ID">Voter ID</option>
                          <option value="Passport">Passport</option>
                          <option value="Driving License">Driving License</option>
                        </select>
                        {errors.govtIdType && <span className="error-text">{errors.govtIdType}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>Government ID *</label>
                        <input
                          type="file"
                          name="govtId"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={errors.govtId ? 'input-error' : ''}
                        />
                        {errors.govtId && <span className="error-text">{errors.govtId}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Experience & Documents Tab (Experienced) */}
                {activeTab === "experience" && employeeType === "experienced" && (
                  <div className="form-tab">
                    <h2>Experience & Documents (Experienced)</h2>
                    
                    {/* Previous Experience */}
                    <div className="form-section">
                      <h3>Previous Work Experience</h3>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Previous Company Name *</label>
                          <input
                            type="text"
                            name="previousCompanyName"
                            value={user.previousCompanyName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={errors.previousCompanyName ? 'input-error' : ''}
                          />
                          {errors.previousCompanyName && <span className="error-text">{errors.previousCompanyName}</span>}
                        </div>
                        
                        <div className="form-group">
                          <label>Designation *</label>
                          <input
                            type="text"
                            name="previousDesignation"
                            value={user.previousDesignation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={errors.previousDesignation ? 'input-error' : ''}
                          />
                          {errors.previousDesignation && <span className="error-text">{errors.previousDesignation}</span>}
                        </div>
                        
                        <div className="form-group">
                          <label>From Date *</label>
                          <input
                            type="date"
                            name="experienceFromDate"
                            value={user.experienceFromDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={errors.experienceFromDate ? 'input-error' : ''}
                          />
                          {errors.experienceFromDate && <span className="error-text">{errors.experienceFromDate}</span>}
                        </div>
                        
                        <div className="form-group">
                          <label>To Date *</label>
                          <input
                            type="date"
                            name="experienceToDate"
                            value={user.experienceToDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={errors.experienceToDate ? 'input-error' : ''}
                          />
                          {errors.experienceToDate && <span className="error-text">{errors.experienceToDate}</span>}
                        </div>
                        
                        <div className="form-group">
                          <label>Last Drawn Salary *</label>
                          <div className="currency-input">
                            <span>₹</span>
                            <input
                              type="number"
                              name="lastDrawnSalary"
                              value={user.lastDrawnSalary}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                              className={errors.lastDrawnSalary ? 'input-error' : ''}
                            />
                          </div>
                          {errors.lastDrawnSalary && <span className="error-text">{errors.lastDrawnSalary}</span>}
                        </div>
                        
                        <div className="form-group full-width">
                          <label>Reason for Leaving *</label>
                          <input
                            type="text"
                            name="reasonForLeaving"
                            value={user.reasonForLeaving}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={errors.reasonForLeaving ? 'input-error' : ''}
                          />
                          {errors.reasonForLeaving && <span className="error-text">{errors.reasonForLeaving}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Mandatory Documents */}
                    <div className="form-section">
                      <h3>Mandatory Documents</h3>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Experience Letter *</label>
                          <input
                            type="file"
                            name="experienceLetter"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={errors.experienceLetter ? 'input-error' : ''}
                          />
                          {errors.experienceLetter && <span className="error-text">{errors.experienceLetter}</span>}
                        </div>
                        
                        <div className="form-group">
                          <label>Relieving Letter *</label>
                          <input
                            type="file"
                            name="relievingLetter"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={errors.relievingLetter ? 'input-error' : ''}
                          />
                          {errors.relievingLetter && <span className="error-text">{errors.relievingLetter}</span>}
                        </div>
                        
                        <div className="form-group">
                          <label>Last 3 Months Payslips *</label>
                          <input
                            type="file"
                            name="payslips"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            multiple
                            className={errors.payslips ? 'input-error' : ''}
                          />
                          {errors.payslips && <span className="error-text">{errors.payslips}</span>}
                        </div>
                        
                        <div className="form-group">
                          <label>Updated Resume *</label>
                          <input
                            type="file"
                            name="resume"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={errors.resume ? 'input-error' : ''}
                          />
                          {errors.resume && <span className="error-text">{errors.resume}</span>}
                        </div>
                        
                        <div className="form-group">
                          <label>Education Certificates *</label>
                          <input
                            type="file"
                            name="graduationCertificate"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={errors.graduationCertificate ? 'input-error' : ''}
                          />
                          {errors.graduationCertificate && <span className="error-text">{errors.graduationCertificate}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Optional Documents */}
                    <div className="form-section">
                      <h3>Optional Documents</h3>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Certifications</label>
                          <input
                            type="file"
                            name="certifications"
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>Awards & Achievements</label>
                          <input
                            type="file"
                            name="awards"
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>Professional Membership IDs</label>
                          <input
                            type="file"
                            name="professionalMembershipIds"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="form-navigation">
                  <div className="nav-buttons">
                    {activeTab !== "personal" && (
                      <button
                        type="button"
                        className="nav-btn prev"
                        onClick={() => {
                          const tabs = ["personal", "job", "salary", 
                            employeeType === "fresher" ? "education" : "experience"];
                          const currentIndex = tabs.indexOf(activeTab);
                          if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
                        }}
                      >
                        ← Previous
                      </button>
                    )}
                    
                    {activeTab !== (employeeType === "fresher" ? "education" : "experience") && (
                      <button
                        type="button"
                        className="nav-btn next"
                        onClick={() => {
                          const tabs = ["personal", "job", "salary", 
                            employeeType === "fresher" ? "education" : "experience"];
                          const currentIndex = tabs.indexOf(activeTab);
                          if (currentIndex < tabs.length - 1) {
                            if (validateCurrentTab()) {
                              setActiveTab(tabs[currentIndex + 1]);
                              setErrors({}); // Clear errors when moving to next tab
                            } else {
                              alert("Please fix the validation errors before proceeding.");
                            }
                          }
                        }}
                      >
                        Next →
                      </button>
                    )}
                    
                    {activeTab === (employeeType === "fresher" ? "education" : "experience") && (
                      <button type="submit" className="nav-btn submit">
                        Register Employee
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {/* ✅ FOOTER ADDED HERE */}
      <footer className="app-footer">
        <p>
          © {new Date().getFullYear()} Venturebiz Promotions Pvt Ltd. | All
          Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Register;