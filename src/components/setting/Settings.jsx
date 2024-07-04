import './setting.css'; 
import { NavLink, Outlet } from 'react-router-dom';


function Settings() {
  const tabs = [
    { title: "اعدادات عامة", path: "PublicSettings" },
    { title: " اظهار و اخفاء بعض التفاصيل", path: "VisibilitySettings" },
    { title: " سياسة الاسترجاع", path: "ReturnPolicy" },
    { title: "حقوق الملكية والنشر", path: "CopyRights" },
    { title: " الاسئلة الشائعة", path: "CommonQuestions" },

  ]
  return (
    <>
      <nav className="navbar settingNav navbar-expand-lg navbar-light  ">
    
      {tabs.map((item , index)=>  
        
        <NavLink activeClassName="active" className="nav-link " key={index}  to={item.path}>{item.title}</NavLink>)}
      </nav>

      <div className="container tables bg-white mt-5">
      <Outlet/>
  
      </div>

      
    </>
  );
}

export default Settings;
