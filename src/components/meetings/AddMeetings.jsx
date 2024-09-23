import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const AddMeetings = ({ onSave }) => {
    const location = useLocation();
    const meeting = location.state?.meeting || {};
    const [formData, setFormData] = useState({
        name_ar: meeting.name_ar || '',
        name_en: meeting.name_en || '',
        doctor_id: meeting.doctor?.id || '',
        encounters_types_id: meeting.encounters_type?.id || '',
        seats_num: meeting.seats_num || '',
        price: meeting.price || '',
        date: meeting.date || '',
        time: meeting.time || '',
        details_ar: meeting.details_ar || '',
        details_en: meeting.details_en || '',
        objectives_ar: meeting.objectives_ar || '',
        objectives_en: meeting.objectives_en || '',
        image: meeting.image || '', // This will handle the existing image
    });
    const [doctors, setDoctors] = useState([]);
    const [encounterTypes, setEncounterTypes] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch doctors
        const fetchDoctors = async () => {
            try {
                const response = await fetch('https://naql.nozzm.com/api/show_doctores', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'lang': 'ar',
                    },
                    body: JSON.stringify({}),
                });
                const result = await response.json();
                if (result.status) {
                    setDoctors(result.data);
                } else {
                    console.error('Failed to fetch doctors:', result.message);
                    setError(result.message);
                }
            } catch (error) {
                console.error('Error fetching doctors:', error);
                setError(error.message);
            }
        };

        // Fetch encounter types
        const fetchEncounterTypes = async () => {
            try {
                const response = await fetch('https://naql.nozzm.com/api/encountertype', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'lang': 'ar',
                    },
                    body: JSON.stringify({}),
                });
                const result = await response.json();
                if (result.status) {
                    setEncounterTypes(result.data);
                } else {
                    console.error('Failed to fetch encounter types:', result.message);
                    setError(result.message);
                }
            } catch (error) {
                console.error('Error fetching encounter types:', error);
                setError(error.message);
            }
        };

        fetchDoctors();
        fetchEncounterTypes();
    }, [token]);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const endpoint = 'https://naql.nozzm.com/api/add_ecounters';

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
                navigate('/Meetings');
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to save the meeting. Please try again.');
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
                    image: reader.result // Update image with the new file content
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='container DoctorsProfile tables bg-white'>
            <div className="tableTitle d-flex justify-content-between">
                <h3>اضافة لقاء</h3>
            </div>
            <form onSubmit={handleSave}>
                <div className="row settingForm justify-content-around">
                    <div className="col-md-6">
                        <label htmlFor="name_ar">الاسم باللغة العربية :</label>
                        <input type="text" className="form-control" name="name_ar" value={formData.name_ar} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="name_en">الاسم باللغة بالانجليزية :</label>
                        <input type="text" className="form-control" name="name_en" value={formData.name_en} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="doctor_id">المضيف:</label>
                        <select className="form-control" name="doctor_id" value={formData.doctor_id} onChange={handleChange}>
                            <option value="">اختر المضيف</option>
                            {doctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="encounters_types_id">نوع اللقاء:</label>
                        <select className="form-control" name="encounters_types_id" value={formData.encounters_types_id} onChange={handleChange}>
                            <option value="">اختر نوع اللقاء</option>
                            {encounterTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="seats_num">عدد المقاعد:</label>
                        <input type="text" className="form-control" name="seats_num" value={formData.seats_num} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="price">السعر:</label>
                        <input type="text" className="form-control" name="price" value={formData.price} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="date">التاريخ:</label>
                        <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="time">الوقت:</label>
                        <input type="time" className="form-control" name="time" value={formData.time} onChange={handleChange} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="details_ar">التفاصيل:</label>
                        <input type="text" className="form-control py-5" name="details_ar" value={formData.details_ar} onChange={handleChange} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="details_en">التفاصيل باللغة الانجليزية:</label>
                        <input type="text" className="form-control py-5" name="details_en" value={formData.details_en} onChange={handleChange} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="objectives_ar">الأهداف:</label>
                        <input type="text" className="form-control py-5" name="objectives_ar" value={formData.objectives_ar} onChange={handleChange} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="objectives_en">الأهداف باللغة الانجليزية:</label>
                        <input type="text" className="form-control py-5" name="objectives_en" value={formData.objectives_en} onChange={handleChange} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="image">الصورة:</label>

                        {/* Display existing image */}
                        {formData.image && (
                            <div className="mb-3">
                                <img src={formData.image} alt="Meeting" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                            </div>
                        )}

                        {/* File input for uploading new image */}
                        <input type="file" className="form-control py-5" onChange={handleImageChange} />
                    </div>
                    <div className='BottomButtons'>
                        <button className='save' type="submit" disabled={isLoading}>
                            <span>{isLoading ? 'جاري الحفظ...' : 'حفظ'}</span>
                        </button>
                        <button type="button" className='cancel'>
                            <Link to='/Meetings'><span>الغاء</span></Link>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddMeetings;
