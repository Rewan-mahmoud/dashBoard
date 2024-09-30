import React, { useState, useEffect } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../AuthContext'; // Assuming you're using an AuthContext for authentication
import { useTranslation } from "react-i18next";
const Users = () => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [error, setError] = useState(null);
  const { token } = useAuth(); // Get the token from the Auth context

  // Fetch users from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://naql.nozzm.com/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Use the token for authorization
          },
          body: JSON.stringify({}), // Send an empty body or adapt it based on API documentation
        });
        const result = await response.json();
        if (result.status) {
          setData(result.data.data); // Assuming data is in the result.data.data field
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
        setError(result.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error.message);
    }
  };

  const toggleActive = async (id) => {
    try {
      const user = data.find(row => row.id === id);
      const newStatus = user.active ? 0 : 1; // Toggle the active status
      const response = await fetch(`https://naql.nozzm.com/api/active_users/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ active: newStatus }),
      });
      const result = await response.json();
      if (result.status) {
        setData(data.map(row => (row.id === id ? { ...row, active: !row.active } : row)));
      } else {
        console.error('Failed to toggle active status:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error toggling active status:', error);
      setError(error.message);
    }
  };

  const handleChange = (e, key) => {
    const { value } = e.target;
    setNewRowData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://naql.nozzm.com/api/update_users/${editingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRowData),
      });
      const result = await response.json();
      if (result.status) {
        setData(data.map(row => (row.id === editingId ? newRowData : row)));
        setEditingId(null);
        setNewRowData({});
      } else {
        console.error('Failed to save user:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error saving user:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between ">
      <h3>{t('Users')}</h3>
        <Link to="/AddUsers">
          <button>
            <img src={plus} alt="" />
            <span className="pe-3"> اضافة </span>
          </button>
        </Link>
      </div>

      <table className="table borderless TableDr text-center ">
        <thead>
        <tr>
            <th scope="col">{t('number')}</th>
            <th scope="col">{t('name_ar')}</th>
            <th scope="col">{t('name_en')}</th>
            <th scope="col">{t('email')}</th>
            <th scope="col">{t('controls')}</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    value={newRowData.NameArabic}
                    onChange={(e) => handleChange(e, 'NameArabic')}
                  />
                ) : (
                  row.NameArabic
                )}
              </td>

              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    value={newRowData.NameEnglis}
                    onChange={(e) => handleChange(e, 'NameEnglis')}
                  />
                ) : (
                  row.NameEnglis
                )}
              </td>

              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    value={newRowData.email}
                    onChange={(e) => handleChange(e, 'email')}
                  />
                ) : (
                  row.email
                )}
              </td>

              <td>
                {editingId === row.id ? (
                  <React.Fragment>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="drTableIcon">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={row.active ? 'activeIcon' : 'inactive'}
                        onClick={() => toggleActive(row.id)}
                      />
                      <Link to="/AddUsers">
                        <img src={edit} alt="" />
                      </Link>

                      <img src={deletee} alt="" onClick={() => handleDelete(row.id)} />
                    </div>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
  
    </div>
  );
};

export default Users;
