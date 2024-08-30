import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import TopNav from './TopNav';
import SideNav from './SideNav';
import MainContent from './MainContent';
import LiveMonitoring from './LiveMonitoring';
import IncidentReports from './IncidentReports';
import InvigilatorDashboard from './InvigilatorDashboard';
import Settings from './Settings';
import RecentAlerts from './RecentAlerts';
import Login from './Login';
import { useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import ExamSetup from './ExamSetup'; // Import the ExamSetup component
import Profile from './Profile'; // Import the Profile component
import ProfileManage from './ProfileManage'; // Import the ProfileManage component
import ProctorManagement from './ProctorManagement';
import StudentManagement from './StudentManagement';
import Reports from './ReportsGeneration';

const App = () => {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const { user } = useAuth();

  const handleToggleSideNav = () => {
    setIsSideNavExpanded(prev => !prev);
  };

  // Wrapper component for layouts with SideNav and TopNav
  const LayoutWithNav = ({ children }) => (
    <>
      <TopNav onToggleSideNav={handleToggleSideNav} />
      <div style={{ display: 'flex' }}>
        <SideNav isExpanded={isSideNavExpanded} onToggle={handleToggleSideNav} />
        {children}
      </div>
    </>
  );

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute element={
          <LayoutWithNav>
            <MainContent isSideNavExpanded={isSideNavExpanded} />
            <RecentAlerts />
          </LayoutWithNav>
        } />} />

        <Route path="/settings" element={<ProtectedRoute element={
          <LayoutWithNav>
            <Settings isSideNavExpanded={isSideNavExpanded} onToggleSideNav={handleToggleSideNav} />
          </LayoutWithNav>
        } />} />

        <Route path="/live-monitoring" element={<ProtectedRoute element={
          <LayoutWithNav>
            <LiveMonitoring isSideNavExpanded={isSideNavExpanded} />
          </LayoutWithNav>
        } />} />

        <Route path="/incident-reports" element={<ProtectedRoute element={
          <LayoutWithNav>
            <IncidentReports isSideNavExpanded={isSideNavExpanded} />
          </LayoutWithNav>
        } />} />

        <Route path="/invigilator" element={<ProtectedRoute element={<InvigilatorDashboard />} />} />

        {/* New Exam Setup Routes */}
        <Route path="/exam-setup/*" element={<ProtectedRoute element={
          <LayoutWithNav>
            <Routes>
              <Route index element={<ExamSetup isSideNavExpanded={isSideNavExpanded} />} />
              <Route path="create" element={<ExamSetup isSideNavExpanded={isSideNavExpanded} />} />
              <Route path="manage" element={<ExamSetup isSideNavExpanded={isSideNavExpanded} />} />
              <Route path="time-settings" element={<ExamSetup isSideNavExpanded={isSideNavExpanded} />} />
              <Route path="security" element={<ExamSetup isSideNavExpanded={isSideNavExpanded} />} />
              <Route path="ai-config" element={<ExamSetup isSideNavExpanded={isSideNavExpanded} />} />
            </Routes>
          </LayoutWithNav>
        } />} />
       
       <Route path="/Profile" element={<ProtectedRoute element={
          <LayoutWithNav>
            <Profile isSideNavExpanded={isSideNavExpanded} />
          </LayoutWithNav>
        } />} />

        <Route path="/ProfileManage" element={<ProtectedRoute element={
          <LayoutWithNav>
            <ProfileManage isSideNavExpanded={isSideNavExpanded} />
          </LayoutWithNav>
        } />} />

          <Route path="/proctors" element={<ProtectedRoute element={
            <LayoutWithNav>
              <ProctorManagement isSideNavExpanded={isSideNavExpanded} />
            </LayoutWithNav>
          } />} />

          <Route path="/students" element={<ProtectedRoute element={
            <LayoutWithNav>
              <StudentManagement isSideNavExpanded={isSideNavExpanded} />
            </LayoutWithNav>
          } />} />

          <Route path="/reports" element={<ProtectedRoute element={
            <LayoutWithNav>
              <Reports isSideNavExpanded={isSideNavExpanded} />
            </LayoutWithNav>
          } />} />

      </Routes>
    </div>
  );
};

export default App;
