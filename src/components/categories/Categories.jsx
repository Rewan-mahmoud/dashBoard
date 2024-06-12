import React, { useState, useEffect } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const Categories = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newData, setNewData] = useState({
    id: '',
    name: '',
    details: '',
    image: '',
    status: 'active',
  });
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [error, setError] = useState(null);

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJiMjI5NjUzYzY3NDkwNGJiYTU3YzE0ODliMmE5MTFiODk3ODVhZjQ5YmU3MjMxZmMwMDUzOGMzNmM4M2YwMWYzZDdlNjQyNjA4MGU2ZmJkMyIsImlhdCI6MTcxODE0MjgyMC45MTQ5MzUsIm5iZiI6MTcxODE0MjgyMC45MTQ5MzgsImV4cCI6MTc0OTY3ODgyMC45MTIyNywic3ViIjoiMSIsInNjb3BlcyI6W119.DbDKDSSRK-_xgrV9gg62Hx463abNhu1li1ENeMeV9_B34MFQUtQD1z3992g25CtCPPCAZU_sscM6hzSZ99SxHHgAax8lqYC-Hx6japYx1pQV52xNZMwNVxHosszHUDkJeKkTH7TmymyXHwXJ_C47r8Y-iaX2G3_6EoVaW0crdxuTA-588USgtQLQ-G-uStt52H1u4H0iIz4RjIDLDn6HkjmsgAouqBPemB1f5afDiOycnI6EwhE-sTjN8s9E3OxjirwATZe5BLEnc1_rhOKriZtjFesIpU4n-aIU5lDF9cprqOTyu74nK6uWBMY5D07rQUpMVuUmOF45RGmffZONXXT-rLydfZTRgRNfbLa4QtofAr6BDqPQnxVuVWd0UDDWb82X-cj411qPtSBVYsHY9WoNr7io7JIIMpjvQ-HAtl8D_u7PEti6AmPv-W1aF2QBL2BQ79_LLT8GKvu3wZ5GEkOd6GEpu8y9CyW_VIJB5husn3VsETmfCD48W51Sin82Tv5lNvJk0-aaR0UfPVLOYWxLLN1t-RvmISGBWzgV3d4nViccAnKHiofxVp16yY4244sI6cmXsQ4ISRBofXNrBEWWvUjzZv3mDBdcrOleS025Mb-g_P3X57fHmQzY2q8TlAJbEP7yWLvLQOg0tYaPmil8Qt7XeLwGZcH-dm5b1AE";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://naql.nozzm.com/api/categories', {
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

  const toggleActive = (id) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, status: row.status === 'active' ? 'inactive' : 'active' } : row
      )
    );
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    setSelectedIcon(file);
    setNewData(prevData => ({
      ...prevData,
      image: file,
    }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://naql.nozzm.com/api/destroy_category/${id}`, {
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
      const response = await fetch(`https://naql.nozzm.com/api/update_category/${editingId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'lang': 'ar',
          'accept' : 'application/json'
        },
        body: JSON.stringify(newRowData),
      });
      const result = await response.json();
      if (result.status) {
        setData(data.map(row => row.id === editingId ? newRowData : row));
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

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleAddChange = (e, key) => {
    const { value } = e.target;
    setNewData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  const handleAddSave = async () => {
    const formData = new FormData();
    formData.append('name', newData.name);
    formData.append('details', newData.details);
    formData.append('status', newData.status);
    if (newData.image) {
      formData.append('image', newData.image);
    }

    try {
      const response = await fetch('https://naql.nozzm.com/api/add_category', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'lang': 'ar',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (result.status) {
        setData(prevData => [...prevData, result.data]); // Assuming the new data is returned in the response
        setNewData({
          id: '',
          name: '',
          details: '',
          image: '',
          status: 'active',
        });
        setIsAdding(false);
      } else {
        console.error('Failed to add category:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between">
        <h3>الفئات</h3>
        <button onClick={handleAdd}>
          <img src={plus} alt="" />
          <span className="pe-3">اضافة</span>
        </button>
      </div>

      {error && <p className="text-danger">Error: {error}</p>}

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">الرقم</th>
            <th scope="col">الايقون</th>
            <th scope="col">الاسم</th>
            <th scope="col">التفاصيل</th>
            <th scope="col">الحالة</th>
            <th scope="col">التحكم</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editingId === row.id ? (
                  selectedIcon ? (
                    <img src={URL.createObjectURL(selectedIcon)} alt="Selected Icon" />
                  ) : (
                    <input type="file" onChange={handleIconChange} accept="image/*" />
                  )
                ) : (
                  <img src={row.image} alt="Icon" />
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.name || row.name} onChange={(e) => handleChange(e, 'name')} />
                ) : (
                  row.name
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.details || row.details} onChange={(e) => handleChange(e, 'details')} />
                ) : (
                  row.details
                )}
              </td>
              <td>
                <FontAwesomeIcon icon={faCircleCheck} className={row.status === 'active' ? 'activeIcon' : 'inactive'} onClick={() => toggleActive(row.id)} />
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
                      <img
                        src={edit}
                        alt="edit"
                        onClick={() => {
                          setEditingId(row.id);
                          setNewRowData(row);
                        }}
                      />
                      <img
                        src={deletee}
                        alt="delete"
                        onClick={() => handleDelete(row.id)}
                      />
                    </div>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}
          {isAdding && (
            <tr>
              <td>New</td>
              <td>
                <input type="file" onChange={handleIconChange} accept="image/*" />
              </td>
              <td>
                <input type="text" value={newData.name} onChange={(e) => handleAddChange(e, 'name')} />
              </td>
              <td>
                <input type="text" value={newData.details} onChange={(e) => handleAddChange(e, 'details')} />
              </td>
              <td>
                <select value={newData.status} onChange={(e) => handleAddChange(e, 'status')}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </td>
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

export default Categories;
