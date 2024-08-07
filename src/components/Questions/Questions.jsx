import React, { useState, useEffect } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";

const Questions = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://naql.nozzm.com/api/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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

    fetchData();
  }, []);

  const handleEdit = (id) => {
    setEditingId(id);
    const rowToEdit = data.find(row => row.id === id);
    setNewRowData({ ...rowToEdit });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://naql.nozzm.com/api/destroy_questions/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'lang': 'en',
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
      [key]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://naql.nozzm.com/api/update_questions/${editingId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'lang': 'ar',
        },
        body: JSON.stringify(newRowData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result.status) {
        const newData = data.map(row => (row.id === editingId ? newRowData : row));
        setData(newData);
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

  const toggleActive = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 0 : 1;
      const response = await fetch(`https://naql.nozzm.com/api/active_questions/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'lang': 'ar'
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
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
            <span className='pe-3'>اضافة</span>
          </button>
        </Link>
      </div>

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">الرقم</th>
            <th scope="col">السؤال باللغة العربية</th>
            <th scope="col">السؤال باللغة الانجليزية</th>
            <th scope="col">الحالة  </th>
            <th scope="col">التحكم</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.name_ar || ''} onChange={(e) => handleChange(e, 'name_ar')} />
                ) : (
                  row.name_ar
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.name_en || ''} onChange={(e) => handleChange(e, 'name_en')} />
                ) : (
                  row.name_en
                )}
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={row.status === 'active' ? 'activeIcon' : 'inactive'}
                  onClick={() => toggleActive(row.id, row.status)}
                />
              </td>
              <td>
                {editingId === row.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => {
                      setEditingId(null);
                      setNewRowData({});
                    }}>Cancel</button>
                  </>
                ) : (
                  <div className="drTableIcon">
                    <img
                      src={edit}
                      alt="edit"
                      onClick={() => handleEdit(row.id)}
                    />
                    <img
                      src={deletee}
                      alt="delete"
                      onClick={() => handleDelete(row.id)}
                    />
                  </div>
                )}
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
