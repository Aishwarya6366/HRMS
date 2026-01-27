import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import companyLogo from "./assets/download.png";

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

  /* ---------- Number to Words ---------- */
  const numberToWords = (num) => {
    const a = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
      "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen",
      "Eighteen","Nineteen"
    ];
    const b = ["", "", "Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

    const inWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000)
        return a[Math.floor(n / 100)] + " Hundred" +
          (n % 100 ? " and " + inWords(n % 100) : "");
      if (n < 100000)
        return inWords(Math.floor(n / 1000)) + " Thousand" +
          (n % 1000 ? " " + inWords(n % 1000) : "");
      return "";
    };

    return `${inWords(Math.floor(num))} Rupees Only`;
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
      doc.addImage(companyLogo, "PNG", pdfWidth / 2 - logoWidth / 2, 10, logoWidth, logoHeight);

      doc.setFontSize(16);
      doc.setFont("times", "bold");
      doc.text("Venturebiz Promotions Private Limited", pdfWidth / 2, 35, { align: "center" });

      doc.setFontSize(10);
      doc.setFont("times", "normal");
      doc.text(
        "#2085/16, 2nd Floor, Spoorthi, Wilson Garden Society Layout,",
        pdfWidth / 2,
        42,
        { align: "center" }
      );
      doc.text(
        "Puttenahalli Main Road, JP Nagar 7th Phase, Bangalore-560078.",
        pdfWidth / 2,
        48,
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
          ["Name", data.name, "Department", data.department],
          ["Designation", data.designation, "Location", data.location],
          ["Date of Joining", data.dateOfJoining, "Worked Days", data.workedDays],
          ["Days in Month", data.totalDays, "PF No", data.pfNo],
          ["ESI No", data.esiNo, "", ""]
        ]
      });

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [["EARNINGS", "AMOUNT", "DEDUCTIONS", "AMOUNT"]],
        theme: "grid",
        styles: { font: "times", fontSize: 9 },
        headStyles: { fillColor: [40, 40, 40] },
        body: [
          ["Basic", data.basic.toFixed(2), "PF", data.pf.toFixed(2)],
          ["HRA", data.hra.toFixed(2), "", ""],
          ["Conveyance", data.conveyance.toFixed(2), "", ""],
          ["Total Earnings", data.grossPay.toFixed(2), "Total Deductions", data.pf.toFixed(2)]
        ]
      });

      const finalY = doc.lastAutoTable.finalY + 15;
      doc.setFont("times", "bold");
      doc.text("Net Pay :", 14, finalY);
      doc.text(data.netPay.toFixed(2), 170, finalY);

      doc.setFont("times", "normal");
      doc.text(`*${numberToWords(data.netPay)}*`, 14, finalY + 8);

      doc.setFontSize(9);
      doc.text(
        "This is a system generated payslip and does not require signature",
        pdfWidth / 2,
        finalY + 20,
        { align: "center" }
      );

      doc.save(`Payslip_${month}_${year}.pdf`);
    } catch (err) {
      setMessage("Failed to download payslip");
    } finally {
      setLoading(false);
    }
  };

return (
  <div style={styles.page}>
    <div style={styles.card}>
      <h2 style={styles.title}>My Payslip</h2>

      {message && <p style={styles.error}>{message}</p>}

      <label style={styles.label}>Select Month</label>

      {/* Centered & Reduced Input */}
      <div style={styles.center}>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Centered & Reduced Button */}
      <div style={styles.center}>
        <button
          onClick={downloadPayslipPDF}
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
        >
          {loading ? "Downloading..." : "Download Payslip"}
        </button>
      </div>
    </div>
  </div>
);

};

export default EmpSalary;

/* ---------- Styles ---------- */
const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: "60px 20px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
  },

card: {
  width: "100%",
  maxWidth: "380px",
  backgroundColor: "#ffffff",
  padding: "28px",          // ⬅ reduced from 36–40
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  textAlign: "center",
},


  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "32px",
    color: "#111827",
  },

  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
    textAlign: "left",
  },

  center: {
    display: "flex",
    justifyContent: "center",
  },

input: {
  width: "220px",
  padding: "8px 12px",      // ⬅ reduced height
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  marginBottom: "18px",
  outline: "none",
},


 button: {
  width: "220px",
  padding: "09px",          // ⬅ reduced height
  fontSize: "14px",
  fontWeight: "600",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
},


  buttonDisabled: {
    backgroundColor: "#9ca3af",
    cursor: "not-allowed",
  },

  error: {
    color: "#dc2626",
    marginBottom: "16px",
    fontSize: "14px",
  },
};
