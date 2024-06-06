import React, { useState } from 'react';
import deletee from '../../assests/delete.svg';
import clock from '../../assests/clock-rewind.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import plus from '../../assests/plus.svg';
import { Button, Modal } from 'react-bootstrap';
// import "./table.css"
const Reservation = () => {
    const [data, setData] = useState([
        { id: 1, first: 'نهي احمد', age: '35', gender: "انثي" , SessionName : 'ألاكتئاب' , DrName: "عبدالله احمد" , sessionPeriod:"30 دقيقة" , sessionType:"صوتية" , Date:"22/3/2022 5:00PM"},
        { id: 2, first: 'نهي احمد', age: '35', gender: "انثي" , SessionName : 'ألاكتئاب' , DrName: "عبدالله احمد" , sessionPeriod:"30 دقيقة" , sessionType:"صوتية" , Date:"22/3/2022 5:00PM"},
        { id: 3, first: 'نهي احمد', age: '35', gender: "انثي" , SessionName : 'ألاكتئاب' , DrName: "عبدالله احمد" , sessionPeriod:"30 دقيقة" , sessionType:"صوتية" , Date:"22/3/2022 5:00PM"},
        { id: 4, first: 'نهي احمد', age: '35', gender: "انثي" , SessionName : 'ألاكتئاب' , DrName: "عبدالله احمد" , sessionPeriod:"30 دقيقة" , sessionType:"صوتية" , Date:"22/3/2022 5:00PM"},

      ]);
    
      const [editingId, setEditingId] = useState(null);
      const [newRowData, setNewRowData] = useState({});
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

    
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
    
    

  const handleDateChange = (date) => {
    setNewRowData(prevData => ({
      ...prevData,
      Date: date
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
          <div className=" tableTitle  d-flex justify-content-between">
          <h3>الحجوزات </h3>
          <button > 
          <img src={plus} alt="" />
        <span className='pe-3'> اضافة </span>   
   
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
                        
                      <img  variant="primary" onClick={handleShow} src={clock} alt="" />
          
                    <img 
                    src={deletee} alt=""
                    onClick={() => handleDelete(row.id)}/>
                   </div>
                    </React.Fragment>
                  )}
                </td>
<div className='Modal'>
<Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title> <p>اعادة جدولة المواعيد</p>  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className='settingForm mb-5'>
                  <label htmlFor="formGroupExampleInput">الطبيب المعالج  :</label>
                  <select className="form-control">
  <option value="option1"> احمد عبدالله</option>
  <option value="option2"> عصام مسعد</option>
  <option value="option3"> روان محمود</option>
</select>

            
                  </div>
                  <label htmlFor="formGroupExampleInput">الطبيب المعالج  :</label>
            <DatePicker
                    selected={newRowData.Date}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                  />
                
                </Modal.Body>
                <Modal.Footer>
                <div
            className='BottomButtons'>
                <button onClick={handleClose} className='save'>
                    <span> حفظ</span>
                </button>
                <button onClick={handleClose} className='cancel'>
                    <span> الغاء</span>
                </button>
            </div>
                </Modal.Footer>
            </Modal>
</div>
              
              </tr>
            ))}
          </tbody>
        </table>
        </div>
       
      );
    };
    
  


export default Reservation;
