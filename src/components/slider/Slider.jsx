import React, { useState } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import plus from '../../assests/plus.svg';
import check from '../../assests/check.svg';
import card1 from '../../assests/card 3.svg';
import Card2 from '../../assests/card 4.svg';
import card3 from '../../assests/card 5.svg';
import card4 from '../../assests/card 6.svg';

// import "./Categories.css"
const Slider = () => {
    const [data, setData] = useState([
        { id: 1, icon: card1 },
        { id: 2,icon: Card2 },
        { id: 3,icon: card3 },
        { id: 4,icon: card4 },
  

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
        <spa className='pe-3'> اضافة </spa>   
   
          </button>
          </div>
       
          <table className=" table TableDr text-center ">
          <thead >
            <tr >
              <th  scope="col ">الرقم</th>
              <th scope="col ">الصورة</th>
        
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
    
  


export default Slider;
