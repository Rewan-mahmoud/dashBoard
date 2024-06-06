import React, { useState } from 'react';
import deletee from '../../assests/delete.svg';
import check from '../../assests/checkIcon.svg';
import starFilled from "../../assests/star.svg";
import starEmpty from '../../assests/starEmpty.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// StarRating Component
const StarRating = ({ rating, onRatingChange }) => {
  const handleStarClick = (index) => {
    onRatingChange(index + 1);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <img
          key={index}
          src={index < rating ? starFilled : starEmpty}
          alt={index < rating ? "Filled Star" : "Empty Star"}
          style={{ cursor: 'pointer', width: '20px', height: '20px' }}
          onClick={() => handleStarClick(index)}
        />
      ))}
    </div>
  );
};


export default function RatingPage() {
  const [data, setData] = useState([
    { id: 1, DoctorName: 'احمد محمد', Ratings: 3, Comments: "good" },
    { id: 2, DoctorName: 'احمد محمد', Ratings: 4, Comments: "good" },
    { id: 3, DoctorName: 'احمد محمد', Ratings: 5, Comments: "good" },
    { id: 4, DoctorName: 'احمد محمد', Ratings: 2, Comments: "good" },
    { id: 5, DoctorName: 'احمد محمد', Ratings: 1, Comments: "good" },
    { id: 6, DoctorName: 'احمد محمد', Ratings: 3, Comments: "good" },
  ]);
  const toggleActive = (id) => {
    const newData = data.map(row => {
      if (row.id === id) {
        return { ...row, active: !row.active };
      }
      return row;
    });
    setData(newData);
  };
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

  const handleRatingChange = (rating) => {
    setNewRowData(prevData => ({
      ...prevData,
      Ratings: rating
    }));
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle">
        <h3>التقييمات</h3>
      </div>

      <table className="table TableDr text-center">
        <thead>
          <tr>
            <th scope="col">الرقم</th>
            <th scope="col">اسم الدكتور  </th>
            <th scope="col">التقييم</th>
            <th scope="col">التعليقات</th>
            <th scope="col">الاعدادات</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.DoctorName} onChange={(e) => handleChange(e, 'DoctorName')} />
                ) : (
                  row.DoctorName
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <StarRating rating={newRowData.Ratings} onRatingChange={handleRatingChange} />
                ) : (
                  <StarRating rating={row.Ratings} onRatingChange={() => {}} />
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input type="text" value={newRowData.Comments} onChange={(e) => handleChange(e, 'Comments')} />
                ) : (
                  row.Comments
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

                      <img src={deletee} alt="Delete" onClick={() => handleDelete(row.id)} />
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
}
