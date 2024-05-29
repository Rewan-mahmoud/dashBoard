import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from "./components/Header/Header"
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
// import PublicSettings from './components/setting/PublicSettings';


function App() {

  return (
    <div className="App">
     <Header/>
     <Router>
      <div className="container-fluid">
        <div className="row">
          <SideNavbar />
          <div className="col">
            <Routes> {/* Replace Route with Routes */}
              <Route path="/" element={<DashBoard />} /> {/* Use 'element' prop to specify component */}
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
              <Route path="/Settings" element={<Settings />} >
              <Route path="PublicSettings" element={<PublicSettings />} />
              <Route path="VisibilitySettings" element={<VisibilitySettings />} />
              <Route path="ReturnPolicy" element={<ReturnPolicy />} />
              <Route path="CopyRights" element={<CopyRights />} />
              <Route path="CommonQuestions" element={<CommonQuestions />} />
            </Route>
              <Route path="RatingPage" element={<RatingPage />} />
              <Route path="DoctorsProfile" element={<DoctorsProfile />} />
              <Route path="DoctorData" element={<DoctorData />} />
        
        
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
