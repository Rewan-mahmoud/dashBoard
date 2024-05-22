import React, { useState } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import check from '../../assests/check.svg';
import plus from '../../assests/plus.svg';


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
    
      return (
        <div className="container tables bg-white mt-5">
             <div className="tableTitle d-flex justify-content-between ">
        <h3> الخطط العلاجية للمعالج</h3>
          <button > 
          <img src={plus} alt="" />
        <span className='pe-3'> اضافة </span>   
   
          </button>
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
                      <img src={check} alt="" />
    
                    <img 
                     onClick={() => handleEdit(row.id)}
                    src={edit} alt="" />
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
    
  


export default TreatmentPlans;
