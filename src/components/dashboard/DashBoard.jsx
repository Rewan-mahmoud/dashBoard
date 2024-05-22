import dr from '../../assests/SVGRepo_iconCarrier (1).svg';
import patient from '../../assests/colorPatient.svg';
import colorUsers from '../../assests/colorUsers.svg';
import Chart from '../../assests/Chart 1.png';
import Table from '../Table/Table';
import Rating from '../ratingBar/Rating';
import "./dashboard.css";

function DashBoard() {
    return (
      <>
      
    
<div className="DashBoard px-4 col-m-10">
      <div className="container">
      <div className="d-flex  nowrap">
  <div className="dashBoardCard d-flex col-md-4 ">
  <div className="circle">
    <img src={dr} alt="" />
  </div>
  <div className='titles'>
    <h4>الاطباء</h4>
    <span>100</span>

    <p><span className='number'>+5</span> تم الانضمام خلال هدا الاسبوع

    </p>
  </div>
</div>



  <div className="dashBoardCard d-flex col-md-4  ">
  <div className="circle">
    <img src={patient} alt="" />
  </div>
  <div className='titles'>
    <h4>المرضى </h4>
    <span>100k</span>

    <p><span className='number'>3</span> تم الانضمام خلال هدا الاسبوع

    </p>
  </div>
</div>
  <div className="dashBoardCard d-flex col-md-4 ">
  <div className="circle">
    <img src={colorUsers} alt="" />
  </div>
  <div className='titles'>
    <h4>طاقم العمل</h4>
    <span>+150</span>

    <p><span className='number'>3</span> تم الانضمام خلال هدا الاسبوع

    </p>
  </div>
</div>



    </div>
    <div className="Chart">
  <img src={Chart} alt="" />
  </div>

<Table/>
<Rating/>

      </div>
 
  </div>
  
   
      </>

 
   
  
    );
  }
  
  export default DashBoard;