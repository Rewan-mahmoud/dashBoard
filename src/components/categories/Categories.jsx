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
// import "./Categories.css"
const Categories = () => {
    const [data, setData] = useState([
        { id: 1, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed Mohamed',icon: Frame1 },
        { id: 2, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed Mohamed',icon: Frame2 },
        { id: 3, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed Mohamed',icon: Frame3 },
        { id: 4, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed Mohamed',icon: Frame4 },
        { id: 5, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed Mohamed',icon: Frame5 },
        { id: 6, NameArabic: 'احمد محمد ', NameEnglish: 'Ahmed Mohamed',icon: Frame6 },

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
          <h3>  الفئات</h3>
          <button > 
          <img src={plus} alt="" />
        <span className='pe-3'> اضافة </span>   
   
          </button>
          </div>
       
          <table className=" table TableDr text-center ">
          <thead >
            <tr >
              <th  scope="col ">الرقم</th>
              <th scope="col ">الايقون</th>
              <th scope="col ">الاسم باللغة العربية</th>
              <th scope="col ">الاسم باللغة الانجليزية</th>
              <th scope="col ">التحكم </th>
             
            </tr>
          </thead>
          <tbody className='text-center'>
            {data.map(row => (
              <tr key={row.id}>
                <td >{row.id}</td>
                
                <td>
             
              <img src={row.icon} alt="" />
            </td>
              
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
    
  


export default Categories;
