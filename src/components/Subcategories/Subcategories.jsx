import React, { useState } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import check from '../../assests/check.svg';
import Frame1 from '../../assests/Frame1.svg';
import Frame2 from '../../assests/Frame2.svg';
import Frame3 from '../../assests/Frame3.svg';
import Frame4 from '../../assests/Frame4.svg';
import Frame5 from '../../assests/Frame5.svg';
import Frame6 from '../../assests/Frame6.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Subcategories = () => {
  const [data, setData] = useState([
    { id: 1, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed Mohamed', icon: Frame1 },
    { id: 2, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed Mohamed', icon: Frame2 },
    { id: 3, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed Mohamed', icon: Frame3 },
    { id: 4, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed Mohamed', icon: Frame4 },
    { id: 5, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed Mohamed', icon: Frame5 },
    { id: 6, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed Mohamed', icon: Frame6 },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newData, setNewData] = useState({
    id: data.length + 1,
    NameArabic: '',
    NameEnglish: '',
    icon: '', // Initially no icon
  });
  const [selectedIcon, setSelectedIcon] = useState(null); // New state for selected icon file

  const toggleActive = (id) => {
    const newData = data.map(row => {
      if (row.id === id) {
        return { ...row, active: !row.active };
      }
      return row;
    });
    setData(newData);
  };
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    setSelectedIcon(file);
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
        return { ...row, ...newRowData };
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
    const { value } = e.target;
    setNewData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  const handleAddSave = () => {
    setData(prevData => [...prevData, newData]);
    setNewData({
      id: data.length + 2, // increment id for next new row
      NameArabic: '',
      NameEnglish: '',
      icon: '', // Initially no icon
    });
    setIsAdding(false);
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

      <table className="table TableDr text-center">
        <thead>
          <tr>
            <th scope="col">الرقم</th>
            <th scope="col">الايقون</th>
            <th scope="col">الاسم باللغة العربية</th>
            <th scope="col">الاسم باللغة الانجليزية</th>
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
                {editingId === row.id ? (
                  <React.Fragment>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className='drTableIcon'>
                      <FontAwesomeIcon icon={faCircleCheck} className={row.active ? 'activeIcon' : 'inactive'} onClick={() => toggleActive(row.id)} />
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
      <input type="file" onChange={handleIconChange} accept="image/*" />
    </td>
    <td><input type="text" value={newData.NameArabic} onChange={(e) => handleAddChange(e, 'NameArabic')} /></td>
    <td><input type="text" value={newData.NameEnglish} onChange={(e) => handleAddChange(e, 'NameEnglish')} /></td>
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
