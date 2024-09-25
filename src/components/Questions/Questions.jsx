import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../AuthContext'; // Import useAuth to get the token

const Questions = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://naql.nozzm.com/api/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
            'lang': 'ar',
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
  }, [token]); 
  

  const handleEdit = (row) => {
    navigate('/AddQuestions', { state: { row } }); // Pass row data to AddQuestions page
  };

  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://naql.nozzm.com/api/destroy_questions/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use the token here as well
          'lang': 'en',
        },
      });
      const result = await response.json();
      if (result.status) {
        setData(data.filter(row => row.id !== id)); // Filter out the deleted row
      } else {
        console.error('Failed to delete data:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      setError(error.message);
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 0 : 1; // Toggle the status
      const response = await fetch(`https://naql.nozzm.com/api/active_questions/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Pass token in Authorization header
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'lang': 'ar',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle status');
      }

      const result = await response.json();
      if (result.status) {
        setData(prevData =>
          prevData.map(row =>
            row.id === id ? { ...row, status: newStatus === 1 ? 'active' : 'inactive' } : row
          )
        );
      } else {
        console.error('Failed to toggle active status:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error toggling active status:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between">
        <h3>الاسئلة والاجوبة</h3>
        <Link to="/AddQuestions">
          <button>
            <img src={plus} alt="" />
            <span className="pe-3">اضافة</span>
          </button>
        </Link>
      </div>

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">الرقم</th>
            <th scope="col">السؤال باللغة العربية</th>
            <th scope="col">السؤال باللغة الانجليزية</th>
            <th scope="col">الحالة</th>
            <th scope="col">التحكم</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name_ar}</td>
              <td>{row.name_en}</td>
              <td>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={row.status === 'active' ? 'activeIcon' : 'inactive'}
                  onClick={() => toggleActive(row.id, row.status)} // Call toggleActive with id and status
                />
              </td>
              <td>
                <div className="drTableIcon">
                  <img
                    src={edit}
                    alt="edit"
                    onClick={() => handleEdit(row)} // Pass the whole row
                  />
                  <img
                    src={deletee}
                    alt="delete"
                    onClick={() => handleDelete(row.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Questions;
