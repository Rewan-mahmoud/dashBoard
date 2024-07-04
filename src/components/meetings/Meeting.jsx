import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const Meetings = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";

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
