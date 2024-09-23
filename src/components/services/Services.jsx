import React, { useState, useEffect } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import plus from '../../assests/plus.svg';

const Services = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [error, setError] = useState(null);

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://naql.nozzm.com/api/services', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'lang': 'ar',
          }
        });
        const result = await response.json();
        if (result.status) {
          setData(result.data.data.map(item => ({
            id: item.id,
            MainCategory: item?.category?.name,
            Subcategory: item?.sub_category?.name,
            SpecialistName: item.Service_doctors[0]?.doctors.name || 'N/A'
          })));
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

  const handleEdit = (id) => {
    setEditingId(id);
    const rowToEdit = data.find(row => row.id === id);
    setNewRowData({ ...rowToEdit });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://naql.nozzm.com/api/destory_service/${id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'lang': 'ar',
        },
      });
      const result = await response.json();
      if (result.status) {
        setData(data.filter(row => row.id !== id));
      } else {
        console.error('Failed to delete data:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
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
      const response = await fetch(`https://naql.nozzm.com/api/update_service/${editingId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'lang': 'ar',
          'Accept': 'application/json',
        },
        body: JSON.stringify(newRowData),
      });
      const result = await response.json();
      if (result.status) {
        setData(data.map(row => (row.id === editingId ? { ...row, ...newRowData } : row)));
        setEditingId(null);
        setNewRowData({});
      } else {
        console.error('Failed to save data:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setError(error.message);
    }
  };

  const updateStatus = async (id, active) => {
    try {
      const response = await fetch(`https://naql.nozzm.com/api/active_service/${id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
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



  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between">
        <h3>الخدمات</h3>
        <Link to="/AddServices">
          <button>
            <img src={plus} alt="" />
            <span className='pe-3'> اضافة </span>
          </button>
        </Link>
      </div>

      {error && <p className="text-danger">Error: {error}</p>}

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">الرقم</th>
            <th scope="col">اسم الفئة الاساسية</th>
            <th scope="col">الاسم الفئة الفرعية</th>
     
            <th scope="col">التحكم</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.MainCategory} onChange={(e) => handleChange(e, 'MainCategory')} />
                ) : (
                  row.MainCategory
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.Subcategory} onChange={(e) => handleChange(e, 'Subcategory')} />
                ) : (
                  row.Subcategory
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
                    <div className='drTableIcon'>
                      <FontAwesomeIcon icon={faCircleCheck} className={row.status === 'active' ? 'activeIcon' : 'inactive'} onClick={() => toggleActive(row.id, row.status)} />
                      <Link to="/UpdateServices">
                        <img src={edit} alt="edit" />
                      </Link>
                      <img src={deletee} alt="delete" onClick={() => handleDelete(row.id)} />
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

export default Services;
