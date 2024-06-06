import React, { useState } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import "./Patients.css"
const Patients = () => {
    const [data, setData] = useState([
        { id: 1, NameArabic: 'احمد محمد ', gender: 'انثى ', Number: "01282001377" , email : 'ahmedmohamed941@gmail.com'},
        { id: 2, NameArabic: 'احمد محمد ', gender: 'انثى ', Number: "01282001377" , email : 'ahmedmohamed941@gmail.com'},
        { id: 3, NameArabic: 'احمد محمد ', gender: 'انثى ', Number: "01282001377" , email : 'ahmedmohamed941@gmail.com'},
        { id: 4, NameArabic: 'احمد محمد ', gender: 'انثى ', Number: "01282001377" , email : 'ahmedmohamed941@gmail.com'},
        { id: 5, NameArabic: 'احمد محمد ', gender: 'انثى ', Number: "01282001377" , email : 'ahmedmohamed941@gmail.com'},
        { id: 6, NameArabic: 'احمد محمد ', gender: 'انثى ', Number: "01282001377" , email : 'ahmedmohamed941@gmail.com'},


      ]);
    
      const [editingId, setEditingId] = useState(null);
      const [newRowData, setNewRowData] = useState({});
   
    
      const handleEdit = (id) => {
        setEditingId(id);
        const rowToEdit = data.find(row => row.id === id);
        const newRowDataCopy = { ...rowToEdit };
        setNewRowData(newRowDataCopy);
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

      const toggleActive = (id) => {
        const newData = data.map(row => {
          if (row.id === id) {
            return { ...row, active: !row.active };
          }
          return row;
        });
        setData(newData);
      };
    
      return (
        <div className="container tables bg-white mt-5">
          <div className="tableTitle  ">
          <h3 > المرضى  </h3>
       
          </div>
       
          <table className=" table TableDr text-center ">
          <thead >
            <tr >
              <th  scope="col ">الرقم</th>
              <th scope="col ">الاسم باللغة العربية</th>
              <th scope="col ">الجنس  </th>
              
              <th scope="col ">رقم الجوال</th>
              <th scope="col ">الايميل  </th>
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
                    <input type="text" value={newRowData.gender} onChange={(e) => handleChange(e, 'gender')} />
                  ) : (
                    row.gender
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
                          {/* Apply conditional class based on active state */}
                       
                         <FontAwesomeIcon icon={faCircleCheck} className={row.active ? 'activeIcon' : 'inactive'} onClick={() => toggleActive(row.id)} />
                         <Link to="/AddMeetings">
                         <img 
                            src={edit} alt="" /></Link>
                        
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
        </div>
       
      );
    };
    
  


export default Patients;
