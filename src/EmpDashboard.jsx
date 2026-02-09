import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import EmpProfile from "./EmpProfile";
import EmpSalary from "./EmpSalary";
import EmployeeHolidayCalendar from "./EmployeeHolidayCalendar";

import "./EmpDashboard.css";
import EmpLeaveManagement from "./EmpLeaveManagement";

export default class EmpDashboard extends Component {
  state = {
    activePage: "dashboard",
    showMenu: false,
    showChangePassword: false,
    sidebarOpen: false,

    showNewPassword: false,
    showConfirmPassword: false,

    password: "",
    confirmPassword: "",
    message: "",
    logout: false,
  };

  // ✅ PASSWORD REGEX (ADDED – no function change)
  passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  handleNavigation = (page) => {
    this.setState({ activePage: page, sidebarOpen: false });
  };

  logout = () => {
    fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => this.setState({ logout: true }));
  };

  submitPassword = () => {
    const { password, confirmPassword } = this.state;

    if (!password || !confirmPassword) {
      this.setState({ message: "Please fill all fields" });
      return;
    }

    // ✅ STRONG PASSWORD VALIDATION
    if (!this.passwordRegex.test(password)) {
      this.setState({
        message:
          "Password must be 8+ chars with uppercase, lowercase, number & special character",
      });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ message: "Passwords do not match" });
      return;
    }

    fetch("http://localhost:8080/password", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.text();
      })
      .then(() =>
        this.setState({
          message: "Password changed successfully",
          showChangePassword: false,
          password: "",
          confirmPassword: "",
        })
      )
      .catch(() =>
        this.setState({ message: "Failed to update password" })
      );
  };

  renderContent() {
    switch (this.state.activePage) {
      case "profile":
        return <EmpProfile />;
      case "salary":
        return <EmpSalary />;
      case "empleavemanagement":
        return <EmpLeaveManagement />; 
      case "EmployeeHolidayCalendar":
        return <EmployeeHolidayCalendar/>; 
      default:
        return (
          <div className="dashboard-welcome">
            <h2>Welcome to Employee Dashboard</h2>
            <p>Select an option from the menu</p>
          </div>
        );
    }
  }

  render() {
    if (this.state.logout) return <Navigate to="/" replace />;

    return (
      <div className="emp-dashboard">
        {/* HEADER */}
        <header className="emp-header">
          <div className="header-left">
            <h3>HRMS PORTAL</h3>
          </div>

          <div className="header-profile-section">
            <div className="emp-profile-icon" onClick={this.toggleMenu}>
              👤
            </div>

            <button className="emp-logout-btn" onClick={this.logout}>
              ⏻ Logout
            </button>

            {this.state.showMenu && (
              <div className="emp-profile-menu">
                <div
                  className="emp-menu-item"
                  onClick={() =>
                    this.setState({
                      showChangePassword: true,
                      showMenu: false,
                      message: "",
                    })
                  }
                >
                  Change Password
                </div>
              </div>
            )}
          </div>
        </header>

        {/* BODY */}
        <div className="emp-body">
          <aside
            className={`emp-sidebar ${
              this.state.sidebarOpen ? "open" : ""
            }`}
          >
            {[
              ["dashboard", "Dashboard"],
              ["profile", "My Profile"],
              ["salary", "Salary"],
              ["empleavemanagement", "EmpLeaveManagement"],
              ["EmployeeHolidayCalendar", "EmployeeHolidayCalendar"]
            ].map(([key, label]) => (
              <div
                key={key}
                className={`emp-side-item ${
                  this.state.activePage === key ? "active" : ""
                }`}
                onClick={() => this.handleNavigation(key)}
              >
                {label}
              </div>
            ))}
          </aside>

          <main className="emp-content">{this.renderContent()}</main>
        </div>

        {/* FOOTER */}
        <footer className="emp-footer">© 2026 VentureBiz</footer>

        {/* CHANGE PASSWORD MODAL */}
        {this.state.showChangePassword && (
          <div className="emp-modal-overlay">
            <div className="emp-modal-box">
              <h4>Change Password</h4>

              {/* New Password */}
              <div className="password-field">
                <input
                  type={this.state.showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={this.state.password}
                  maxLength={20}  
                  onChange={(e) =>
                    this.setState({ password: e.target.value })
                  }
                />

              </div>

              {/* Confirm Password */}
              <div className="password-field">
                <input
                  type={
                    this.state.showConfirmPassword ? "text" : "password"
                  }
                  placeholder="Confirm New Password"
                  value={this.state.confirmPassword}
                  maxLength={20}  
                  onChange={(e) =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                />
                <span
                  className="eye-icon"
                  onClick={() =>
                    this.setState({
                      showConfirmPassword:
                        !this.state.showConfirmPassword,
                    })
                  }
                >
                  {this.state.showConfirmPassword ? "🙈" : "👁️"}
                </span>
              </div>

              <div className="modal-actions">
                <button onClick={this.submitPassword}>Update</button>
                <button
                  onClick={() =>
                    this.setState({
                      showChangePassword: false,
                      password: "",
                      confirmPassword: "",
                      message: "",
                    })
                  }
                >
                  Cancel
                </button>
              </div>

              {this.state.message && (
                <p className="error-text">{this.state.message}</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
