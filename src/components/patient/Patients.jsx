import React, { useState, useEffect } from "react";
import edit from "../../assests/edit.svg";
import deletee from "../../assests/delete.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from '../../AuthContext';
const Patients = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [error, setError] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://naql.nozzm.com/api/patients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            lang: "ar",
          },
          body: JSON.stringify({}),
        });
        const result = await response.json();
        if (result.status) {
          setData(result.data.data);
        } else {
          console.error("Failed to fetch data:", result.message);
          setError(result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [token]);

  const handleEdit = (id) => {
    setEditingId(id);
    const rowToEdit = data.find((row) => row.id === id);
    setNewRowData({ ...rowToEdit });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://naql.nozzm.com/api/destroy_patients/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            lang: "ar",
          },
        }
      );
      const result = await response.json();
      if (result.status) {
        setData(data.filter((row) => row.id !== id));
      } else {
        console.error("Failed to delete data:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      setError(error.message);
    }
  };

  const handleChange = (e, key) => {
    const { value } = e.target;
    setNewRowData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://naql.nozzm.com/api/update_patients/${editingId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            lang: "ar",
            Accept: "application/json",
          },
          body: JSON.stringify(newRowData),
        }
      );
      const result = await response.json();
      if (result.status) {
        setData(
          data.map((row) =>
            row.id === editingId ? { ...row, ...newRowData } : row
          )
        );
        setEditingId(null);
        setNewRowData({});
      } else {
        console.error("Failed to save data:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setError(error.message);
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? 0 : 1;
      const response = await fetch(
        `https://naql.nozzm.com/api/active_patients/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            lang: "ar",
          },
          body: JSON.stringify({ stauts: newStatus }), // Ensure the parameter name is correct
        }
      );
      const result = await response.json();
      if (result.status) {
        setData((prevData) =>
          prevData.map((row) =>
            row.id === id
              ? { ...row, status: newStatus === 1 ? "active" : "inactive" }
              : row
          )
        );
      } else {
        console.error("Failed to toggle active status:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error toggling active status:", error);
      setError(error.message);
    }
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle">
        <h3>المرضى</h3>
      </div>

      {error && <p className="text-danger">Error: {error}</p>}

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">الرقم</th>
            <th scope="col">الاسم باللغة العربية</th>
            <th scope="col">الجنس</th>
            <th scope="col">رقم الجوال</th>
            <th scope="col">الايميل</th>
            <th scope="col">الحالة</th>
            <th scope="col">الاعدادات</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    value={newRowData.name}
                    onChange={(e) => handleChange(e, "name")}
                  />
                ) : (
                  row.name
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    value={newRowData.gender}
                    onChange={(e) => handleChange(e, "gender")}
                  />
                ) : (
                  row.gender
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    value={newRowData.mobile}
                    onChange={(e) => handleChange(e, "mobile")}
                  />
                ) : (
                  row.mobile
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    value={newRowData.email}
                    onChange={(e) => handleChange(e, "email")}
                  />
                ) : (
                  row.email
                )}
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={
                    row.status === "active" ? "activeIcon" : "inactive"
                  }
                  onClick={() => toggleActive(row.id, row.status)}
                />
              </td>
              <td>
                {editingId === row.id ? (
                  <React.Fragment>
                    <button className="save-btn" onClick={handleSave}>
                      حفظ
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingId(null)}
                    >
                      الغاء
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="drTableIcon">
                      <img
                        src={edit}
                        alt="edit"
                        onClick={() => handleEdit(row.id)}
                      />
                      <img
                        src={deletee}
                        alt="delete"
                        onClick={() => handleDelete(row.id)}
                      />
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
