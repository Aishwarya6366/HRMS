import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import companyLogo from "./assets/download.png";
import "./EmpSalary.css";

const EmpSalary = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- Month Formatter ---------- */
  const formatMonthToWords = (yearMonth) => {
    if (!yearMonth) return "";
    const [year, month] = yearMonth.split("-");
    const monthNames = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  /* ---------- Download Payslip PDF ---------- */
  const downloadPayslipPDF = async () => {
    if (!selectedMonth) {
      setMessage("Please select month");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const [year, month] = selectedMonth.split("-");

      const res = await axios.get(
        `http://localhost:8080/salary/emp/payslip?month=${month}&year=${year}`,
        { withCredentials: true }
      );

      const data = res.data;

      const doc = new jsPDF();
      doc.setFont("times");

      const pdfWidth = doc.internal.pageSize.getWidth();
      const imgProps = doc.getImageProperties(companyLogo);
      const logoWidth = 25;
      const logoHeight = (imgProps.height * logoWidth) / imgProps.width;

      doc.addImage(
        companyLogo,
        "PNG",
        pdfWidth / 2 - logoWidth / 2,
        10,
        logoWidth,
        logoHeight
      );

      doc.setFontSize(16);
      doc.setFont("times", "bold");
      doc.text(
        "Venturebiz Promotions Private Limited",
        pdfWidth / 2,
        35,
        { align: "center" }
      );

      doc.setFontSize(12);
      doc.text(
        `Payslip for the month of ${formatMonthToWords(selectedMonth)}`,
        pdfWidth / 2,
        58,
        { align: "center" }
      );

      autoTable(doc, {
        startY: 65,
        theme: "grid",
        styles: { font: "times", fontSize: 9 },
        body: [
          ["Basic", data.basic, "PF", data.pf],
          ["HRA", data.hra, "", ""],
          ["Conveyance", data.conveyance, "", ""],
          ["Total Earnings", data.grossPay, "Total Deductions", data.pf]
        ]
      });

      doc.save(`Payslip_${month}_${year}.pdf`);
    } catch (err) {
      setMessage("Failed to download payslip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="salary-page">
      <div className="salary-card">
        <h2 className="salary-title">My Payslip</h2>

        {message && <p className="salary-error">{message}</p>}

        <label className="salary-label">Select Month</label>

        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="salary-input"
        />

        <button
          onClick={downloadPayslipPDF}
          disabled={!selectedMonth || loading}
          className={`salary-btn ${
            !selectedMonth || loading ? "disabled" : ""
          }`}
        >
          {loading ? "Loading..." : "📄 Download Payslip"}
        </button>
      </div>
    </div>
  );
};

export default EmpSalary;
