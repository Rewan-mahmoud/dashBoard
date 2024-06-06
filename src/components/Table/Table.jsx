import React, { useState } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import clock from '../../assests/clock-rewind.svg';
import arrow from '../../assests/arrow.svg';
import "./table.css"
const Table = () => {
    const [data, setData] = useState([
        { id: 1, first: 'نهي احمد', age: '35', gender: "انثي" , SessionName : 'ألاكتئاب' , DrName: "عبدالله احمد" , sessionPeriod:"30 دقيقة" , sessionType:"صوتية" , Date:"22/3/2022 5:00PM"},
        { id: 2, first: 'نهي احمد', age: '35', gender: "انثي" , SessionName : 'ألاكتئاب' , DrName: "عبدالله احمد" , sessionPeriod:"30 دقيقة" , sessionType:"صوتية" , Date:"22/3/2022 5:00PM"},
        { id: 3, first: 'نهي احمد', age: '35', gender: "انثي" , SessionName : 'ألاكتئاب' , DrName: "عبدالله احمد" , sessionPeriod:"30 دقيقة" , sessionType:"صوتية" , Date:"22/3/2022 5:00PM"},
        { id: 4, first: 'نهي احمد', age: '35', gender: "انثي" , SessionName : 'ألاكتئاب' , DrName: "عبدالله احمد" , sessionPeriod:"30 دقيقة" , sessionType:"صوتية" , Date:"22/3/2022 5:00PM"},

      ]);
    
      const [editingId, setEditingId] = useState(null);
      const [newRowData, setNewRowData] = useState({});
    
      
      
    
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
          <div className="DashBoardTableTitle mb-5 d-flex justify-content-between">
          <h3>الحجوزات</h3>
          <button >
          <span className='pe-3'>مشاهدة الكل</span>
          <img src={arrow} alt="" />
        </button>
          </div>
       
          <table className=" table ">
          <thead>
            <tr>
              <th scope="col">الرقم</th>
              <th scope="col">اسم المريض</th>
              <th scope="col">العمر</th>
              <th scope="col">الجنس</th>
              <th scope="col">اسم الجلسة</th>
              <th scope="col">اسم الدكتور</th>
              <th scope="col">مدة الجلسة</th>
              <th scope="col">نوع الجلسة</th>
              <th scope="col">الوقت و التاريخ</th>
              <th scope="col">الاعدادات</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.first} onChange={(e) => handleChange(e, 'first')} />
                  ) : (
                    row.first
                  )}
                </td>
                <td>
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.age} onChange={(e) => handleChange(e, 'age')} />
                  ) : (
                    row.age
                  )}
                </td>
                <td>
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.gender} onChange={(e) => handleChange(e, 'gender')} />
                  ) : (
                    row.gender
                  )}
                </td>
                <td>
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.SessionName} onChange={(e) => handleChange(e, 'SessionName')} />
                  ) : (
                    row.SessionName
                  )}
                </td>
                <td>
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.DrName} onChange={(e) => handleChange(e, 'DrName')} />
                  ) : (
                    row.DrName
                  )}
                </td>
                <td>
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.sessionPeeriod} onChange={(e) => handleChange(e, 'sessionPeriod')} />
                  ) : (
                    row.sessionPeriod
                  )}
                </td>
                <td>
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.sessionType} onChange={(e) => handleChange(e, 'sessionType')} />
                  ) : (
                    row.sessionType
                  )}
                </td>
                <td>
                  {editingId === row.id ? (
                    <input type="text" value={newRowData.Date} onChange={(e) => handleChange(e, 'Date')} />
                  ) : (
                    row.Date
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
                      <div className='icons'>
                      <img src={clock} alt="" />
                  
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
    
  


export default Table;
