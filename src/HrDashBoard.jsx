import { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./HrDashBoard.css";

/* LOGO */
import ventureBizLogo from "./assets/venturebiz_logo.png";

/* MODULES */
import HrEmployeeManagement from "./HrEmployeeManagement";
import HrCalendar from "./HrCalendar";
import HrSalaryManagement from "./HrSalaryManagement";
import Department from "./Department";

export default function HrDashBoard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  /* PASSWORD */
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  /* ACTIVE PAGE */
  const [activePage, setActivePage] = useState("dashboard");

  const profileRef = useRef(null);

  /* CLOSE PROFILE MENU */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (logout) return <Navigate to="/" replace />;

  /* UPDATE PASSWORD */
  const updatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!strongPasswordRegex.test(newPassword)) {
      alert(
        "Password must be 8–16 characters with uppercase, lowercase, number & special character"
      );
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        "http://localhost:8080/password",
        { password: newPassword },
        { withCredentials: true }
      );

      alert("Password updated successfully");
      setShowPasswordModal(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  /* CONTENT SWITCH */
  const renderContent = () => {
    switch (activePage) {
      case "employee":
        return <HrEmployeeManagement />;
      case "department":
        return <Department />;
      case "salary":
        return <HrSalaryManagement />;
      case "calendar":
        return <HrCalendar />;
      default:
        return (
          <div className="empty-dashboard">
            <h2>Welcome to HR Dashboard 👋</h2>
            <p>Select a module from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-wrapper">
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
  <img src={ventureBizLogo} alt="VB Logo" />
  <span>HRMS PORTAL</span>
</div>

      

          {[
            ["dashboard", "Dashboard"],
            ["employee", "Employee Management"],
            ["department", "Department Management"],
            ["salary", "Salary Management"],
            ["calendar", "Calendar"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={`side-item ${activePage === key ? "active" : ""}`}
              onClick={() => {
                setActivePage(key);
                setSidebarOpen(false);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <div className="main-content-area">
        <header className="dashboard-header">
          <div className="header-left">
      
            
          </div>

          <div className="header-right">
            <div className="profile-dropdown" ref={profileRef}>
              <div
                className="profile"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <div className="avatar">A</div>
                <span>HR Admin</span>
              </div>

              {profileMenuOpen && (
                <div className="profile-menu open">
                  <button
                    className="profile-menu-item"
                    onClick={() => {
                      setShowPasswordModal(true);
                      setProfileMenuOpen(false);
                    }}
                  >
                    Change Password
                  </button>
                </div>
              )}
            </div>

            <button className="logout-btn" onClick={() => setLogout(true)}>
              ⏻ Logout
            </button>
          </div>
        </header>

        <main className="dashboard-main">{renderContent()}</main>

        <footer className="app-fixed-footer">© 2026 VentureBiz</footer>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="password-modal">
            <h3>Update Password</h3>

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              maxLength={16}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <div className="password-field">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                maxLength={16}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="eye-btn"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
              <button
                className="save-btn"
                onClick={updatePassword}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
