import React, { useState, useEffect } from "react";
import edit from "../../assests/edit.svg";
import deletee from "../../assests/delete.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import add from "../../assests/add.jpeg";
import { useAuth } from '../../AuthContext';
import { useTranslation } from 'react-i18next'; // Import useTranslation for dynamic language handling

const Patients = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [error, setError] = useState(null);
  const { t } = useTranslation(); // Use the useTranslation hook
  const { token } = useAuth();
  const { i18n } = useTranslation(); // Use the i18n instance to get the current language
  const [selectedIcon, setSelectedIcon] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://naql.nozzm.com/api/patients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            lang: i18n.language, // Dynamically set the language
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
  }, [token, i18n.language]); // Include i18n.language to refetch if the language changes

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
            lang: i18n.language, // Dynamically set the language
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
            lang: i18n.language, // Dynamically set the language
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
            lang: i18n.language, // Dynamically set the language
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
      <h3>{t('patients')}</h3> {/* Translate 'المرضى' */}
      </div>

      {error && <p className="text-danger">Error: {error}</p>}

      <table className="table borderless TableDr text-center">
        <thead>
        <tr>
            <th scope="col">{t('number')}</th> {/* Translate 'الرقم' */}
            <th scope="col">{t('name_in_arabic')}</th> {/* Translate 'الاسم باللغة العربية' */}
            <th scope="col">{t('gender')}</th> {/* Translate 'الجنس' */}
            <th scope="col">{t('mobile_number')}</th> {/* Translate 'رقم الجوال' */}
            <th scope="col">{t('email')}</th> {/* Translate 'الايميل' */}
            <th scope="col">{t('status')}</th> {/* Translate 'الحالة' */}
            <th scope="col">{t('settings')}</th> {/* Translate 'الاعدادات' */}
          </tr>

        </thead>
        <tbody className="text-center">
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editingId === row.id ? (
                  <input
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                  className={row.status === "active" ? "activeIcon" : "inactive"}
                  onClick={() => toggleActive(row.id, row.status)}
                />
              </td>
              <td>
                {editingId === row.id ? (
           <td>
           {editingId === row.id ? (
             <React.Fragment>
               <button className="btn  btn-sm ml-2" onClick={handleSave}>
                 <img src={add} alt={t('add')} style={{ width: "20px" }} />
               </button>
               <button
                 className="btn  btn-sm"
                 onClick={() => {
                   setEditingId(null);
                   setSelectedIcon(null);
                 }}
               >
                 <img src={deletee} alt={t('delete')} />
               </button>
             </React.Fragment>
           ) : (
             <React.Fragment>
               <FontAwesomeIcon
                 icon={faCircleCheck}
                 className={row.status === "active" ? "activeIcon" : "inactive"}
                 onClick={() => toggleActive(row.id, row.status)}
               />
               <div className="drTableIcon">
                 <img
                   src={edit}
                   alt={t('edit')} // Translate static 'edit'
                   onClick={() => {
                     setEditingId(row.id);
                     setNewRowData(row);
                   }}
                 />
                 <img
                   src={deletee}
                   alt={t('delete')} // Translate static 'delete'
                   onClick={() => handleDelete(row.id)}
                 />
               </div>
             </React.Fragment>
           )}
         </td>
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
