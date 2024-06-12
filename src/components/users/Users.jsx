import React, { useState } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import check from '../../assests/check.svg';
import plus from '../../assests/plus.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import "./mee.css"
const Users = () => {
    const [data, setData] = useState([
        { id: 1, NameArabic: 'احمد محمد ', NameEnglis:"AhmedMohamed", email : 'ahmedmohamed941@gmail.com'},
        { id: 2, NameArabic: 'احمد محمد ',  NameEnglis:"AhmedMohamed", email : 'ahmedmohamed941@gmail.com'},
        { id: 3, NameArabic: 'احمد محمد ',  NameEnglis:"AhmedMohamed", email : 'ahmedmohamed941@gmail.com'},


      ]);
    
      const [editingId, setEditingId] = useState(null);
      const [newRowData, setNewRowData] = useState({});
    

    
      const handleDelete = (id) => {
        const newData = data.filter(row => row.id !== id);
        setData(newData);
      };
      const toggleActive = (id) => {
        const newData = data.map(row => {
          if (row.id === id) {
            return { ...row, active: !row.active };
          }
          return row;
        });
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
        const newData = data.map(row => {
          if (row.id === editingId) {
            return newRowData;
          }
          return row;
        });
        setData(newData);
        setEditingId(null);
        setNewRowData({});
      };
    
      return (
        <div className="container tables bg-white mt-5">
             <div className="tableTitle d-flex justify-content-between ">
          <h3>  المستخدمين</h3>
          <Link to="/AddUsers">       
            <button > 
          <img src={plus} alt="" />
        <span className='pe-3'> اضافة </span>   
   
          </button>
          </Link>
          </div>
       
          <table className=" table  borderless TableDr text-center ">
          <thead >
            <tr >
              <th  scope="col ">الرقم</th>
              <th scope="col ">الاسم باللغة العربية</th>
              <th scope="col ">الاسم باللغة الانجليزية  </th>
              <th scope="col ">الايميل    </th>
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
             
                <td >
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.NameEnglis} onChange={(e) => handleChange(e, 'NameEnglis')} />
                  ) : (
                    row.NameEnglis
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
    <Link to="/AddUsers">
    <img src={edit} alt="" />
    </Link>
                   
                    <img 
                    src={deletee} alt=""
                    onClick={() => handleDelete(row.id)}/>
                   </div>
                    </React.Fragment>
                  )}
                </td>
              </tr>
            ))}
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
    
  


export default Users;
