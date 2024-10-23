import React, { useState, useEffect } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../AuthContext'; 
import { useTranslation } from "react-i18next";

const Users = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const { token } = useAuth();
  const navigate = useNavigate();

  // Fetch users from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://naql.nozzm.com/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        });
        const result = await response.json();
        if (result.status) {
          setData(result.data.data); 
        } else {
          console.error('Failed to fetch data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

  // When edit is clicked, navigate to AddUsers with the selected userId
  const handleEdit = (id) => {
    navigate('/AddUsers', { state: { userId: id } });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://naql.nozzm.com/api/destroy_users/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.status) {
        setData(data.filter(row => row.id !== id));
      } else {
        console.error('Failed to delete user:', result.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between">
        <h3>{t('Users')}</h3>
        <button onClick={() => navigate('/AddUsers')}>
          <img src={plus} alt="" />
          <span className="pe-3"> اضافة </span>
        </button>
      </div>

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">{t('number')}</th>
            <th scope="col">{t('name')}</th>
            <th scope="col">{t('email')}</th>
            <th scope="col">{t('Phone')}</th>
            <th scope="col">{t('controls')}</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.mobile}</td>
              <td>
                <div className="drTableIcon">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={row.active ? 'activeIcon' : 'inactive'}
                  />
                  <img src={edit} alt="" onClick={() => handleEdit(row.id)} /> {/* Pass userId here */}
                  <img src={deletee} alt="" onClick={() => handleDelete(row.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
