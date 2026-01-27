import React, { Component } from "react";
import axios from "axios";

export default class EmpProfile extends Component {
  state = {
    loading: true,
    error: null,
    data: null,
  };

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/dept/employee/emp/me",
        { withCredentials: true } // 🔐 session-based login
      );
      this.setState({
        data: res.data,
        loading: false,
      });
    } catch (err) {
      this.setState({
        error: "Failed to load profile",
        loading: false,
      });
    }
  };

  render() {
    const { loading, error, data } = this.state;
    if (loading) return <h3 style={styles.loading}>Loading profile...</h3>;
    if (error) return <h3 style={styles.error}>{error}</h3>;
    if (!data) return null;

    const {
      personalDetailsDTO,
      jobDetailsDTO,
      salaryDetailsDTO,
      bankDetailsDTO,
      employeeStatutoryDetailsDTO,
    } = data;

    return (
      <div style={styles.container}>
        <h2 style={styles.mainTitle}>My Profile</h2>
        {/* PERSONAL DETAILS */}
        <Section title="Personal Details">
          <Field label="Name" value={`${personalDetailsDTO.firstName} ${personalDetailsDTO.lastName}`} />
          <Field label="Gender" value={personalDetailsDTO.gender} />
          <Field label="DOB" value={personalDetailsDTO.dob} />
          <Field label="Phone" value={personalDetailsDTO.phoneNumber} />
          <Field label="Email" value={personalDetailsDTO.emailId} />
          <Field label="Blood Group" value={personalDetailsDTO.bloodGroup} />
          <Field label="Address" value={personalDetailsDTO.address1} />
        </Section>
        {/* JOB DETAILS */}
        <Section title="Job Details">
          <Field label="Work Location" value={jobDetailsDTO.workLocation} />
          <Field label="Date of Joining" value={jobDetailsDTO.dateOfJoining} />
          <Field label="Department ID" value={jobDetailsDTO.departmentId} />
          <Field label="Designation ID" value={jobDetailsDTO.designationId} />
        </Section>
        {/* SALARY DETAILS */}
        <Section title="Salary Details">
          <Field label="CTC" value={`₹ ${salaryDetailsDTO.ctc}`} />
          <Field label="Basic" value={`₹ ${salaryDetailsDTO.basic}`} />
          <Field label="HRA" value={`₹ ${salaryDetailsDTO.hra}`} />
          <Field label="Conveyance" value={`₹ ${salaryDetailsDTO.conveyanceAllowance}`} />
        </Section>
        {/* BANK DETAILS */}
        <Section title="Bank Details">
          <Field label="Bank Name" value={bankDetailsDTO.bankName} />
          <Field label="Account Number" value={bankDetailsDTO.accountNumber} />
          <Field label="IFSC" value={bankDetailsDTO.ifsc} />
        </Section>
        {/* STATUTORY DETAILS */}
        <Section title="Statutory Details">
          <Field label="PF UAN" value={employeeStatutoryDetailsDTO.pfUan} />
          <Field label="ESI" value={employeeStatutoryDetailsDTO.esi} />
          <Field label="MIN" value={employeeStatutoryDetailsDTO.min} />
        </Section>
      </div>
    );
  }
}

/* ---------- Helper Components ---------- */
const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h3 style={styles.sectionTitle}>{title}</h3>
    <div style={styles.grid}>{children}</div>
  </div>
);

const Field = ({ label, value }) => (
  <div style={styles.field}>
    <strong style={styles.label}>{label}:</strong>
    <div style={styles.value}>{value || "-"}</div>
  </div>
);

/* ---------- Professional Styles ---------- */
const styles = {
  container: {
    padding: "32px",
    maxWidth: "1000px",
    margin: "0 auto",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    color: "#333",
  },
  mainTitle: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "32px",
    color: "#1a202c",
    textAlign: "center",
  },
  section: {
    marginBottom: "32px",
    padding: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: "20px",
    color: "#2d3748",
    borderBottom: "2px solid #edf2f7",
    paddingBottom: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: "4px",
  },
  value: {
    fontSize: "16px",
    color: "#2d3748",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#718096",
  },
  error: {
    textAlign: "center",
    fontSize: "18px",
    color: "#e53e3e",
  },
};