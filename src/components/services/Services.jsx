import React, { useState, useEffect } from "react";
import edit from "../../assests/edit.svg";
import deletee from "../../assests/delete.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import plus from "../../assests/plus.svg";
import { useAuth } from "../../AuthContext";
const Services = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [error, setError] = useState(null);

  const { token } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://naql.nozzm.com/api/services", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            lang: "ar",
          },
        });
        const result = await response.json();
        if (result.status) {
          setData(
            result.data.data.map((item) => ({
              id: item.id,
              MainCategory: item?.category?.name,
              Subcategory: item?.sub_category?.name,
              SpecialistName: item.Service_doctors[0]?.doctors.name || "N/A",
            }))
          );
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
        `https://naql.nozzm.com/api/destory_service/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
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
        `https://naql.nozzm.com/api/update_service/${editingId}`,
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
  const updateStatus = async (id, active) => {
    try {
      const response = await fetch(
        `https://naql.nozzm.com/api/active_service/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            lang: "ar",
          },
          body: JSON.stringify({ status: active ? 1 : 0 }), // Correct: sending 'status'
        }
      );
      const result = await response.json();
      if (!result.status) {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setError(error.message);
    }
  };
  
  const toggleActive = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1; // Toggle between 1 (active) and 0 (inactive)
  
    const newData = data.map((row) => {
      if (row.id === id) {
        updateStatus(id, newStatus); // Update the status in the backend
        return { ...row, status: newStatus }; // Update the status locally in the state
      }
      return row;
    });
  
    setData(newData);
  };
  

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between">
        <h3>الخدمات</h3>
        <Link to="/AddServices">
          <button>
            <img src={plus} alt="" />
            <span className="pe-3"> اضافة </span>
          </button>
        </Link>
      </div>

      {error && <p className="text-danger">Error: {error}</p>}

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">الرقم</th>
            <th scope="col">اسم الفئة الاساسية</th>
            <th scope="col">الاسم الفئة الفرعية</th>

            <th scope="col">التحكم</th>
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
                    value={newRowData.MainCategory}
                    onChange={(e) => handleChange(e, "MainCategory")}
                  />
                ) : (
                  row.MainCategory
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    value={newRowData.Subcategory}
                    onChange={(e) => handleChange(e, "Subcategory")}
                  />
                ) : (
                  row.Subcategory
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
                    <div className="drTableIcon">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={row.status === 1 ? "activeIcon" : "inactive"} // Handle boolean/numeric status values
                        onClick={() => toggleActive(row.id, row.status)} // Pass the row ID and current status
                      />

                      <Link to="/UpdateServices">
                        <img src={edit} alt="edit" />
                      </Link>
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

export default Services;
