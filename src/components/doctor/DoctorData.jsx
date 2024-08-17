import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import trash from '../../assests/trash.svg';

export default function DoctorData() {
  const location = useLocation();
  const doctor = location.state?.doctor || {};
  const [formData, setFormData] = useState({
    nameArabic: doctor.name || '',
    nameEnglish: doctor.nameEnglish || '',
    mobile: doctor.mobile || '',
    gender: doctor.gender || '',
    email: doctor.email || '',
    country: doctor.country || '',
    experience: doctor.exp_num || '',
    bio: doctor.details || '',
    bioEnglish: doctor.bioEnglish || '',
    skills: doctor.skiles || '',
    skillsEnglish: doctor.skillsEnglish || '',
    specialties: doctor.specialties || '',
    specialtiesEnglish: doctor.specialtiesEnglish || '',
  });
  const [works, setWorks] = useState(doctor.work_times || [{ id: 1, start: '', end: '' }]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";

  const navigate = useNavigate();

  // Refs for the file inputs
  const imageRef = useRef(null);
  const sealsRef = useRef(null);
  const signatureRef = useRef(null);

  useEffect(() => {
    if (doctor.id) {
      setFormData({
        nameArabic: doctor.name || '',
        nameEnglish: doctor.nameEnglish || '',
        mobile: doctor.mobile || '',
        gender: doctor.gender || '',
        email: doctor.email || '',
        country: doctor.country || '',
        experience: doctor.exp_num || '',
        bio: doctor.details || '',
        bioEnglish: doctor.bioEnglish || '',
        skills: doctor.skiles || '',
        skillsEnglish: doctor.skillsEnglish || '',
        specialties: doctor.specialties || '',
        specialtiesEnglish: doctor.specialtiesEnglish || '',
      });
      setWorks(doctor.work_times || [{ id: 1, start: '', end: '' }]);
    }
  }, [doctor]);

  const addWork = () => {
    setWorks([...works, { id: works.length + 1, start: '', end: '' }]);
  };

  const removeWork = (id) => {
    if (id !== 1) { // Ensure the first work item is not removed
      setWorks(works.filter(work => work.id !== id));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
        const formDataToSend = new FormData();

        formDataToSend.append('name_ar', formData.nameArabic || '');
        formDataToSend.append('name_en', formData.nameEnglish || '');
        formDataToSend.append('details_ar', formData.bio || '');
        formDataToSend.append('details_en', formData.bioEnglish || '');
        formDataToSend.append('specialties_ar', formData.specialties || '');
        formDataToSend.append('specialties_en', formData.specialtiesEnglish || '');
        formDataToSend.append('gender', formData.gender || '');
        formDataToSend.append('country', formData.country || '');
        formDataToSend.append('skiles_ar', formData.skills || '');
        formDataToSend.append('skiles_en', formData.skillsEnglish || '');
        formDataToSend.append('exp_num', formData.experience || '');
        formDataToSend.append('email', formData.email || '');
        formDataToSend.append('mobile', formData.mobile || '');
        formDataToSend.append('work_times', JSON.stringify(works.map(({ start, end }) => ({ start, end }))));

        // Check if new images are uploaded; if not, use the existing URLs
        if (imageRef.current && imageRef.current.files[0]) {
            formDataToSend.append('image', imageRef.current.files[0]);
        } else if (doctor.image) {
            formDataToSend.append('image', doctor.image);
        }

        if (sealsRef.current && sealsRef.current.files[0]) {
            formDataToSend.append('seals', sealsRef.current.files[0]);
        } else if (doctor.seals) {
            formDataToSend.append('seals', doctor.seals);
        }

        if (signatureRef.current && signatureRef.current.files[0]) {
            formDataToSend.append('signature', signatureRef.current.files[0]);
        } else if (doctor.signature) {
            formDataToSend.append('signature', doctor.signature);
        }

        const endpoint = doctor.id 
            ? `https://naql.nozzm.com/api/update_doctores/${doctor.id}` 
            : 'https://naql.nozzm.com/api/add_doctores';
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'lang': 'en',
            },
            body: formDataToSend,
        });

        const result = await response.json();
        if (!response.ok) {
            setError(result.message || 'Failed to add/update doctor');
            setIsLoading(false);
            return;
        }

        navigate('/Doctor');
    } catch (error) {
        setError('Failed to fetch. Please check your network connection and try again.');
        setIsLoading(false);
    }
};



  return (
    <div className='container DoctorsProfile tables bg-white'>
      <div className="tableTitle d-flex justify-content-between">
        <h3>بيانات الطبيب المعالج</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row settingForm justify-content-around">
          <div className="col-md-6">
            <label htmlFor="nameArabic">الاسم باللغة العربية:</label>
            <input type="text" className="form-control" name="nameArabic" value={formData.nameArabic} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="nameEnglish">الاسم باللغة الانجليزية:</label>
            <input type="text" className="form-control" name="nameEnglish" value={formData.nameEnglish} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="mobile">رقم الجوال:</label>
            <input type="text" className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="gender">الجنس:</label>
            <input type="text" className="form-control" name="gender" value={formData.gender} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="email">الايميل:</label>
            <input type="text" className="form-control" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="country">الدولة:</label>
            <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} />
          </div>

          <div id="work-container" className="col-md-12">
            {works.map((work, index) => (
              <div className="d-flex justify-content-around work mt-3" key={work.id}>
                <div className="col-md-5">
                  <label htmlFor={`start-${work.id}`}>بداية دوام:</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`start-${work.id}`}
                    value={work.start}
                    onChange={(e) => {
                      const newWorks = [...works];
                      newWorks[index].start = e.target.value;
                      setWorks(newWorks);
                    }}
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor={`end-${work.id}`}>نهاية دوام:</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`end-${work.id}`}
                    value={work.end}
                    onChange={(e) => {
                      const newWorks = [...works];
                      newWorks[index].end = e.target.value;
                      setWorks(newWorks);
                    }}
                  />
                </div>
                {work.id !== 1 && (
                  <img
                    src={trash}
                    className="trash"
                    alt="Delete"
                    onClick={() => removeWork(work.id)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="col-md-12 mt-3 addAnotherWork">
            <input
              type="button"
              value="اضافة دوام اخر"
              className="form-control text-center addWork"
              onClick={addWork}
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="experience">الخبرة:</label>
            <input type="text" className="form-control" name="experience" value={formData.experience} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label htmlFor="bio">سيرة شحصية:</label>
            <input type="text" className="form-control py-5" name="bio" value={formData.bio} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label htmlFor="bioEnglish">سيرة شحصية باللغة الانجليزية:</label>
            <input type="text" className="form-control py-5" name="bioEnglish" value={formData.bioEnglish} onChange={handleChange} />
          </div>
          
          <div className="col-md-12">
            <label htmlFor="image">صورة الطبيب:</label>
            {doctor.image && (
              <div className="mb-3">
                <img src={doctor.image} alt="Doctor" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </div>
            )}
            <input type="file" name="image" ref={imageRef} className="form-control" />
          </div>

          <div className="col-md-12">
            <label htmlFor="skills">المهارات:</label>
            <input type="text" className="form-control py-5" name="skills" value={formData.skills} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label htmlFor="skillsEnglish">المهارات باللغة الانجليزية:</label>
            <input type="text" className="form-control py-5" name="skillsEnglish" value={formData.skillsEnglish} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label htmlFor="specialties">التخصصات:</label>
            <input type="text" className="form-control py-5" name="specialties" value={formData.specialties} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label htmlFor="specialtiesEnglish">التخصصات باللغة الانجليزية:</label>
            <input type="text" className="form-control py-5" name="specialtiesEnglish" value={formData.specialtiesEnglish} onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label htmlFor="seals">الختم:</label>
            {doctor.seals && (
              <div className="mb-3">
                <img src={doctor.seals} alt="Seals" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </div>
            )}
            <input type="file" name="seals" ref={sealsRef} className="form-control" />
          </div>

          <div className="col-md-6">
            <label htmlFor="signature">التوقيع:</label>
            {doctor.signature && (
              <div className="mb-3">
                <img src={doctor.signature} alt="Signature" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </div>
            )}
            <input type="file" name="signature" ref={signatureRef} className="form-control" />
          </div>

          <div className='BottomButtons'>
            <button className='save' type="submit" disabled={isLoading}>
              <span>{isLoading ? 'جاري الحفظ...' : 'حفظ'}</span>
            </button>
            <button className='cancel' type="button" onClick={() => navigate('/Doctor')}>
              <span> الغاء</span>
            </button>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
      </form>
    </div>
  );
}
