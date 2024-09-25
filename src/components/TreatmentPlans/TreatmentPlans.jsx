import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../AuthContext';
const TreatmentPlans = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://naql.nozzm.com/api/planseeions', {
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
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://naql.nozzm.com/api/destroy_planseeions/${id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
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

  const toggleActive = async (id) => {
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
      const response = await fetch(`https://naql.nozzm.com/api/active_planseeions/${id}`, {
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
        <h3>الخطط العلاجية</h3>
        <Link to="/AddTreatmentPlans">
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
            <th scope="col">الاسم باللغة العربية</th>
            <th scope="col">الاسم باللغة الانجليزية</th>
            <th scope="col">عدد المراحل</th>
            <th scope="col">نوع المرحلة</th>
            <th scope="col">الاعدادات</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name_ar}</td>
              <td>{row.name_en}</td>
              <td>{row.levels_num}</td>
              <td>{row.sessionstype.map(session => session.type).join(', ')}</td>
              <td>
                <div className='drTableIcon'>
                  <FontAwesomeIcon icon={faCircleCheck} className={row.active ? 'activeIcon' : 'inactive'} onClick={() => toggleActive(row.id)} />
                  <button className='editbutton' onClick={() => navigate('/AddTreatmentPlans', { state: { plan: row } })}>
                    <img src={edit} alt="edit" />
                  </button>
                  <img src={deletee} alt="delete" onClick={() => handleDelete(row.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TreatmentPlans;
