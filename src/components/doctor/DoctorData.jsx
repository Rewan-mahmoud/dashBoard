import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import trash from '../../assests/trash.svg';
import add from '../../assests/add-image.svg';
import upload from '../../assests/uploaddd.svg';
import { useAuth } from '../../AuthContext';

export default function DoctorData() {
  const location = useLocation();
  const doctor = location.state?.doctor || {};
  const [formData, setFormData] = useState({
    nameArabic: doctor.nameArabic || '',
    nameEnglish: doctor.nameEnglish || '',
    mobile: doctor.mobile || '',
    gender: doctor.gender || '',
    email: doctor.email || '',
    country: doctor.country || '',
    experience: doctor.experience || '',
    bio: doctor.bio || '',
    bioEnglish: doctor.bioEnglish || '',
    skills: doctor.skills || '',
    skillsEnglish: doctor.skillsEnglish || '',
    specialties: doctor.specialties || '',
    specialtiesEnglish: doctor.specialtiesEnglish || '',
    image: doctor.image || '',
    seals: doctor.seals || '',
    signature: doctor.signature || '',
  });
  const [works, setWorks] = useState(doctor.work_times || [{ id: 1, start: '', end: '' }]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (doctor.id) {
      setFormData({
        nameArabic: doctor.name,
        nameEnglish: doctor.nameEnglish,
        mobile: doctor.mobile,
        gender: doctor.gender,
        email: doctor.email,
        country: doctor.country,
        experience: doctor.exp_num,
        bio: doctor.details,
        bioEnglish: doctor.bioEnglish,
        skills: doctor.skiles,
        skillsEnglish: doctor.skillsEnglish,
        specialties: doctor.specialties,
        specialtiesEnglish: doctor.specialtiesEnglish,
        image: doctor.image,
        seals: doctor.seals,
        signature: doctor.signature,
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
      const response = await fetch('https://naql.nozzm.com/api/add_doctores', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'lang': 'ar',
        },
        body: JSON.stringify({
          ...formData,
          work_times: works.map(({ start, end }) => ({ start, end })),
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.message || 'Failed to add doctor');
        setIsLoading(false);
        return;
      }

      // Redirect to the doctor table after successful submission
      navigate('/');
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
            {formData.image ? (
              <img src={formData.image} alt="Doctor" className="img-thumbnail mb-3" />
            ) : (
              <div className="form-group files">
                <img className="addUpload" src={add} alt="" />
                <div className='fileUpload'>اسقط او اسحب, او <span> اختار</span> ملفا للتحميل</div>
                <input type="file" className="form-control" multiple />
              </div>
            )}
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
            {formData.seals ? (
              <img src={formData.seals} alt="Seal" className="img-thumbnail mb-3" />
            ) : (
              <div className="form-group files">
                <img className="upload" src={upload} alt="" />
                <div className='fileUpload'>اسقط او اسحب, او <span> اختار</span> ملفا للتحميل</div>
                <input type="file" className="form-control" multiple />
              </div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="signature ">التوقيع:</label>
            {formData.signature ? (
              <img src={formData.signature} alt="Signature" className="img-thumbnail mb-3" />
            ) : (
              <div className="form-group files">
                <img className="upload" src={upload} alt="" />
                <div className='fileUpload'>اسقط او اسحب, او <span> اختار</span> ملفا للتحميل</div>
                <input type="file" className="form-control" multiple />
              </div>
            )}
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
