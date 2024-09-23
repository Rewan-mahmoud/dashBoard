import React, { useState, useEffect } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import add from '../../assests/add.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Subcategories = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newData, setNewData] = useState({
    id: data.length + 1,
    NameArabic: '',
    NameEnglish: '',
    icon: '', // Initially no icon
    cat_id: '',
  });
  const [selectedIcon, setSelectedIcon] = useState(null); // New state for selected icon file
  const [error, setError] = useState(null);

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://naql.nozzm.com/api/subcategories', {
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
          const fetchedData = result.data.data.map(item => ({
            id: item.id,
            NameArabic: item.name_ar,
            NameEnglish: item.name_en,
            icon: item.image,
            cat_id: item.cat_id
          }));
          setData(fetchedData);
        } else {
          console.error('Failed to fetch data:', result.message);
          setError(result.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    const fetchCategories = async () => {
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
          setCategories(result.data.data);
        } else {
          console.error('Failed to fetch categories:', result.message);
          setError(result.message);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error.message);
      }
    };

    fetchData();
    fetchCategories();
  }, [token]);
  const toggleActive = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 0 : 1;
      const response = await fetch(`https://naql.nozzm.com/api/active_subcategory/${id}`, {
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
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    setSelectedIcon(file);
    setNewRowData(prevData => ({
      ...prevData,
      image: file,
    }));
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://naql.nozzm.com/api/destroy_subcategory/${id}`, {
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
      [key]: value
    }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name_ar', newRowData.NameArabic || '');
      formData.append('name_en', newRowData.NameEnglish || '');
      formData.append('cat_id', newRowData.cat_id || '');
      if (selectedIcon) {
        formData.append('icon', selectedIcon);
      }

      const response = await fetch(`https://naql.nozzm.com/api/update_subcategory/${editingId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'lang': 'en',
        },
        body: formData,
      });

      const result = await response.json();
      if (result.status) {
        const updatedData = data.map(row => {
          if (row.id === editingId) {
            return { ...row, ...newRowData, icon: selectedIcon ? URL.createObjectURL(selectedIcon) : row.icon };
          }
          return row;
        });
        setData(updatedData);
        setEditingId(null);
        setNewRowData({});
        setSelectedIcon(null); // Reset selected icon
      } else {
        console.error('Failed to update subcategory:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error updating subcategory:', error);
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
    try {
      const formData = new FormData();
      formData.append('name_ar', newData.NameArabic);
      formData.append('name_en', newData.NameEnglish);
      formData.append('cat_id', newData.cat_id);
      if (selectedIcon) {
        formData.append('icon', selectedIcon);
      }

      const response = await fetch('https://naql.nozzm.com/api/add_subcategory', {
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (result.status) {
        setData(prevData => [...prevData, newData]);
        setNewData({
          id: data.length + 2, // increment id for next new row
          NameArabic: '',
          NameEnglish: '',
          icon: '', // Initially no icon
          cat_id: '',
        });
        setIsAdding(false);
        setSelectedIcon(null); // Reset selected icon
      } else {
        console.error('Failed to add subcategory:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error adding subcategory:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between ">
        <h3>الفئات الفرعية</h3>
        <button onClick={handleAdd}>
          <img src={plus} alt="" />
          <span className='pe-3'>اضافة</span>
        </button>
      </div>

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">الرقم</th>
            <th scope="col">الايقون</th>
            <th scope="col">الاسم باللغة العربية</th>
            <th scope="col">الاسم باللغة الانجليزية</th>
            <th scope="col"> الفئة الاساسية </th>
            <th scope="col">التحكم</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td> {editingId === row.id ? (
              selectedIcon ? (
                <img src={URL.createObjectURL(selectedIcon)} alt="Selected Icon" />
              ) : (
                <input type="file" onChange={handleIconChange} accept="image/*" />
              )
            ) : (
              <img src={row.icon} alt="Icon" />
            )}</td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.NameArabic || row.NameArabic} onChange={(e) => handleChange(e, 'NameArabic')} />
                ) : (
                  row.NameArabic
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.NameEnglish || row.NameEnglish} onChange={(e) => handleChange(e, 'NameEnglish')} />
                ) : (
                  row.NameEnglish
                )}
              </td>
              <td>
                <div className="custom-select">
                  {editingId === row.id ? (
                    <select
                      type="text"
                      className="form-control"
                      value={newRowData.cat_id || row.cat_id}
                      onChange={(e) => handleChange(e, 'cat_id')}
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name_ar}
                        </option>
                      ))}
                    </select>
                  ) : (
                    categories.find(category => category.id === row.cat_id)?.name_ar || 'N/A'
                  )}
                  <div className="arrow-icon">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                </div>
              </td>
              <td>
             
             {editingId === row.id ? (
               <React.Fragment>
                 <button className="btn  btn-sm ml-2" onClick={handleSave}>
                 <img 
                   src={add} 
                   alt="add" 
                   style={{ width: '20px' }} 
                 />
                 </button>
                 <button className="btn  btn-sm" onClick={() => {
                   setEditingId(null);
                   setSelectedIcon(null);
                 }}>
                    <img 
                       src={deletee} 
                       alt="delete" 
                     />
                 </button>
               </React.Fragment>
             ) : (
               <React.Fragment>
                  <FontAwesomeIcon
                     icon={faCircleCheck}
                     className={row.status === 'active' ? 'activeIcon' : 'inactive'}
                     onClick={() => toggleActive(row.id, row.status)}
                   />
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
              <td>{newData.id}</td>
           <td>
                <input type="file" className="form-control" onChange={handleIconChange} accept="image/*" />
              </td>
              <td><input type="text" value={newData.NameArabic} onChange={(e) => handleAddChange(e, 'NameArabic')} /></td>
              <td><input type="text" value={newData.NameEnglish} onChange={(e) => handleAddChange(e, 'NameEnglish')} /></td>
              <td>
                <select
                  type="text"
                  className="form-control"
                  value={newData.cat_id}
                  onChange={(e) => handleAddChange(e, 'cat_id')}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name_ar}
                    </option>
                  ))}
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

export default Subcategories;
