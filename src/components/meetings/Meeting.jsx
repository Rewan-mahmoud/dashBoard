import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../AuthContext';
import { useTranslation } from 'react-i18next'; // Import translation hook

const Meetings = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { token } = useAuth();
    const { t, i18n } = useTranslation(); // Use the translation hook

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://naql.nozzm.com/api/ecounters', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'lang': i18n.language, // Send the language dynamically
                    }
                });
                const result = await response.json();
                if (result.status) {
                    setData(result.data.data);
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
    }, [token, i18n.language]); // Reload data when the language changes

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://naql.nozzm.com/api/destroy_ecounters/${id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'lang': i18n.language,
                }
            });
            const result = await response.json();
            if (result.status) {
                const newData = data.filter(row => row.id !== id);
                setData(newData);
            } else {
                console.error('Failed to delete data:', result.message);
                setError(result.message);
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            setError(error.message);
        }
    };

    const toggleActive = (id) => {
        const newData = data.map(row => {
            if (row.id === id) {
                const newStatus = !row.active;
                updateStatus(id, newStatus);
                return { ...row, active: newStatus };
            }
            return row;
        });
        setData(newData);
    };

    const updateStatus = async (id, active) => {
        try {
            const response = await fetch(`https://naql.nozzm.com/api/active_ecounters/${id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'lang': i18n.language,
                },
                body: JSON.stringify({ stauts: active ? 1 : 0 })
            });
            const result = await response.json();
            if (!result.status) {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            setError(error.message);
        }
    };

    return (
        <div className="container tables bg-white mt-5">
            <div className="tableTitle d-flex justify-content-between ">
                <h3>{t('meetings')}</h3> {/* Translated title */}
                <Link to="/AddMeetings">
                    <button>
                        <img src={plus} alt={t('addMeetingIcon')} /> {/* Translated alt */}
                        <span className='pe-3'>{t('addMeeting')}</span> {/* Translated button text */}
                    </button>
                </Link>
            </div>
            <table className="table borderless TableDr text-center">
                <thead>
                    <tr>
                        <th scope="col">{t('id')}</th>
                        <th scope="col">{t('name')}</th>
                        <th scope="col">{t('host')}</th>
                        <th scope="col">{t('price')}</th>
                        <th scope="col">{t('type')}</th>
                        <th scope="col">{t('availableSeats')}</th>
                        <th scope="col">{t('reservedSeats')}</th>
                        <th scope="col">{t('controls')}</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {data.map(row => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.doctor.name}</td>
                            <td>{row.price}</td>
                            <td>{row.encounters_type.name}</td>
                            <td>{row.seats_num}</td>
                            <td>{row.reserved_seats || t('noData')}</td> {/* Translated no data */}
                            <td>
                                <div className='drTableIcon'>
                                    <FontAwesomeIcon icon={faCircleCheck} className={row.active ? 'activeIcon' : 'inactive'} onClick={() => toggleActive(row.id)} />
                                    <button className='editbutton' onClick={() => navigate('/AddMeetings', { state: { meeting: row } })}>
                                        <img src={edit} alt={t('editIcon')} /> {/* Translated alt */}
                                    </button>
                                    <img src={deletee} alt={t('deleteIcon')} onClick={() => handleDelete(row.id)} /> {/* Translated alt */}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {error && <p className="error">{t('meetings.error')}: {error}</p>} {/* Translated error message */}
        </div>
    );
};

export default Meetings;
