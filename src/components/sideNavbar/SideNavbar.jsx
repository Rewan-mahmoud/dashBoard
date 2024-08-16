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
import drPicc from '../../assests/drPicc.svg';
import Doctorr from '../../assests/Doctorr.svg';

import "./sideNavbar.css";

import { Link } from 'react-router-dom';

function SideNavbar() {
    return (
      <>

  <div className="sideNavbar col-md-2 ">

 <nav className="nav nav-pills flex-column ">
<div className='d-flex NavTitle '>
<img src={Group} alt="" />
<Link   to="/Dashboard"  className="nav-link " >لوحة التحكم</Link>
</div>
<div className='d-flex NavTitle' >
<img src={Doctorr} alt="" />
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
<Link to="/Settings/PublicSettings" className="nav-link">  اعدادات عامة  </Link>
</div>
<div className='drPic text-center'>
<img className='  mt-2' src={drPicc} alt=""  />
<p>اهلا بعودتك,<span>احمد</span> </p>


</div>


</nav>
</div>
      </>

  
   
  
    );
  }
  
  export default SideNavbar;