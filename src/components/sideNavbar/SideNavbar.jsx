import jam_screen from '../../assests/jam_screen.svg';
import healthicons from '../../assests/healthicons_doctor-male.svg';
import patient from '../../assests/Vector (3).svg';
import vector from '../../assests/Vector (4).svg';
import vector2 from '../../assests/Vector (6).svg';
import Group from '../../assests/Group 1.svg';
import flowbite from '../../assests/flowbite_command-outline.svg';
import Frame from '../../assests/Frame 1410127010.svg';
import play from '../../assests/play.svg';
import Group2 from '../../assests/Group 36689.svg';
import akar from '../../assests/akar-icons_chat-approve.svg';
import circle from '../../assests/mdi_sale-circle-outline.svg';
import users from '../../assests/ph_users-three.svg';
import carbon from '../../assests/carbon_cics-program.svg';
import question from '../../assests/question.svg';
import setting from '../../assests/tdesign_setting-1.svg';
import drPic from '../../assests/drPic.svg';
 

import "./sideNavbar.css";

import { Link } from 'react-router-dom';

function SideNavbar() {
    return (
      <>

  <div className="sideNavbar col-md-2   ">

 <nav class="nav nav-pills flex-column ">
<div className='d-flex NavTitle '>
<img src={Group} alt="" />
<Link   to="/Dashboard"  className="nav-link " >لوحة التحكم</Link>
</div>
<div className='d-flex NavTitle' >
<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="2em" viewBox="0 0 48 48"><g fill="currentColor"><path fill-rule="evenodd" d="M33.834 13.81c0 3.461-.86 7.975-2.183 7.29a8.001 8.001 0 0 1-15.611-1.54c-1.313-2.297-3.035-6.9 1.392-10.488c.08-.026.128-.242.2-.56c.274-1.203.881-3.877 4.71-3.366c2.953.393 11.492 1.918 11.492 8.665m-3.806 2.182s-.452 1.322-.028 2.795a6 6 0 0 1-11.996.197c.145-.55.145-1.481.144-2.516c-.001-1.867-.003-4.07.852-4.968c5.989 3.989 11.028 4.492 11.028 4.492" clip-rule="evenodd"/><path d="M13 36c0-1.082.573-2.03 1.433-2.558a12 12 0 0 1-.092-.375a22 22 0 0 1-.355-2.068a20 20 0 0 1-.155-2.006C9.61 30.65 6 33.538 6 36.57V42h36v-5.43c0-2.904-3.31-5.675-7.298-7.36v.028c.018.61-.016 1.31-.082 1.983c-.06.624-.149 1.246-.256 1.779H35a1 1 0 0 1 .894.553l1 2c.07.139.106.292.106.447v2a1 1 0 0 1-1 1h-2v-2h1v-.764L34.382 35h-2.764L31 36.236V37h1v2h-2a1 1 0 0 1-1-1v-2c0-.155.036-.308.106-.447l1-2A1 1 0 0 1 31 33h1.315q.033-.129.066-.286c.1-.471.189-1.068.249-1.685c.06-.618.088-1.231.073-1.735a5 5 0 0 0-.049-.624c-.022-.142-.044-.207-.048-.221q-.002-.005 0-.002l.003-.001A22 22 0 0 0 31 28.013c-.503-.115-1.023.577-1.25 1.01H18l-.086-.168c-.212-.422-.473-.943-.914-.842q-.578.131-1.155.297a7 7 0 0 0-.016.527c.004.553.057 1.23.142 1.914c.085.682.2 1.346.32 1.87q.052.227.1.404A3 3 0 1 1 13 36"/><path d="M17 36c0 .574-.462 1.015-1 1.015s-1-.44-1-1.015c0-.574.462-1.015 1-1.015s1 .44 1 1.015"/></g></svg>
<Link   to="/Doctor" className="nav-link">الدكتور</Link>

</div>
<div className='d-flex NavTitle'>
<img src={patient} alt="" />
<Link  to= "/Patients" className="nav-link" >المرضي</Link>

</div>
<div className='d-flex NavTitle'>
<img src={vector} alt="" />
<Link   to="/Categories" className="nav-link " >الفئات</Link>
</div>
<div className='d-flex NavTitle'>
<img src={vector2} alt="" />
<Link  to="/Subcategories" className="nav-link">  الفئات الفرعية </Link>
</div>

<div className='d-flex NavTitle'>
<img src={jam_screen} alt="" />
<Link to="/slider" className="nav-link">  السليدر </Link>
</div>

<div className='d-flex NavTitle'>
<img src={flowbite} alt="" />
<Link to="/Services" className="nav-link">  الخدمات </Link>
</div>
<div className='d-flex NavTitle'>
<img src={Frame} alt="" />
<Link  to="Reservation" className="nav-link">  الحجوزات </Link>
</div>

<div className='d-flex NavTitle'>
<img src={play} alt="" />
<Link to="Meetings" className="nav-link">  اللقائات </Link>
</div>

<div className='d-flex NavTitle'>
<img src={Group2} alt="" />
<Link to="TreatmentPlans"  className="nav-link">  الخطط العلاجية</Link>
</div>

<div className='d-flex NavTitle'>
<img src={circle} alt="" />
<Link to="/Copon"  className="nav-link">  كوبونات الخصم </Link>
</div>

<div className='d-flex NavTitle'>
<img src={akar} alt="" />
<Link to="Permissions" className="nav-link">  الصلاحيات </Link>
</div>





<div className='d-flex NavTitle'>
<img src={users} alt="" />
<Link to="Users"  className="nav-link">المستخدمين  </Link>
</div>

<div className='d-flex NavTitle'>
<img src={carbon} alt="" />
<Link to="LotalyProgram" className="nav-link">  برنامج الولاء  </Link>
</div>

<div className='d-flex NavTitle'>
<img src={question} alt="" />
<Link to="Questions" className="nav-link">   اسئلة واجوبة  </Link>
</div>

<div className='d-flex NavTitle'>
<img src={setting} alt="" />
<Link to="Settings" className="nav-link">  اعدادات عامة  </Link>
</div>
<img className='  mt-5' src={drPic} alt=""  />
</nav>
</div>




      </>

  
   
  
    );
  }
  
  export default SideNavbar;