import React, { useState } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import check from '../../assests/check.svg';
import plus from '../../assests/plus.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

// import "./mee.css"
const TreatmentPlans = () => {
    const [data, setData] = useState([
        { id: 1, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed  ', Number: "تأمل" , email : '5 مراحل'},
        { id: 2, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed ', Number: "تأمل" , email : '5 مراحل'},
        { id: 3, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed ', Number: "تأمل" , email : '5 مراحل'},
        { id: 4, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed ', Number: "تأمل" , email : '5 مراحل'},
        { id: 5, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed ', Number: "تأمل" , email : '5 مراحل'},
        { id: 6, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed ', Number: "تأمل" , email : '5 مراحل'},


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
        <h3> الخطط العلاجية للمعالج</h3>
        
        <Link to="/AddTreatmentPlans">       
            <button > 
          <img src={plus} alt="" />
        <span className='pe-3'> اضافة </span>   
   
          </button>
          </Link>
          </div>
       
          <table className=" table TableDr text-center ">
          <thead >
            <tr >
              <th  scope="col ">الرقم</th>
              <th scope="col ">الاسم باللغة العربية</th>
              <th scope="col ">الاسم باللغة الانجليزية  </th>
              
              <th scope="col ">نوع الخطة </th>
              <th scope="col ">عدد المراحل  </th>
              <th scope="col ">الاعدادات </th>
             
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
                    <input type="text" value={newRowData.NameEnglish} onChange={(e) => handleChange(e, 'NameEnglish')} />
                  ) : (
                    row.NameEnglish
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
                    <input type="text" value={newRowData.email} onChange={(e) => handleChange(e, 'email')} />
                  ) : (
                    row.email
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
    
  


export default TreatmentPlans;
