import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import Groupppp from '../../assests/Groupppp.svg';
import "./doctor.css";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { useAuth } from '../../AuthContext';
const Doctor = () => {
  const { t, i18n } = useTranslation(); // Initialize the translation and i18n instance
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://naql.nozzm.com/api/doctores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'lang': i18n.language, // Use i18n.language to set the language dynamically
          },
          body: JSON.stringify({}),
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

    if (token) {
      fetchData();
    }
  }, [token, i18n.language]); // Re-fetch data when the language changes

  const handleDelete = (id) => {
    const newData = data.filter(row => row.id !== id);
    setData(newData);
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between">
        <h3>{t('doctorTable.title')}</h3>
        <Link to="/DoctorData">
          <button>
            <img src={plus} alt="" />
            <span className='pe-3'>{t('doctorTable.addDoctor')}</span>
          </button>
        </Link>
      </div>

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">{t('doctorTable.id')}</th>
            <th scope="col">{t('doctorTable.name')}</th>
            <th scope="col">{t('doctorTable.email')}</th>
            <th scope="col">{t('doctorTable.mobile')}</th>
            <th scope="col">{t('doctorTable.status')}</th>
            <th scope="col">{t('doctorTable.control')}</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.mobile}</td>
              <td>{row.stauts === 1 ? t('doctorTable.active') : t('doctorTable.inactive')}</td>
              <td>
                <div className='drTableIcon'>
                  <Link to={`/DoctorsProfile/${row.id}`}><img src={Groupppp} alt="" /></Link>
                  <button className='editbutton' onClick={() => navigate('/DoctorData', { state: { doctor: row } })}>
                    <img src={edit} alt="" />
                  </button>
                  <img
                    src={deletee} alt={t('doctorTable.deleteIcon')}
                    onClick={() => handleDelete(row.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Doctor;
