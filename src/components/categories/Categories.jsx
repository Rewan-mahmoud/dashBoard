import React, { useState, useEffect } from "react";
import edit from "../../assests/edit.svg";
import deletee from "../../assests/delete.svg";
import plus from "../../assests/plus.svg";
import add from "../../assests/add.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../AuthContext';
const Categories = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newData, setNewData] = useState({
    id: "",
    name_ar: "",
    name_en: "",
    details_ar: "",
    details_en: "",
    image: "",
    status: "active",
  });
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://naql.nozzm.com/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            lang: i18n.language, 
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
  }, [token, i18n.language]);

  const toggleActive = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? 0 : 1;
      const response = await fetch(
        `https://naql.nozzm.com/api/active_category/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            lang: i18n.language,
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

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    setSelectedIcon(file);
    setNewRowData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://naql.nozzm.com/api/destroy_category/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            lang: i18n.language,
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
      const formData = new FormData();
      formData.append("name_ar", newRowData.name_ar);
      formData.append("name_en", newRowData.name_en);
      formData.append("details_ar", newRowData.details_ar);
      formData.append("details_en", newRowData.details_en);

      if (selectedIcon) {
        formData.append("image", selectedIcon);
      } else {
        formData.append("image", newRowData.image); // Send existing image if no new one is selected
      }

      const response = await fetch(
        `https://naql.nozzm.com/api/update_category/${editingId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            lang: i18n.language,
            accept: "application/json",
          },
          body: formData,
        }
      );
      const result = await response.json();
      if (result.status) {
        setData(
          data.map((row) =>
            row.id === editingId
              ? {
                  ...row,
                  ...newRowData,
                  image: selectedIcon
                    ? URL.createObjectURL(selectedIcon)
                    : row.image,
                }
              : row
          )
        );
        setEditingId(null);
        setNewRowData({});
        setSelectedIcon(null);
      } else {
        console.error("Failed to save data:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setError(error.message);
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleAddChange = (e, key) => {
    const { value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleIconChanges = (e) => {
    const file = e.target.files[0];
    setNewData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleAddSave = async () => {
    const formData = new FormData();
    formData.append("name_ar", newData.name_ar);
    formData.append("name_en", newData.name_en);
    formData.append("details_ar", newData.details_ar);
    formData.append("details_en", newData.details_en);

    if (newData.image) {
      formData.append("image", newData.image);
    } else {
      setError("الصورة مطلوبة.");
      return; // Stop execution if no image is uploaded
    }

    try {
      const response = await fetch("https://naql.nozzm.com/api/add_category", {
        method: "POST",
        headers: {
          Accept: "application/json",
          lang: i18n.language,
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (result.status) {
        setData((prevData) => [...prevData, result.data]); // Assuming the new data is returned in the response
        setNewData({
          id: "",
          name_ar: "",
          name_en: "",
          details_ar: "",
          details_en: "",
          image: "",
        });
        setIsAdding(false);
      } else {
        console.error("Failed to add category:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      setError(error.message);
    }
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between">
        <h3>{t('categories')}</h3> {/* Translate static 'الفئات' */}
        <button onClick={handleAdd}>
          <img src={plus} alt="" />
          <span className="pe-3">{t('add')}</span> {/* Translate static 'اضافة' */}
        </button>
      </div>

      {error && <p className="text-danger">{t('error')}: {error}</p>} {/* Translate 'Error' */}

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">{t('number')}</th> {/* Translate 'الرقم' */}
            <th scope="col">{t('icon')}</th> {/* Translate 'الايقون' */}
            <th scope="col">{t('name_ar')}</th> {/* Translate 'الاسم بالعربي' */}
            <th scope="col">{t('name_en')}</th> {/* Translate 'الاسم' */}
            <th scope="col">{t('details_ar')}</th> {/* Translate 'التفاصيل بالعربي' */}
            <th scope="col">{t('details_en')}</th> {/* Translate 'التفاصيل' */}
            <th scope="col">{t('controls')}</th> {/* Translate 'التحكم' */}
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editingId === row.id ? (
                  selectedIcon ? (
                    <img
                      src={URL.createObjectURL(selectedIcon)}
                      alt={t('selected_icon')} // Translate static 'Selected Icon'
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleIconChange}
                      accept="image/*"
                    />
                  )
                ) : (
                  <img
                    src={row.image}
                    alt={t('icon')} // Translate static 'Icon'
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                  />
                )}
              </td>

              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={newRowData.name_ar || row.name_ar}
                    onChange={(e) => handleChange(e, "name_ar")}
                  />
                ) : (
                  row.name_ar
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={newRowData.name_en || row.name_en}
                    onChange={(e) => handleChange(e, "name_en")}
                  />
                ) : (
                  row.name_en
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={newRowData.details_ar || row.details_ar}
                    onChange={(e) => handleChange(e, "details_ar")}
                  />
                ) : (
                  row.details_ar
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={newRowData.details_en || row.details_en}
                    onChange={(e) => handleChange(e, "details_en")}
                  />
                ) : (
                  row.details_en
                )}
              </td>
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
            </tr>
          ))}
          {isAdding && (
            <tr>
              <td>{newData.id}</td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleIconChanges}
                  accept="image/*"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newData.name_ar}
                  onChange={(e) => handleAddChange(e, "name_ar")}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newData.name_en}
                  onChange={(e) => handleAddChange(e, "name_en")}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newData.details_ar}
                  onChange={(e) => handleAddChange(e, "details_ar")}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newData.details_en}
                  onChange={(e) => handleAddChange(e, "details_en")}
                />
              </td>
              <td>
                <button className="btn btn-sm" onClick={handleAddSave}>
                  <img src={add} alt={t('add')} style={{ width: "20px" }} />
                </button>
                <button className="btn btn-sm" onClick={() => setIsAdding(false)}>
                  <img src={deletee} alt={t('cancel')} />
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
