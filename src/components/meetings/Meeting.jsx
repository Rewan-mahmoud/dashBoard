import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../AuthContext';
const Meetings = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { token } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://naql.nozzm.com/api/ecounters', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'lang': 'ar',
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
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://naql.nozzm.com/api/destroy_ecounters/${id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'lang': 'ar',
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
                    'lang': 'ar',
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
                <h3>اللقائات</h3>
                <Link to="/AddMeetings">
                    <button>
                        <img src={plus} alt="" />
                        <span className='pe-3'>اضافة</span>
                    </button>
                </Link>
            </div>
            <table className="table borderless TableDr text-center">
                <thead>
                    <tr>
                        <th scope="col">الرقم</th>
                        <th scope="col">اسم اللقاء</th>
                        <th scope="col">المضيف</th>
                        <th scope="col">السعر</th>
                        <th scope="col">نوع اللقاء</th>
                        <th scope="col">عدد المقاعد المتاحة</th>
                        <th scope="col">عدد المقاعد المحجوزة</th>
                        <th scope="col">الاعدادات</th>
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
                            <td>{row.reserved_seats || 'N/A'}</td>
                            <td>
                                <div className='drTableIcon'>
                                    <FontAwesomeIcon icon={faCircleCheck} className={row.active ? 'activeIcon' : 'inactive'} onClick={() => toggleActive(row.id)} />
                                    <button className='editbutton' onClick={() => navigate('/AddMeetings', { state: { meeting: row } })}>
                                        <img src={edit} alt="edit" />
                                    </button>
                                    <img src={deletee} alt="delete" onClick={() => handleDelete(row.id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {error && <p className="error">Error: {error}</p>}
        </div>
    );
};

export default Meetings;
