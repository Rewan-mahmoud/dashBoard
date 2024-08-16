import React, { useState, useEffect } from 'react';
import plus from '../../assests/Plusss.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import deletee from '../../assests/delete.svg';

export default function AddServices() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dynamicInputs, setDynamicInputs] = useState([
    { specialist: '', details: [{ sessions_kind: '', sessions_num: '', sessions_time: '', price: '' }] }
  ]);
  const [fixedInputs, setFixedInputs] = useState({ category: '', subCategory: '' });
  const [error, setError] = useState(null);
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://naql.nozzm.com/api/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'lang': 'ar',
          }
        });
        const result = await response.json();
        if (result.status) {
          const categoriesSet = new Map();
          const subCategoriesSet = new Map();
          const doctorsSet = new Map();

          result.data.data.forEach(service => {
            categoriesSet.set(service.category.name, service.category.id);
            subCategoriesSet.set(service.sub_category.name, service.sub_category.id);
            service.Service_doctors.forEach(doctor => {
              doctorsSet.set(doctor.doctors.name, doctor.doctors.id);
            });
          });

          setCategories(Array.from(categoriesSet));
          setSubCategories(Array.from(subCategoriesSet));
          setDoctors(Array.from(doctorsSet));
        } else {
          console.error('Failed to fetch data:', result.message);
          setError(result.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [token]);

  const handleAddService = () => {
    setDynamicInputs([...dynamicInputs, { specialist: '', details: [{ sessions_kind: '', sessions_num: '', sessions_time: '', price: '' }] }]);
  };

  const handleFixedInputChange = (field, value) => {
    setFixedInputs({ ...fixedInputs, [field]: value });
  };

  const handleInputChange = (inputIndex, detailIndex, field, value) => {
    const updatedDynamicInputs = [...dynamicInputs];
    if (field === 'specialist') {
      updatedDynamicInputs[inputIndex][field] = value;
    } else {
      updatedDynamicInputs[inputIndex].details[detailIndex][field] = value;
    }
    setDynamicInputs(updatedDynamicInputs);
  };

  const handleAddDetail = (inputIndex) => {
    const updatedDynamicInputs = [...dynamicInputs];
    updatedDynamicInputs[inputIndex].details.push({ sessions_kind: '', sessions_num: '', sessions_time: '', price: '' });
    setDynamicInputs(updatedDynamicInputs);
  };

  const handleDeleteDetail = (inputIndex, detailIndex) => {
    const updatedDynamicInputs = [...dynamicInputs];
    if (updatedDynamicInputs[inputIndex].details.length > 1) {
      updatedDynamicInputs[inputIndex].details.splice(detailIndex, 1);
      setDynamicInputs(updatedDynamicInputs);
    }
  };

  const handleSaveAll = async () => {
    const selectedCategory = categories.find(category => category[0] === fixedInputs.category);
    const selectedSubCategory = subCategories.find(subCategory => subCategory[0] === fixedInputs.subCategory);

    if (!selectedCategory || !selectedSubCategory) {
      alert('Please make sure all fields are selected');
      return;
    }

    const payload = dynamicInputs.map(input => {
      const selectedDoctor = doctors.find(doctor => doctor[0] === input.specialist);
      return input.details.map(detail => ({
        doctors_id: selectedDoctor[1],
        sessions_kind: detail.sessions_kind,
        sessions_num: detail.sessions_num,
        sessions_time: detail.sessions_time,
        price: detail.price
      }));
    }).flat();

    const servicePayload = {
      cat_id: selectedCategory[1],
      sub_id: selectedSubCategory[1],
      items: payload.map(item => ({ doctors_id: item.doctors_id })),
      servicetimes: payload.map(item => ({
        sessions_kind: item.sessions_kind,
        sessions_num: item.sessions_num,
        sessions_time: item.sessions_time,
        price: item.price
      }))
    };

    try {
      const response = await fetch('https://naql.nozzm.com/api/add_service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'lang': 'ar',
        },
        body: JSON.stringify(servicePayload)
      });
      const result = await response.json();
      if (result.status) {
        alert('Service added successfully!');
      } else {
        alert('Failed to add service: ' + result.message);
      }
    } catch (error) {
      alert('Error adding service: ' + error.message);
    }
  };

  return (
    <>
      <div className="container settingForm tables bg-white mt-5">
        <div className="tableTitle">
          <h3>الخدمات</h3>
        </div>
        <div className="row mb-3">
          <div className="col-md-3">
            <div className="custom-select">
              <select
                className="form-control"
                value={fixedInputs.category}
                onChange={(e) => handleFixedInputChange('category', e.target.value)}
              >
                <option value="">الفئه الاساسية</option>
                {categories.map((category, index) => (
                  <option key={index} value={category[0]}>{category[0]}</option>
                ))}
              </select>
              <div className="arrow-icon">
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="custom-select">
              <select
                className="form-control"
                value={fixedInputs.subCategory}
                onChange={(e) => handleFixedInputChange('subCategory', e.target.value)}
              >
                <option value="">الفئات الفرعية</option>
                {subCategories.map((subCategory, index) => (
                  <option key={index} value={subCategory[0]}>{subCategory[0]}</option>
                ))}
              </select>
              <div className="arrow-icon">
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className='AddServicesButton'>
              <button onClick={handleAddService}>
                <img src={plus} alt="" />
                <span className='pe-3'>اضافة</span>
              </button>
            </div>
          </div>
        </div>
        {dynamicInputs.map((input, inputIndex) => (
          <div key={inputIndex} className="dynamic-input-section mt-5">
            <div className="row mb-3">
              <div className="col-md-3">
                <div className="custom-select">
                  <select
                    className="form-control"
                    value={input.specialist}
                    onChange={(e) => handleInputChange(inputIndex, -1, 'specialist', e.target.value)}
                  >
                    <option value="">المختصون</option>
                    {doctors.map((doctor, docIndex) => (
                      <option key={docIndex} value={doctor[0]}>{doctor[0]}</option>
                    ))}
                  </select>
                  <div className="arrow-icon">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                </div>
              </div>
            </div>
            {input.details.map((detail, detailIndex) => (
              <div key={detailIndex} className="row mb-3">
                <div className="col-md-3 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="نوع الجلسة"
                    value={detail.sessions_kind}
                    onChange={(e) => handleInputChange(inputIndex, detailIndex, 'sessions_kind', e.target.value)}
                  />
                </div>
                <div className="col-md-3 mt-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="عدد الجلسات"
                    value={detail.sessions_num}
                    onChange={(e) => handleInputChange(inputIndex, detailIndex, 'sessions_num', e.target.value)}
                  />
                </div>
                <div className="col-md-3 mt-3">
                  <input
                    type="time"
                    className="form-control"
                    placeholder="مدة الجلسات"
                    value={detail.sessions_time}
                    onChange={(e) => handleInputChange(inputIndex, detailIndex, 'sessions_time', e.target.value)}
                  />
                </div>
                <div className="col-md-3 mt-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="السعر"
                    value={detail.price}
                    onChange={(e) => handleInputChange(inputIndex, detailIndex, 'price', e.target.value)}
                  />
                </div>
                <div className="col-md-3 mt-3">
                   <button className='btn ' onClick={() => handleAddDetail(inputIndex)}>
                   <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button className='btn ' onClick={() => handleDeleteDetail(inputIndex, detailIndex)}>
                  <img src={deletee} alt="" />
                  </button>
                 
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className='BottomButtons'>
          <button className='save' onClick={handleSaveAll}>
            <span>حفظ</span>
          </button>
          <Link to="/Services">
            <button className='cancel'>
              <span>الغاء</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
