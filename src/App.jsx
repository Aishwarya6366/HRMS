import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import HrDashBoard from './HrDashBoard';
import EmpDashboard from './EmpDashboard';
import SetPassword from './SetPassword';
import HrLeaveManagement from './HrLeaveManagement';
import EmpLeaveManagement from './EmpLeaveManagement';
import HrCalendar from './HrCalendar';
import EmpCalendar from "./EmpCalendar";
import EmpAnnouncement from './EmpAnnouncement';
import HrAnnouncement from './HrAnnouncement';
import HrEmployeeManagement from './HrEmployeeManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/hr-dashboard" element={<HrDashBoard />} />
        <Route path="/emp-dashboard" element={<EmpDashboard />} />
        <Route path="/hrleave-management" element={<HrLeaveManagement/>}/>
        <Route path="/empleave-management" element={<EmpLeaveManagement/>}/>
        <Route path="/HrCalendar" element={<HrCalendar/>}/>
         <Route path="/emp-calendar" element={<EmpCalendar />} />
         <Route path="/hr-announcement" element={<HrAnnouncement />} />
<Route path="/emp-announcement" element={<EmpAnnouncement />} />
<Route path="/hremployee-management" element={<HrEmployeeManagement/>}/>

      </Routes>
    </Router>
  );
}

export default App;

