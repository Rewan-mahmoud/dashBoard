import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import Groupppp from '../../assests/Groupppp.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'; // Import active/inactive icon
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../AuthContext';
import './doctor.css';
import { useLocation } from "react-router-dom";
const Doctor = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();
  const location = useLocation(); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://naql.nozzm.com/api/doctores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'lang': i18n.language,
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

    // Fetch data when the component mounts
    fetchData();

    // If there's a state indicating update, refetch the data
    if (location.state?.updated) {
      fetchData();
    }
  }, [token, i18n.language, location.state?.updated]); 

  // Function to toggle active status of a doctor
  const toggleActive = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? 0 : 1;
      const response = await fetch(
        `https://naql.nozzm.com/api/active_doctores/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            lang: i18n.language,
          },
          body: JSON.stringify({ stauts: newStatus }), // Ensure the parameter name is correct
        }
      );
      const result = await response.json();
      if (result.status) {
        setData((prevData) =>
          prevData.map((row) =>
            row.id === id
              ? { ...row, status: newStatus === 1 ? "active" : "inactive" }
              : row
          )
        );
      } else {
        console.error("Failed to toggle active status:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error toggling active status:", error);
      setError(error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://naql.nozzm.com/api/destroy_doctores/${id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            lang: i18n.language,
          },
        }
      );
  
      const result = await response.json();
      if (result.status) {
        // Remove the doctor from the local state after successful deletion
        const newData = data.filter((row) => row.id !== id);
        setData(newData);
      } else {
        console.error('Failed to delete doctor:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      setError(error.message);
    }
  };
  

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between">
        <h3>{t('doctorTable.title')}</h3>
        <Link to="/DoctorData">
          <button>
            <img src={plus} alt="" />
            <span className="pe-3">{t('doctorTable.addDoctor')}</span>
          </button>
        </Link>
      </div>

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">{t('id')}</th>
            <th scope="col">{t('name')}</th>
            <th scope="col">{t('email')}</th>
            <th scope="col">{t('mobile')}</th>
            <th scope="col">{t('status')}</th>
            <th scope="col">{t('control')}</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.mobile}</td>

              {/* Status Icon - Active/Inactive */}
              <td>
              <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={row.status === "active" ? "activeIcon" : "inactive"}
                      onClick={() => toggleActive(row.id, row.status)}
                    />
              </td>

              <td>
                <div className="drTableIcon">
                  <Link to={`/DoctorsProfile/${row.id}`}>
                    <img src={Groupppp} alt="" />
                  </Link>
                  <button
                    className="editbutton"
                    onClick={() => navigate('/DoctorData', { state: { doctor: row } })}
                  >
                    <img src={edit} alt="" />
                  </button>
                  <img
                    src={deletee}
                    alt={t('doctorTable.deleteIcon')}
                    onClick={() => handleDelete(row.id)}
                  />
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
