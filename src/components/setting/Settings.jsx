import './setting.css'; 
import { NavLink, Outlet } from 'react-router-dom';


function Settings() {
  const tabs = [
    { title: "اعدادات عامة", path: "PublicSettings" },
    { title: " سياسة الاسترجاع", path: "ReturnPolicy" },
    { title: "حقوق الملكية والنشر", path: "CopyRights" },
    { title: " الاسئلة الشائعة", path: "CommonQuestions" },

  ]
  return (
    <>
      <nav className="navbar settingNav navbar-expand-lg navbar-light mt-4  ">
    
      {tabs.map((item , index)=>  
        
        <NavLink activeClassName="active" className="nav-link ps-4" key={index}  to={item.path}>{item.title}</NavLink>)}
      </nav>

      <div className="container tables bg-white mt-4">
      <Outlet/>
  
      </div>

      
    </>
  );
}

export default Settings;
