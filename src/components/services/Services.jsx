import React, { useState } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import plus from '../../assests/plus.svg';

const Services = () => {
    const [data, setData] = useState([
        { id: 1, MainCategory: 'جلسة فورية  ', Subcategory: 'اضرابات التعلم ', SpecialictName: "احمد محمد" },
        { id: 2, MainCategory: 'جلسة فورية  ',  Subcategory: 'اضرابات التعلم ', SpecialictName: "احمد محمد"  },
        { id: 3, MainCategory: 'جلسة فورية  ',  Subcategory: 'اضرابات التعلم ', SpecialictName: "احمد محمد"  },
        { id: 4, MainCategory: 'جلسة فورية  ',  Subcategory: 'اضرابات التعلم ', SpecialictName: "احمد محمد"  },
        { id: 5, MainCategory: 'جلسة فورية  ',  Subcategory: 'اضرابات التعلم ', SpecialictName: "احمد محمد"  },
        { id: 6, MainCategory: 'جلسة فورية  ',  Subcategory: 'اضرابات التعلم ', SpecialictName: "احمد محمد"  },


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
         <div className="tableTitle d-flex justify-content-between ">
            <h3>  الخدمات</h3>
            <Link to="/AddServices">       
            <button > 
          <img src={plus} alt="" />
          <span className='pe-3'> اضافة </span>   
          </button>
          </Link>
          </div>
       
          <table className=" table  borderless TableDr text-center ">
          <thead >
            <tr >
              <th  scope="col ">الرقم  </th>
              <th  scope="col ">اسم الفئة الاساسية</th>
              <th scope="col ">الاسم الفئة الفرعية </th>
              <th scope="col ">اسم المختص  </th>
            
              <th scope="col">التحكم</th>
             
             
            </tr>
          </thead>
          <tbody className='text-center'>
            {data.map(row => (
              <tr key={row.id}>
                <td >{row.id}</td>
                <td >
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.MainCategory} onChange={(e) => handleChange(e, 'MainCategory')} />
                  ) : (
                    row.MainCategory
                  )}
                </td>
                <td>
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.Subcategory} onChange={(e) => handleChange(e, 'Subcategory')} />
                  ) : (
                    row.Subcategory
                  )}
                </td>
                <td >
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.SpecialictName} onChange={(e) => handleChange(e, 'SpecialictName')} />
                  ) : (
                    row.SpecialictName
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
                         <Link >
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
    
  


export default Services;
