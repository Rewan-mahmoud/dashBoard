import React, { useState } from 'react';
import starFilled from "../../assests/star.svg";
import doctorPhoto from '../../assests/doctotph.png';
import seal from '../../assests/seal.svg';
import signature from '../../assests/signature.svg';

// import "./Services.css"
export default function DoctorsProfile() {

    
      return (
        <div className="container DoctorsProfile tables bg-white mt-5">
          <div className="tableTitle  ">
          <h3 > الملف الشخصي للطبيب  </h3>
       
          </div>
          <div className='d-flex '>
            <div><img src={doctorPhoto} alt="" /></div>
            <div className='doctorProfileInfo'>
              <h2>لينا الوردياني </h2>
              <p className='mt-4'>اخصائي اجتماعي <span>4.5 <img src={starFilled} alt="" /></span></p>
              <p className='me-3'>0128991034</p>
            </div>
          </div>
          <div className='work DoctorsProfileTitle'>
            <h2 >الدوام</h2>
            <div className="d-flex align-items-center  mt-5">
            <div className='time  '> <span> 7 ص</span></div>
         <p>الي</p>
         <div className='time'> <span> 7 م</span></div>
            </div>
            <div className="d-flex  align-items-center mt-5">
            <div className='time'> <span> 7 ص</span></div>
         <p>الي</p>
         <div className='time'> <span> 7 م</span></div>
            </div>

          </div>
          <div className='pref DoctorsProfileTitle'>
          <h2>االسيرة الشخصية</h2>
            <p>اخصائي اسري حاصلة علي درجة البكالريوس في التوجيه والاصلاح الاسريطبيب استشارى حاصل على البورد الاميريكي والبورد السعودى والزمالة فى الطب النفسي الجسدي وخبرة تزيد عن خمس اعوام طبيب استشارى حاصل على البورد الاميريكي والبورد السعودى والزمالة فى الطب النفسي الجسدي وخبرة تزيد عن خمس اعوام طبيب استشارى حاصل على البورد الاميريكي والبورد السعودى والزمالة فى الطب النفسي الجسدي </p>
          </div>
          <div className=' special DoctorsProfileTitle'>
          <h2>التخصصات </h2>
        <div className='description d-flex flex-wrap'>
        <p>صمت الزوج</p>
<p>التعامل مع كبار السن</p>
<p>صمت الزوج</p>
<p>التعامل مع كبار السن</p>
<p>صمت الزوج</p>
<p>التعامل مع كبار السن</p>
<p>صمت الزوج</p>
<p>التعامل مع كبار السن</p>
<p>صمت الزوج</p>
<p>التعامل مع كبار السن</p>
<p>صمت الزوج</p>
<p>التعامل مع كبار السن</p>
<p>صمت الزوج</p>
        </div>
          </div>
          <div className='pref DoctorsProfileTitle'>
          <h2>الخبرة </h2>
            <p> خبرة  5 سنوات فى اخصائي اسري حاصلة علي درجة البكالريوس في التوجيه والاصلاح الاسريطبيب استشارى حاصل على البورد الاميريكي والبورد السعودى والزمالة فى الطب النفسي الجسدي وخبرة تزيد عن خمس اعوام طبيب استشارى حاصل على البورد الاميريكي</p>
          </div>
          <div className=' special DoctorsProfileTitle'>
          <h2>المهارات </h2>
        <div className='description d-flex flex-wrap'>

<p>الطب النفسي</p>
<p> الرهاب الاجتماعي  </p>
<p>اللغة الانجليزية</p>
<p>الطب النفسي</p>
<p> الرهاب الاجتماعي  </p>
<p>اللغة الانجليزية</p>
<p>الطب النفسي</p>
<p> الرهاب الاجتماعي  </p>
<p>اللغة الانجليزية</p>
        </div>


          </div>
          <div className='seal DoctorsProfileTitle'>
            <h2>الختم</h2>
            <div className='text-center'>
            <img src={seal} alt="" />

            </div>
          </div>
          <div className='seal DoctorsProfileTitle'>
            <h2>التوقيع</h2>
            <div className='text-center'>
            <img src={signature} alt="" />

            </div>
          </div>

  </div>
       
      );
    };
    
  



