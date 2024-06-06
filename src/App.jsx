import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from "./components/Header/Header";
import SideNavbar from './components/sideNavbar/SideNavbar';
import DashBoard from './components/dashboard/DashBoard';
import Doctor from './components/doctor/Doctor';
import Patients from './components/patient/Patients';
import Categories from './components/categories/Categories';
import Subcategories from './components/Subcategories/Subcategories';
import Slider from './components/slider/Slider';
import Services from './components/services/Services';
import Reservation from './components/reservation/Reservation';
import Meetings from './components/meetings/Meeting';
import TreatmentPlans from './components/TreatmentPlans/TreatmentPlans';
import Permissions from './components/Permissions/Permissons';
import Copon from './components/copon/Copon';
import Users from './components/users/Users';
import LotalyProgram from './components/LoyaltyProgram/LotalyProgram';
import Questions from './components/Questions/Questions';
import Settings from './components/setting/Settings';
import PublicSettings from './components/setting/PublicSettings';
import VisibilitySettings from './components/setting/VisibilitySettings';
import ReturnPolicy from './components/setting/ReturnPolicy';
import CopyRights from './components/setting/CopyRights';
import CommonQuestions from './components/setting/CommonQuestions';
import RatingPage from './components/RatingsPage/RatingPage';
import DoctorsProfile from './components/doctor/DoctorsProfile';
import DoctorData from './components/doctor/DoctorData';
import AddTreatmentPlans from './components/TreatmentPlans/AddTreatmentPlans';
import AddMeetings from './components/meetings/AddMeetings';
import AddUsers from './components/users/AddUsers';
import AddPermissions from './components/Permissions/AddPermissions';
import AddServices from './components/services/AddServices';
import AddQuestions from './components/Questions/AddQuestions';
import LoginPage from './components/login/Login';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/Login';

  return (
    <div className="App">
      {!isLoginPage && <Header />}
      <div className="container-fluid">
        <div className="row">
          {!isLoginPage && <SideNavbar />}
          <div className="col">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<DashBoard />} />
              <Route path="/Dashboard" element={<DashBoard />} />
              <Route path="/Doctor" element={<Doctor />} />
              <Route path="/Patients" element={<Patients />} />
              <Route path="/Categories" element={<Categories />} />
              <Route path="/Subcategories" element={<Subcategories />} />
              <Route path="/slider" element={<Slider />} />
              <Route path="/Services" element={<Services />} />
              <Route path="/Reservation" element={<Reservation />} />
              <Route path="/Meetings" element={<Meetings />} />
              <Route path="/TreatmentPlans" element={<TreatmentPlans />} />
              <Route path="/Permissions" element={<Permissions />} />
              <Route path="/Copon" element={<Copon />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/LotalyProgram" element={<LotalyProgram />} />
              <Route path="/Questions" element={<Questions />} />
              <Route path="/Settings" element={<Settings />}>
                <Route path="PublicSettings" element={<PublicSettings />} />
                <Route path="VisibilitySettings" element={<VisibilitySettings />} />
                <Route path="ReturnPolicy" element={<ReturnPolicy />} />
                <Route path="CopyRights" element={<CopyRights />} />
                <Route path="CommonQuestions" element={<CommonQuestions />} />
              </Route>
              <Route path="/RatingPage" element={<RatingPage />} />
              <Route path="/DoctorsProfile" element={<DoctorsProfile />} />
              <Route path="/DoctorData" element={<DoctorData />} />
              <Route path="/AddTreatmentPlans" element={<AddTreatmentPlans />} />
              <Route path="/AddMeetings" element={<AddMeetings />} />
              <Route path="/AddUsers" element={<AddUsers />} />
              <Route path="/AddPermissions" element={<AddPermissions />} />
              <Route path="/AddServices" element={<AddServices />} />
              <Route path="/AddQuestions" element={<AddQuestions />} />
            </Routes>
          </div>
        </div>
        </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
