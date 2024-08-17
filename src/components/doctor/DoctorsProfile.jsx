import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import starFilled from "../../assests/star.svg";
import doctorPhoto from '../../assests/doctotph.png';
import seal from '../../assests/seal.svg';
import signature from '../../assests/signature.svg';

const DoctorsProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [error, setError] = useState(null);
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";

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
          <p className='mt-4'>{doctor.details} <span>4.5 <img src={starFilled} alt="" /></span></p>
          <p className='me-3'>{doctor.mobile}</p>
        </div>
      </div>
      <div className='work DoctorsProfileTitle'>
        <h2>الدوام</h2>
        <div className="d-flex align-items-center mt-5">
          <div className='time'><span> 7 ص</span></div>
          <p>الي</p>
          <div className='time'><span> 7 م</span></div>
        </div>
   
      </div>
      <div className='pref DoctorsProfileTitle'>
        <h2>االسيرة الشخصية</h2>
        <p>{doctor.specialties}</p>
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
          {doctor.skiles?.split(',').map((skill, index) => (
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
