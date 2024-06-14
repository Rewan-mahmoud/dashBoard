import React, { useState, useEffect } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const Slider = () => {
    const [data, setData] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newRowData, setNewRowData] = useState({});
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(null);
    const [newData, setNewData] = useState({
        id: '',
        image: '',
        imagePreview: ''
    });
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://naql.nozzm.com/api/sliders', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
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
        const newData = data.map(row => {
            if (row.id === id) {
                return { ...row, active: !row.active };
            }
            return row;
        });
        setData(newData);
    };

    const handleDelete = async (id) => {
        try {
          const response = await fetch(`https://naql.nozzm.com/api/destroy_slider/${id}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
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

    const handleEditChange = (e, key) => {
        if (key === 'image') {
            const file = e.target.files[0];
            setSelectedIcon(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewRowData(prevData => ({
                    ...prevData,
                    image: file,
                    imagePreview: reader.result
                }));
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            const { value } = e.target;
            setNewRowData(prevData => ({
                ...prevData,
                [key]: value
            }));
        }
    };

    const handleSave = async () => {
        const rowToUpdate = data.find(row => row.id === editingId);
        const formData = new FormData();
        formData.append('image', selectedIcon);
        formData.append('id', rowToUpdate.id);

        try {
            const response = await fetch(`https://naql.nozzm.com/api/update_slider/${editingId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'lang': 'ar',
                    'accept': 'application/json'
                },
                body: formData,
            });

            const result = await response.json();
            if (result.status) {
                setData(data.map(row => row.id === editingId ? { ...row, ...newRowData, image: selectedIcon ? URL.createObjectURL(selectedIcon) : row.image } : row));
                setEditingId(null);
                setNewRowData({});
                setSelectedIcon(null);
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
        if (key === 'image') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewData(prevData => ({
                    ...prevData,
                    image: file,
                    imagePreview: reader.result
                }));
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            const { value } = e.target;
            setNewData(prevData => ({
                ...prevData,
                [key]: value
            }));
        }
    };

    const handleAddSave = async () => {
        const formData = new FormData();
        formData.append('image', newData.image);
        formData.append('id', data.length + 1);

        try {
            const response = await fetch('https://naql.nozzm.com/api/add_slider', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();
            if (result.status) {
                setData(prevData => [...prevData, { ...newData, id: data.length + 1, image: newData.imagePreview }]);
                setNewData({
                    id: '',
                    image: '',
                    imagePreview: ''
                });
                setIsAdding(false);
            } else {
                console.error('Failed to add slider:', result.message);
                setError(result.message);
            }
        } catch (error) {
            console.error('Error adding slider:', error);
            setError(error.message);
        }
    };

    return (
        <div className="container tables bg-white mt-5">
            <div className="tableTitle d-flex justify-content-between">
                <h3>السليدر</h3>
                <button onClick={handleAdd}>
                    <img src={plus} alt="" />
                    <span className='pe-3'>اضافة</span>
                </button>
            </div>

            <table className="table borderless TableDr text-center">
                <thead>
                    <tr>
                        <th scope="col">الرقم</th>
                        <th scope="col">الصورة</th>
                        <th scope="col">التحكم</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {data.map(row => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>
                                {editingId === row.id ? (
                                    <>
                                        <input type="file" onChange={(e) => handleEditChange(e, 'image')} />
                                        {newRowData.imagePreview && <img src={newRowData.imagePreview} alt="Preview" style={{ width: '50px', height: '50px' }} />}
                                    </>
                                ) : (
                                    <img src={row.image} alt="" style={{ width: '287.68px', height: '127px' }} />
                                )}
                            </td>
                            <td>
                                {editingId === row.id ? (
                                    <>
                                        <button onClick={handleSave}>Save</button>
                                        <button onClick={() => setEditingId(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <div className='drTableIcon'>
                                        <FontAwesomeIcon icon={faCircleCheck} className={row.active ? 'activeIcon' : 'inactive'} onClick={() => toggleActive(row.id)} />
                                        <img src={edit} alt="Edit" onClick={() => setEditingId(row.id)} />
                                        <img src={deletee} alt="Delete" onClick={() => handleDelete(row.id)} />
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    {isAdding && (
                        <tr>
                            <td>{data.length + 1}</td>
                            <td>
                                <input type="file" onChange={(e) => handleAddChange(e, 'image')} />
                                {newData.imagePreview && <img src={newData.imagePreview} alt="Preview" style={{ width: '50px', height: '50px' }} />}
                            </td>
                            <td>
                                <button onClick={handleAddSave}>Add</button>
                                <button onClick={() => setIsAdding(false)}>Cancel</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default Slider;
