import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { useTranslation } from 'react-i18next'; // Import translation hook

const AddMeetings = ({ onSave }) => {
    const { t, i18n } = useTranslation(); // Use translation hook
    const location = useLocation();
    const meeting = location.state?.meeting || {};
    const { token } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name_ar: meeting.name_ar || '',
        name_en: meeting.name_en || '',
        doctor_id: meeting.doctor?.id || '',
        encounters_types_id: meeting.encounters_type?.id || '',
        seats_num: meeting.seats_num || '',
        price: meeting.price || '',
        date: meeting.date || '',
        time: '', // Handle the time separately
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

    useEffect(() => {
        const convertTo24HourFormat = (time12h) => {
            const [time, modifier] = time12h.split(' ');
            let [hours, minutes] = time.split(':');
            
            if (hours === '12') {
                hours = '00';
            }

            if (modifier === 'PM' || modifier === 'pm') {
                hours = parseInt(hours, 10) + 12;
            }

            return `${String(hours).padStart(2, '0')}:${minutes}`;
        };

        if (meeting.time) {
            const formattedTime = meeting.time.includes('AM') || meeting.time.includes('PM') 
                ? convertTo24HourFormat(meeting.time) 
                : meeting.time;

            setFormData((prevData) => ({
                ...prevData,
                time: formattedTime,
            }));
        }
    }, [meeting]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('https://naql.nozzm.com/api/show_doctores', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'lang': i18n.language, // Use the language dynamically
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

        const fetchEncounterTypes = async () => {
            try {
                const response = await fetch('https://naql.nozzm.com/api/encountertype', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'lang': i18n.language, // Use the language dynamically
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
    }, [token, i18n.language]);

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
                    'lang': i18n.language, // Use the language dynamically
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (result.status) {
                onSave(result.data);
                navigate('/Meetings');
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError(t('addMeetings.saveError'));
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
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='container DoctorsProfile tables bg-white'>
            <div className="tableTitle d-flex justify-content-between">
                <h3>{t('addMeeting')}</h3> {/* Translated title */}
            </div>
            <form onSubmit={handleSave}>
                <div className="row settingForm justify-content-around">
                    <div className="col-md-6">
                        <label htmlFor="name_ar">{t('name_ar')}:</label> {/* Translated label */}
                        <input type="text" className="form-control" name="name_ar" value={formData.name_ar} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="name_en">{t('name_en')}:</label> {/* Translated label */}
                        <input type="text" className="form-control" name="name_en" value={formData.name_en} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="doctor_id">{t('host')}:</label> {/* Translated label */}
                        <select className="form-control" name="doctor_id" value={formData.doctor_id} onChange={handleChange}>
                            <option value="">{t('selectHost')}</option> {/* Translated placeholder */}
                            {doctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="encounters_types_id">{t('meetingType')}:</label> {/* Translated label */}
                        <select className="form-control" name="encounters_types_id" value={formData.encounters_types_id} onChange={handleChange}>
                            <option value="">{t('selectType')}</option> {/* Translated placeholder */}
                            {encounterTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="seats_num">{t('seats')}:</label> {/* Translated label */}
                        <input type="text" className="form-control" name="seats_num" value={formData.seats_num} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="price">{t('price')}:</label> {/* Translated label */}
                        <input type="text" className="form-control" name="price" value={formData.price} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="date">{t('date')}:</label> {/* Translated label */}
                        <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="time">{t('time')}:</label> {/* Translated label */}
                        <input type="time" className="form-control" name="time" value={formData.time} onChange={handleChange} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="details_ar">{t('details_ar')}:</label> {/* Translated label */}
                        <input type="text" className="form-control py-5" name="details_ar" value={formData.details_ar} onChange={handleChange} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="details_en">{t('details_en')}:</label> {/* Translated label */}
                        <input type="text" className="form-control py-5" name="details_en" value={formData.details_en} onChange={handleChange} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="objectives_ar">{t('objectives_ar')}:</label> {/* Translated label */}
                        <input type="text" className="form-control py-5" name="objectives_ar" value={formData.objectives_ar} onChange={handleChange} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="objectives_en">{t('objectives_en')}:</label> {/* Translated label */}
                        <input type="text" className="form-control py-5" name="objectives_en" value={formData.objectives_en} onChange={handleChange} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="image">{t('image')}:</label> {/* Translated label */}

                        {formData.image && (
                            <div className="mb-3">
                                <img src={formData.image} alt={t('imageAlt')} style={{ width: '100px', height: '100px', objectFit: 'contain' }} /> {/* Translated alt */}
                            </div>
                        )}

                        <input type="file" className="form-control py-5" onChange={handleImageChange} />
                    </div>
                    <div className='BottomButtons'>
                        <button className='save' type="submit" disabled={isLoading}>
                            <span>{isLoading ? t('saving') : t('save')}</span> {/* Translated button text */}
                        </button>
                        <button type="button" className='cancel'>
                            <Link to='/Meetings'><span>{t('cancel')}</span></Link> {/* Translated button text */}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddMeetings;
