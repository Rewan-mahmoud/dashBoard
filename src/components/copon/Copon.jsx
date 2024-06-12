import React, { useState } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import check from '../../assests/check.svg';
import plus from '../../assests/plus.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';


// import "./mee.css"
const Copon = () => {
    const [data, setData] = useState([
        { id: 1, NameArabic: 'Code12  ', date: '17/6/2024  ', Number: "12" , email : '5 مراحل'},
        { id: 2, NameArabic: 'Code12  ', date: '17/6/2024 ', Number: "12" , email : '5 مراحل'},
        { id: 3, NameArabic: 'Code12', date: '17/6/2024 ', Number: "12" , email : '5 مراحل'},
        { id: 4, NameArabic: 'Code12  ', date: '17/6/2024 ', Number: "12" , email : '5 مراحل'},
        { id: 5, NameArabic: 'Code12  ', date: '17/6/2024 ', Number: "12" , email : '5 مراحل'},
        { id: 6, NameArabic: 'Code12  ', date: '17/6/2024 ', Number: "12" , email : '5 مراحل'},


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
        <h3> كوبونات الخصم  </h3>
        <button onClick={handleAdd}>
          <img src={plus} alt=""  />
        <span className='pe-3'> اضافة </span>   
   
          </button>
          </div>
       
          <table className=" table  borderless TableDr text-center ">
          <thead >
            <tr >
              <th  scope="col ">الرقم</th>
              <th scope="col ">الكود  </th>
              <th scope="col ">تاريخ البداية    </th>
              <th scope="col ">تاريخ الانتهاء    </th>
              <th scope="col ">نسبة الخصم</th>
              <th scope="col ">عدد مستخدمين الخصم</th>
              <th scope="col ">التحكم </th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {data.map(row => (
              <tr key={row.id}>
                <td >{row.id}</td>
                <td >
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.NameArabic} onChange={(e) => handleChange(e, 'NameArabic')} />
                  ) : (
                    row.NameArabic
                  )}
                </td>
                <td>
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.date} onChange={(e) => handleChange(e, 'date')} />
                  ) : (
                    row.date
                  )}
                </td>
                <td >
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.date} onChange={(e) => handleChange(e, 'date')} />
                  ) : (
                    row.date
                  )}
                </td>
                <td >
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.Number} onChange={(e) => handleChange(e, 'Number')} />
                  ) : (
                    row.Number
                  )}
                </td>
                <td >
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.Number} onChange={(e) => handleChange(e, 'Number')} />
                  ) : (
                    row.Number
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
    <td></td>
    <td><input type="text" value={newData.NameArabic} onChange={(e) => handleAddChange(e, 'NameArabic')} /></td>
    <td><input type="text" value={newData.date} onChange={(e) => handleAddChange(e, 'date')} /></td>
    <td><input type="text" value={newData.Number} onChange={(e) => handleAddChange(e, 'Number')} /></td>
    <td><input type="text" value={newData.email} onChange={(e) => handleAddChange(e, 'email')} /></td>
    <td>
      <button onClick={handleAddSave}>Add</button>
      <button onClick={() => setIsAdding(false)}>Cancel</button>
    </td>
  </tr>
)}

          </tbody>
         
        </table>
        <div
            className='BottomButtons'>
                <button className='save'>
                    <span> حفظ</span>
                </button>
                <button className='cancel'>
                    <span> الغاء</span>
                </button>
            </div>
        </div>
       
      );
    };
    
  


export default Copon;
