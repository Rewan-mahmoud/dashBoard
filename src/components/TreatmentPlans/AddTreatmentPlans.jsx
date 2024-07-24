import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AddTreatmentPlans = ({ onSave }) => {
  const location = useLocation();
  const plan = location.state?.plan || {};
  const [formData, setFormData] = useState({
    name_ar: plan.name_ar || '',
    name_en: plan.name_en || '',
    levels_num: plan.levels_num || '',
    details_ar: plan.details_ar || '',
    details_en: plan.details_en || '',
    objectives_ar: plan.objectives_ar || '',
    objectives_en: plan.objectives_en || '',
    price: plan.price || '',
    discount: plan.discount || '',
    file: plan.file || '',
    items: plan.level || [{ name_ar: '', name_en: '', session_num: '' }],
    sessionstypes: plan.sessionstype || [{ type_name: '', num: '' }],
    plandoctores: plan.plandoctores || [{ doctor_id: '', avalible_time: '', avalible_date: '' }]
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";
  const navigate = useNavigate();

  // Hardcoded list of doctors for demonstration purposes
  const doctors = [
    { id: 1, name: 'محمد الحامد احمد' },
    { id: 2, name: 'د. أحمد محمود' },
    { id: 3, name: 'د. علي حسين' }
  ];

  const handleAddItem = () => {
    setFormData(prevData => ({
      ...prevData,
      items: [...prevData.items, { name_ar: '', name_en: '', session_num: '' }]
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData(prevData => ({
      ...prevData,
      items: prevData.items.filter((item, i) => i !== index)
    }));
  };

  const handleAddSessionType = () => {
    setFormData(prevData => ({
      ...prevData,
      sessionstypes: [...prevData.sessionstypes, { type_name: '', num: '' }]
    }));
  };

  const handleRemoveSessionType = (index) => {
    setFormData(prevData => ({
      ...prevData,
      sessionstypes: prevData.sessionstypes.filter((sessionType, i) => i !== index)
    }));
  };

  const handleAddDoctor = () => {
    setFormData(prevData => ({
      ...prevData,
      plandoctores: [...prevData.plandoctores, { doctor_id: '', avalible_time: '', avalible_date: '' }]
    }));
  };

  const handleRemoveDoctor = (index) => {
    setFormData(prevData => ({
      ...prevData,
      plandoctores: prevData.plandoctores.filter((doctor, i) => i !== index)
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = formData.items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setFormData(prevData => ({
      ...prevData,
      items: newItems
    }));
  };

  const handleSessionTypeChange = (index, field, value) => {
    const newSessionTypes = formData.sessionstypes.map((sessionType, i) => 
      i === index ? { ...sessionType, [field]: value } : sessionType
    );
    setFormData(prevData => ({
      ...prevData,
      sessionstypes: newSessionTypes
    }));
  };

  const handleDoctorChange = (index, field, value) => {
    const newDoctors = formData.plandoctores.map((doctor, i) => 
      i === index ? { ...doctor, [field]: value } : doctor
    );
    setFormData(prevData => ({
      ...prevData,
      plandoctores: newDoctors
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const endpoint = plan.id ? `https://naql.nozzm.com/api/update_planseeions/${plan.id}` : 'https://naql.nozzm.com/api/add_planseeions';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'lang': 'ar',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log('Response:', result);
      if (result.status) {
        onSave(result.data);
        navigate('/treatment-plans');
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to save the treatment plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({
          ...prevData,
          file: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='container DoctorsProfile tables bg-white'>
      <div className="tableTitle d-flex justify-content-between">
        <h3>اضافة خطة علاجية</h3>
      </div>
      <form onSubmit={handleSave}>
        <div className="row settingForm justify-content-around">
          <div className="col-md-6">
            <label htmlFor="name_ar">الاسم باللغة العربية:</label>
            <input type="text" className="form-control" name="name_ar" value={formData.name_ar} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="name_en">الاسم باللغة الانجليزية:</label>
            <input type="text" className="form-control" name="name_en" value={formData.name_en} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="levels_num">عدد المراحل:</label>
            <input type="text" className="form-control" name="levels_num" value={formData.levels_num} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="price">السعر:</label>
            <input type="text" className="form-control" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label htmlFor="discount">الخصم:</label>
            <input type="text" className="form-control" name="discount" value={formData.discount} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label htmlFor="details_ar">التفاصيل بالعربية:</label>
            <input type="text" className="form-control py-5" name="details_ar" value={formData.details_ar} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label htmlFor="details_en">التفاصيل بالانجليزية:</label>
            <input type="text" className="form-control py-5" name="details_en" value={formData.details_en} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label htmlFor="objectives_ar">الأهداف بالعربية:</label>
            <input type="text" className="form-control py-5" name="objectives_ar" value={formData.objectives_ar} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label htmlFor="objectives_en">الأهداف بالانجليزية:</label>
            <input type="text" className="form-control py-5" name="objectives_en" value={formData.objectives_en} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label htmlFor="file">الملف:</label>
            <input type="file" className="form-control py-5" onChange={handleImageChange} />
          </div>

          <div className="col-md-12">
            <label>مراحل العلاج:</label>
            {formData.items.map((item, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-4">
                  <input type="text" className="form-control" placeholder="الاسم بالعربية" value={item.name_ar} onChange={(e) => handleItemChange(index, 'name_ar', e.target.value)} />
                </div>
                <div className="col-md-4">
                  <input type="text" className="form-control" placeholder="الاسم بالانجليزية" value={item.name_en} onChange={(e) => handleItemChange(index, 'name_en', e.target.value)} />
                </div>
                <div className="col-md-4">
                  <input type="text" className="form-control" placeholder="عدد الجلسات" value={item.session_num} onChange={(e) => handleItemChange(index, 'session_num', e.target.value)} />
                </div>
                {formData.items.length > 1 && (
                  <div className="col-md-12 text-end">
                    <button type="button" className="btn btn-danger" onClick={() => handleRemoveItem(index)}>حذف المرحلة</button>
                  </div>
                )}
              </div>
            ))}
            <div className="col-md-12 text-end">
              <button type="button" className="btn btn-success " onClick={handleAddItem}>إضافة مرحلة</button>
            </div>
          </div>

          <div className="col-md-12">
            <label>أنواع الجلسات:</label>
            {formData.sessionstypes.map((sessionType, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-6">
                  <select className="form-control" value={sessionType.type_name} onChange={(e) => handleSessionTypeChange(index, 'type_name', e.target.value)}>
                    <option value="">اختر نوع الجلسات</option>
                    <option value="تامل">تامل</option>
                    <option value="عادي">عادي</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control" placeholder="عدد الجلسات" value={sessionType.num} onChange={(e) => handleSessionTypeChange(index, 'num', e.target.value)} />
                </div>
                {formData.sessionstypes.length > 1 && (
                  <div className="col-md-12 text-end">
                    <button type="button" className="btn btn-danger" onClick={() => handleRemoveSessionType(index)}>حذف نوع الجلسة</button>
                  </div>
                )}
              </div>
            ))}
            <div className="col-md-12 text-end">
              <button type="button" className="btn btn-success " onClick={handleAddSessionType}>إضافة نوع جلسة</button>
            </div>
          </div>

          <div className="col-md-12">
            <label>المختصون:</label>
            {formData.plandoctores.map((doctor, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-4">
                  <select className="form-control" value={doctor.doctor_id} onChange={(e) => handleDoctorChange(index, 'doctor_id', e.target.value)}>
                    <option value="">اختر المختص</option>
                    {doctors.map(doc => (
                      <option key={doc.id} value={doc.id}>{doc.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <input type="time" className="form-control" placeholder="الوقت المتاح" value={doctor.avalible_time} onChange={(e) => handleDoctorChange(index, 'avalible_time', e.target.value)} />
                </div>
                <div className="col-md-4">
                  <input type="date" className="form-control" placeholder="التاريخ المتاح" value={doctor.avalible_date} onChange={(e) => handleDoctorChange(index, 'avalible_date', e.target.value)} />
                </div>
                {formData.plandoctores.length > 1 && (
                  <div className="col-md-12 text-end">
                    <button type="button" className="btn btn-danger" onClick={() => handleRemoveDoctor(index)}>حذف المختص</button>
                  </div>
                )}
              </div>
            ))}
            <div className="col-md-12 text-end">
              <button type="button" className="btn btn-success " onClick={handleAddDoctor}>إضافة مختص</button>
            </div>
          </div>

          <div className='BottomButtons'>
            <button className='save' type="submit" disabled={isLoading}>
              <span>{isLoading ? 'جاري الحفظ...' : 'حفظ'}</span>
            </button>
            <button type="button" className='cancel' onClick={() => navigate('/TreatmentPlans')}>
              <span>الغاء</span>
            </button>
          </div>
        </div>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default AddTreatmentPlans;
