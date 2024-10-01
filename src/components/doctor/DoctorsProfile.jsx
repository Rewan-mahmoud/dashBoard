import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import starFilled from "../../assests/star.svg";
import doctorPhoto from '../../assests/doctotph.png';
import seal from '../../assests/seal.svg';
import signature from '../../assests/signature.svg';
import { useAuth } from '../../AuthContext';

const DoctorsProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`https://naql.nozzm.com/api/show_doctores/${id}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'lang': 'ar',
          },
        });

        const result = await response.json();
        if (result.status) {
          setDoctor(result.data);
        } else {
          console.error('Failed to fetch data:', result.message);
          setError(result.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchDoctor();
  }, [id]);

  return (
    <div className="container DoctorsProfile tables bg-white mt-5">
      <div className="tableTitle">
        <h3>الملف الشخصي للطبيب</h3>
      </div>
      <div className='d-flex'>
        <div className='imgDr'>
          <img src={doctor.image || doctorPhoto} alt={doctor.name} />
        </div>
        <div className='doctorProfileInfo'>
          <h2>{doctor.name}</h2>
          <p className='mt-4'>{doctor.specialties} <span>4.5 <img src={starFilled} alt="" /></span></p>
          <p className='me-3'>{doctor.mobile}</p>
        </div>
      </div>
      
      <div className='work DoctorsProfileTitle'>
  <h2>الدوام</h2>
  {doctor.Attendance && doctor.Attendance.length > 0 ? (
    doctor.Attendance.map((attendance, index) => (
      <div className="d-flex align-items-center mt-5" key={index}>
        <div className='time'>
          <span>{attendance.start_time} صباحا</span>
        </div>
        <p>الي</p>
        <div className='time'>
          <span>{attendance.end_time} مساء</span>
        </div>
      </div>
    ))
  ) : (
    <p>لا يوجد دوام مسجل.</p>
  )}
</div>


      <div className='pref DoctorsProfileTitle'>
        <h2>االسيرة الشخصية</h2>
        <p>{doctor.details}</p>
      </div>
      <div className='special DoctorsProfileTitle'>
        <h2>التخصصات </h2>
        <div className='description d-flex flex-wrap'>
          {doctor.specialties?.split(',').map((specialty, index) => (
            <p key={index}>{specialty}</p>
          ))}
        </div>
      </div>
      <div className='pref DoctorsProfileTitle'>
        <h2>الخبرة </h2>
        <p>خبرة {doctor.exp_num} سنوات في {doctor.details}</p>
      </div>
      <div className='special DoctorsProfileTitle'>
        <h2>المهارات </h2>
        <div className='description d-flex flex-wrap'>
          {doctor.skills?.split(',').map((skill, index) => (
            <p key={index}>{skill}</p>
          ))}
        </div>
      </div>
      <div className='seal DoctorsProfileTitle'>
        <h2>الختم</h2>
        <div className='text-center'>
          <img src={doctor.seals || seal} alt="seal" />
        </div>
      </div>
      <div className='seal DoctorsProfileTitle'>
        <h2>التوقيع</h2>
        <div className='text-center'>
          <img src={doctor.signature || signature} alt="signature" />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default DoctorsProfile;
