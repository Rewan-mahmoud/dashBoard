import React, { useState } from 'react';
import edit from '../../assests/edit.svg';
import deletee from '../../assests/delete.svg';
import clock from '../../assests/clock-rewind.svg';
import arrow from '../../assests/arrow.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import plus from '../../assests/plus.svg';
import calendar from '../../assests/calendar.svg';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
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
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const [show, setShow] = useState(false);
      
    
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
      const handleDateChange = (date) => {
        setNewRowData(prevData => ({
          ...prevData,
          Date: date
        }));
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
       
          <table className=" table  borderless">
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
                <div className='Modal '>
<Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title> <p>اعادة جدولة المواعيد</p>  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className='settingForm'>
                  <label htmlFor="formGroupExampleInput">الطبيب المعالج  :</label>
                  <br />
                  <select className="form-control reservationSelect">
  <option value="option1"> احمد عبدالله</option>
  <option value="option2"> عصام مسعد</option>
  <option value="option3"> روان محمود</option>
</select>
<div className="ReservationArrow-icon">
  <FontAwesomeIcon icon={faChevronDown} />
  </div>
  </div>
            
               <div className=' settingForm'>
               <label className='mb-4' htmlFor="formGroupExampleInput">تحديد تاريخ جديد:</label>
        <br />
               <DatePicker
        className='reservationSelect form-control '
                       selected={newRowData.Date}
                       onChange={handleDateChange}
                      //  showTimeSelect
                      //  dateFormat="Pp"
                     />
                    <img className='Calender' src={calendar}/>

               </div>
        
                 
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
    
  


export default Table;
