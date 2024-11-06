import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header";
import SideNavbar from "./components/sideNavbar/SideNavbar";
import DashBoard from "./components/dashboard/DashBoard";
import Doctor from "./components/doctor/Doctor";
import Patients from "./components/patient/Patients";
import Categories from "./components/categories/Categories";
import Subcategories from "./components/Subcategories/Subcategories";
import Slider from "./components/slider/Slider";
import Services from "./components/services/Services";
import Reservation from "./components/reservation/Reservation";
import Meetings from "./components/meetings/Meeting";
import TreatmentPlans from "./components/TreatmentPlans/TreatmentPlans";
import Permissions from "./components/Permissions/Permissons";
import Copon from "./components/copon/Copon";
import Users from "./components/users/Users";
import LotalyProgram from "./components/LoyaltyProgram/LotalyProgram";
import Questions from "./components/Questions/Questions";
import Settings from "./components/setting/Settings";
import PublicSettings from "./components/setting/PublicSettings";
import ReturnPolicy from "./components/setting/ReturnPolicy";
import CopyRights from "./components/setting/CopyRights";
import CommonQuestions from "./components/setting/CommonQuestions";
import RatingPage from "./components/RatingsPage/RatingPage";
import DoctorsProfile from "./components/doctor/DoctorsProfile";
import DoctorData from "./components/doctor/DoctorData";
import AddTreatmentPlans from "./components/TreatmentPlans/AddTreatmentPlans";
import AddMeetings from "./components/meetings/AddMeetings";
import AddUsers from "./components/users/AddUsers";
import AddPermissions from "./components/Permissions/AddPermissions";
import AddServices from "./components/services/AddServices";
import AddQuestions from "./components/Questions/AddQuestions";
import LoginPage from "./components/login/Login";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import "./App.css";
import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import UpdateServices from "./components/services/UpdateServices";
import Chat from "./components/Chat/Chat";

function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isLoginPage = location.pathname === "/Login";
  const isChatPage = location.pathname === "/Chat"; // Check if on Chat page

  return (
    <div className="App">
      {!isLoginPage && isAuthenticated && <Header />}
      <div className="container-fluid">
        <div className="row">
          {/* Render SideNavbar only if not on Chat page */}
          {!isLoginPage && isAuthenticated && !isChatPage && <SideNavbar />}
          <div className={isChatPage ? "col-12" : "col"}> {/* Full width for Chat page */}
            <ScrollToTop />
            <Routes>
              <Route path="/Login" element={<LoginPage />} />
              <Route
                path="/"
                element={<ProtectedRoute element={<DashBoard />} />}
              />
              <Route
                path="/Chat"
                element={<ProtectedRoute element={<Chat />} />}
              />
              <Route
                path="/Dashboard"
                element={<ProtectedRoute element={<DashBoard />} />}
              />
              <Route
                path="/Doctor"
                element={<ProtectedRoute element={<Doctor />} />}
              />
              <Route
                path="/Patients"
                element={<ProtectedRoute element={<Patients />} />}
              />
              <Route
                path="/Categories"
                element={<ProtectedRoute element={<Categories />} />}
              />
              <Route
                path="/Subcategories"
                element={<ProtectedRoute element={<Subcategories />} />}
              />
              <Route
                path="/slider"
                element={<ProtectedRoute element={<Slider />} />}
              />
              <Route
                path="/Services"
                element={<ProtectedRoute element={<Services />} />}
              />
              <Route
                path="/Reservation"
                element={<ProtectedRoute element={<Reservation />} />}
              />
              <Route
                path="/Meetings"
                element={<ProtectedRoute element={<Meetings />} />}
              />
              <Route
                path="/TreatmentPlans"
                element={<ProtectedRoute element={<TreatmentPlans />} />}
              />
              <Route
                path="/Permissions"
                element={<ProtectedRoute element={<Permissions />} />}
              />
              <Route
                path="/Copon"
                element={<ProtectedRoute element={<Copon />} />}
              />
              <Route
                path="/Users"
                element={<ProtectedRoute element={<Users />} />}
              />
              <Route
                path="/LotalyProgram"
                element={<ProtectedRoute element={<LotalyProgram />} />}
              />
              <Route
                path="/Questions"
                element={<ProtectedRoute element={<Questions />} />}
              />
              <Route
                path="/Settings"
                element={<ProtectedRoute element={<Settings />} />}
              >
                <Route
                  path="PublicSettings"
                  element={<ProtectedRoute element={<PublicSettings />} />}
                />
                <Route
                  path="ReturnPolicy"
                  element={<ProtectedRoute element={<ReturnPolicy />} />}
                />
                <Route
                  path="CopyRights"
                  element={<ProtectedRoute element={<CopyRights />} />}
                />
                <Route
                  path="CommonQuestions"
                  element={<ProtectedRoute element={<CommonQuestions />} />}
                />
              </Route>
              <Route
                path="/RatingPage"
                element={<ProtectedRoute element={<RatingPage />} />}
              />
              <Route
                path="/DoctorsProfile/:id"
                element={<ProtectedRoute element={<DoctorsProfile />} />}
              />
              <Route
                path="/DoctorData"
                element={<ProtectedRoute element={<DoctorData />} />}
              />
              <Route
                path="/UpdateServices"
                element={<ProtectedRoute element={<UpdateServices />} />}
              />
              <Route
                path="/AddTreatmentPlans"
                element={<ProtectedRoute element={<AddTreatmentPlans />} />}
              />
              <Route
                path="/AddMeetings"
                element={<ProtectedRoute element={<AddMeetings />} />}
              />
              <Route
                path="/AddUsers"
                element={<ProtectedRoute element={<AddUsers />} />}
              />
              <Route
                path="/AddPermissions"
                element={<ProtectedRoute element={<AddPermissions />} />}
              />
              <Route
                path="/AddServices"
                element={<ProtectedRoute element={<AddServices />} />}
              />
              <Route
                path="/AddQuestions"
                element={<ProtectedRoute element={<AddQuestions />} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
