import React, { useState } from "react";
import "./Login.css";
import { validators } from "./utils/validation";

const Login = ({ setIsLoggedIn }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({}); // ADDED: Error state

  // ADDED: Validation function
  const validateForm = () => {
    const newErrors = {};
    
    // Validate Employee ID
    const idError = validators.employeeId(employeeId);
    if (idError) newErrors.employeeId = idError;
    
    // Validate Password
    const passError = validators.password(password);
    if (passError) newErrors.password = passError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // ADDED: Validate before proceeding
    if (!validateForm()) return;

    if (!employeeId || !password) return;

    setIsLoggedIn(true); // Go to Register
  };

  // ADDED: Handle blur validation
  const handleBlur = (field) => {
    if (field === 'employeeId') {
      const error = validators.employeeId(employeeId);
      setErrors(prev => ({ ...prev, employeeId: error }));
    }
    if (field === 'password') {
      const error = validators.password(password);
      setErrors(prev => ({ ...prev, password: error }));
    }
  };

  // ADDED: Handle input change with error clearing
  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
    if (errors.employeeId) {
      setErrors(prev => ({ ...prev, employeeId: null }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: null }));
    }
  };

  return (
    <div className="page">
      {/* HEADER */}
      <header className="header">
        <span className="company-name">HRMS DASHBORD</span>
      </header>

      <main className="center">
        <div className="card">

          {/* NEW USER ICON + TITLE LIKE YOUR SAMPLE */}
          <div className="login-top">
            <div className="user-icon">
              <svg width="55" height="55" viewBox="0 0 24 24" fill="#333">
                <circle cx="12" cy="7" r="5" />
                <path d="M12 14c-6 0-9 3-9 6v2h18v-2c0-3-3-6-9-6z" />
              </svg>
            </div>
            <h2 className="login-heading">
              <span className="orange">USER</span> LOGIN
            </h2>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="form">

            <label>Employee ID</label>
            <input
              type="text"
              placeholder="Enter Employee ID"
              value={employeeId}
              onChange={handleEmployeeIdChange}
              onBlur={() => handleBlur('employeeId')}
              className={errors.employeeId ? 'input-error' : ''} // ADDED: Error class
            />
            {/* ADDED: Error message display */}
            {errors.employeeId && (
              <div className="error-message">{errors.employeeId}</div>
            )}

            <label>Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur('password')}
                className={errors.password ? 'input-error' : ''} // ADDED: Error class
              />

              <span
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 1l22 22" />
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.8 21.8 0 0 1 5.06-7.94" />
                    <path d="M9.88 9.88A3 3 0 0 1 14.12 14.12" />
                    <path d="M10.73 5.08A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.8 21.8 0 0 1-2.12 3.18" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </span>
            </div>
            {/* ADDED: Error message display */}
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}

            <button className="btn">Login</button>
          </form>
        </div>
      </main>

      <footer className="footer">© 2025 Employee Portal</footer>
    </div>
  );
};

export default Login;