import React, { useState } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import card1 from '../../assests/card 3.svg';
import Card2 from '../../assests/card 4.svg';
import card3 from '../../assests/card 5.svg';
import card4 from '../../assests/card 6.svg';

const Slider = () => {
    const [data, setData] = useState([
        { id: 1, icon: card1 },
        { id: 2, icon: Card2 },
        { id: 3, icon: card3 },
        { id: 4, icon: card4 },
    ]);
    const [editingId, setEditingId] = useState(null);
    const [newRowData, setNewRowData] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newData, setNewData] = useState({
        id: data.length + 1,
        NameArabic: '',
        NameEnglish: '',
        icon: '', // Initially no icon
        iconPreview: '' // For previewing the selected image
    });

    const toggleActive = (id) => {
        const newData = data.map(row => {
            if (row.id === id) {
                return { ...row, active: !row.active };
            }
            return row;
        });
        setData(newData);
    };

    const handleDelete = (id) => {
        const newData = data.filter(row => row.id !== id);
        setData(newData);
    };

    const handleChange = (e, key) => {
        const { value } = e.target;
        setNewRowData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const handleSave = () => {
        const updatedData = data.map(row => {
            if (row.id === editingId) {
                return newRowData;
            }
            return row;
        });
        setData(updatedData);
        setEditingId(null);
        setNewRowData({});
    };

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleAddChange = (e, key) => {
        if (key === 'icon') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewData(prevData => ({
                    ...prevData,
                    icon: file,
                    iconPreview: reader.result // Set the preview URL
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

    const handleEditChange = (e, key) => {
        if (key === 'icon') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewRowData(prevData => ({
                    ...prevData,
                    icon: file,
                    iconPreview: reader.result // Set the preview URL
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

    const handleAddSave = () => {
        setData(prevData => [...prevData, newData]);
        setNewData({
            id: data.length + 2, // increment id for next new row
            NameArabic: '',
            NameEnglish: '',
            icon: '', // Initially no icon
            iconPreview: '' // Clear the preview URL
        });
        setIsAdding(false);
    };

    return (
        <div className="container  tables bg-white mt-5">
            <div className="tableTitle d-flex justify-content-between">
                <h3>السليدر</h3>
                <button onClick={handleAdd}>
                    <img src={plus} alt="" />
                    <span className='pe-3'>اضافة</span>
                </button>
            </div>

            <table className="table borderless  TableDr text-center">
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
                                    <React.Fragment>
                                        <input type="file" onChange={(e) => handleEditChange(e, 'icon')} />
                                        {newRowData.iconPreview && <img src={newRowData.iconPreview} alt="Preview" style={{ width: '50px', height: '50px' }} />}
                                    </React.Fragment>
                                ) : (
                                    <img src={row.icon} alt="" />
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
                                            <FontAwesomeIcon icon={faCircleCheck} className={row.active ? 'activeIcon' : 'inactive'} onClick={() => toggleActive(row.id)} />
                                            <img src={edit} alt="" onClick={() => setEditingId(row.id)} />
                                            <img src={deletee} alt="" onClick={() => handleDelete(row.id)} />
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
                                <input type="file" onChange={(e) => handleAddChange(e, 'icon')} />
                                {newData.iconPreview && <img src={newData.iconPreview} alt="Preview" style={{ width: '50px', height: '50px' }} />}
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

export default Slider;
