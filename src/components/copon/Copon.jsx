import React, { useState, useEffect } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Coupons = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newData, setNewData] = useState({
    id: data.length + 1,
    code: '',
    start_date: '',
    end_date: '',
    discount: '',
    user_num: ''
  });

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://naql.nozzm.com/api/coupons', {
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
  }, [token]);

  const handleEdit = (id) => {
    setEditingId(id);
    const rowToEdit = data.find(row => row.id === id);
    setNewRowData({ ...rowToEdit });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://naql.nozzm.com/api/destroy_coupons/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      const response = await fetch(`https://naql.nozzm.com/api/update_coupons/${editingId}`, {
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

  const toggleActive = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 0 : 1;
      const response = await fetch(`https://naql.nozzm.com/api/active_coupons/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'lang': 'ar'
        },
        body: JSON.stringify({ stauts: newStatus }), // Ensure the parameter name is correct
      });
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

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleAddChange = (e, key) => {
    const { value } = e.target;
    setNewData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleAddSave = async () => {
    try {
      const response = await fetch('https://naql.nozzm.com/api/add_coupons', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'lang': 'ar',
          'Accept': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      const result = await response.json();
      if (result.status) {
        setData([...data, result.data]);
        setNewData({
          id: data.length + 2,
          code: '',
          start_date: '',
          end_date: '',
          discount: '',
          user_num: ''
        });
        setIsAdding(false);
      } else {
        console.error('Failed to add data:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error adding data:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between ">
        <h3> كوبونات الخصم </h3>
        <button onClick={handleAdd}>
          <img src={plus} alt="" />
          <span className='pe-3'> اضافة </span>
        </button>
      </div>

      {error && <p className="text-danger">Error: {error}</p>}

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">الرقم</th>
            <th scope="col">الكود</th>
            <th scope="col">تاريخ البداية</th>
            <th scope="col">تاريخ الانتهاء</th>
            <th scope="col">نسبة الخصم</th>
            <th scope="col">عدد مستخدمين الخصم</th>
            <th scope="col">الحالة</th>
            <th scope="col">الاعدادات</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.code} onChange={(e) => handleChange(e, 'code')} />
                ) : (
                  row.code
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.start_date} onChange={(e) => handleChange(e, 'start_date')} />
                ) : (
                  row.start_date
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.end_date} onChange={(e) => handleChange(e, 'end_date')} />
                ) : (
                  row.end_date
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.discount} onChange={(e) => handleChange(e, 'discount')} />
                ) : (
                  row.discount
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.user_num} onChange={(e) => handleChange(e, 'user_num')} />
                ) : (
                  row.user_num
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
                  <React.Fragment>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="drTableIcon">
                      <img src={edit} alt="edit" onClick={() => handleEdit(row.id)} />
                      <img src={deletee} alt="delete" onClick={() => handleDelete(row.id)} />
                    </div>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}
          {isAdding && (
            <tr>
              <td>{newData.id}</td>
              <td><input type="text" value={newData.code} onChange={(e) => handleAddChange(e, 'code')} /></td>
              <td><input type="text" value={newData.start_date} onChange={(e) => handleAddChange(e, 'start_date')} /></td>
              <td><input type="text" value={newData.end_date} onChange={(e) => handleAddChange(e, 'end_date')} /></td>
              <td><input type="text" value={newData.discount} onChange={(e) => handleAddChange(e, 'discount')} /></td>
              <td><input type="text" value={newData.user_num} onChange={(e) => handleAddChange(e, 'user_num')} /></td>
              <td>
                <button onClick={handleAddSave}>Add</button>
                <button onClick={() => setIsAdding(false)}>Cancel</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Coupons;
