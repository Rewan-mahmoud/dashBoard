import React, { useState, useEffect } from 'react';
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
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch('https://naql.nozzm.com/api/rating', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        if (result.status) {
          const formattedData = result.data.data.map(item => ({
            id: item.id,
            DoctorName: item.doctores,
            Ratings: item.rating_num,
            Comments: item.comment,
            active: item.stauts === "active"
          }));
          setData(formattedData);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [token]);

  const toggleActive = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 0 : 1;
      const response = await fetch(`https://naql.nozzm.com/api/active_rating/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'lang': 'ar'
        },
        body: JSON.stringify({ stauts: newStatus }), // Ensure the parameter name is correct
      });
      const result = await response.json();
      if (result.status) {
        setData(prevData =>
          prevData.map(row =>
            row.id === id ? { ...row, status: newStatus === 1 ? 'active' : 'inactive' } : row
          )
        );
      } else {
        // console.error('Failed to toggle active status:', result.message);
      
      }
    } catch (error) {
      // console.error('Error toggling active status:', error);
      // setError(error.message);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const rowToEdit = data.find(row => row.id === id);
    const newRowDataCopy = { ...rowToEdit };
    setNewRowData(newRowDataCopy);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://naql.nozzm.com/api/destroy_rating/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'lang': 'ar',
        },
      });
      const result = await response.json();
      if (result.status) {
        setData(data.filter(row => row.id !== id));
      } else {
        console.error('Failed to delete data:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      setError(error.message);
    }
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

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">الرقم</th>
            <th scope="col">اسم الدكتور</th>
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
                    <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={row.status === 'active' ? 'activeIcon' : 'inactive'}
                  onClick={() => toggleActive(row.id, row.status)}
                />                  
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
