import React, { useState, useEffect } from "react";
import edit from "../../assests/edit.svg";
import deletee from "../../assests/delete.svg";
import plus from "../../assests/plus.svg";
import add from "../../assests/add.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../AuthContext";

const Subcategories = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newData, setNewData] = useState({
    id: data.length + 1,
    NameArabic: "",
    NameEnglish: "",
    details_ar: "",
    details_en: "",
    icon: "",
    cat_id: "",
  });
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://naql.nozzm.com/api/subcategories",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              lang: i18n.language,
            },
            body: JSON.stringify({}),
          }
        );
        const result = await response.json();
        if (result.status) {
          const fetchedData = result.data.data.map((item) => ({
            id: item.id,
            NameArabic: item.name_ar,
            NameEnglish: item.name_en,
            DetailsAr: item.details_ar,
            DetailsEn: item.details_en,
            icon: item.image,
            cat_id: item.cat_id,
          }));
          setData(fetchedData);
        } else {
          console.error("Failed to fetch data:", result.message);
          setError(result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    const fetchCategories = async () => {
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
          setCategories(result.data.data);
        } else {
          console.error("Failed to fetch categories:", result.message);
          setError(result.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message);
      }
    };

    fetchData();
    fetchCategories();
  }, [token, i18n.language]);

  const toggleActive = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? 0 : 1;
      const response = await fetch(
        `https://naql.nozzm.com/api/active_subcategory/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            lang: i18n.language,
          },
          body: JSON.stringify({ status: newStatus }),
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
        `https://naql.nozzm.com/api/destroy_subcategory/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
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
      formData.append("name_ar", newRowData.NameArabic || "");
      formData.append("name_en", newRowData.NameEnglish || "");
      formData.append("details_ar", newData.details_ar);
      formData.append("details_en", newData.details_en);
      formData.append("cat_id", newRowData.cat_id || "");
      if (selectedIcon) {
        formData.append("icon", selectedIcon);
      }

      const response = await fetch(
        `https://naql.nozzm.com/api/update_subcategory/${editingId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            lang: i18n.language,
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (result.status) {
        const updatedData = data.map((row) => {
          if (row.id === editingId) {
            return {
              ...row,
              ...newRowData,
              icon: selectedIcon ? URL.createObjectURL(selectedIcon) : row.icon,
            };
          }
          return row;
        });
        setData(updatedData);
        setEditingId(null);
        setNewRowData({});
        setSelectedIcon(null);
      } else {
        console.error("Failed to update subcategory:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
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

  const handleAddSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name_ar", newData.NameArabic);
      formData.append("name_en", newData.NameEnglish);
      formData.append("details_ar", newData.details_ar);
      formData.append("details_en", newData.details_en);
      formData.append("cat_id", newData.cat_id);
      if (selectedIcon) {
        formData.append("icon", selectedIcon);
      }

      const response = await fetch(
        "https://naql.nozzm.com/api/add_subcategory",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (result.status) {
        setData((prevData) => [...prevData, newData]);
        setNewData({
          id: data.length + 2,
          NameArabic: "",
          NameEnglish: "",
          details_ar: "",
          details_en: "",
          icon: "",
          cat_id: "",
        });
        setIsAdding(false);
        setSelectedIcon(null);
      } else {
        console.error("Failed to add subcategory:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error adding subcategory:", error);
      setError(error.message);
    }
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between">
        <h3>{t("subcategories")}</h3>
        <button onClick={handleAdd}>
          <img src={plus} alt="" />
          <span className="pe-3">{t("add")}</span>
        </button>
      </div>

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">{t("number")}</th>
            <th scope="col">{t("icon")}</th>
            <th scope="col">{t("name_ar")}</th>
            <th scope="col">{t("name_en")}</th>
            <th scope="col">{t("details_ar")}</th>{" "}
            {/* Translate 'التفاصيل بالعربي' */}
            <th scope="col">{t("details_en")}</th> {/* Translate 'التفاصيل' */}
            <th scope="col">{t("main_category")}</th>
            <th scope="col">{t("controls")}</th>
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
                      alt="Selected Icon"
                    />
                  ) : (
                    <input
                      className="form-control"
                      type="file"
                      onChange={handleIconChange}
                      accept="image/*"
                    />
                  )
                ) : (
                  <img src={row.icon} alt="Icon" />
                )}
              </td>

              {/* NameArabic */}
              <td>
                {editingId === row.id ? (
                  <input
                    className="form-control"
                    type="text"
                    value={newRowData.NameArabic || row.NameArabic}
                    onChange={(e) => handleChange(e, "NameArabic")}
                  />
                ) : (
                  row.NameArabic
                )}
              </td>

              {/* NameEnglish */}
              <td>
                {editingId === row.id ? (
                  <input
                    className="form-control"
                    type="text"
                    value={newRowData.NameEnglish || row.NameEnglish}
                    onChange={(e) => handleChange(e, "NameEnglish")}
                  />
                ) : (
                  row.NameEnglish
                )}
              </td>

              {/* details_ar */}
              <td>
                {editingId === row.id ? (
                  <input
                    className="form-control"
                    type="text"
                    value={newRowData.DetailsAr || row.DetailsAr}
                    onChange={(e) => handleChange(e, "details_ar")}
                  />
                ) : (
                  row.DetailsAr
                )}
              </td>

              {/* details_en */}
              <td>
                {editingId === row.id ? (
                  <input
                    className="form-control"
                    type="text"
                    value={newRowData.DetailsEn || row.DetailsEn}
                    onChange={(e) => handleChange(e, "DetailsEn")}
                  />
                ) : (
                  row.DetailsEn
                )}
              </td>

              {/* Category */}
              <td>
                <div className="custom-select">
                  {editingId === row.id ? (
                    <select
                      type="text"
                      className="form-control"
                      value={newRowData.cat_id || row.cat_id}
                      onChange={(e) => handleChange(e, "cat_id")}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name_ar}
                        </option>
                      ))}
                    </select>
                  ) : (
                    categories.find((category) => category.id === row.cat_id)
                      ?.name_ar || "N/A"
                  )}
                  <div className="arrow-icon">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                </div>
              </td>

              {/* Controls */}
              <td>
                {editingId === row.id ? (
                  <React.Fragment>
                    <button className="btn btn-sm ml-2" onClick={handleSave}>
                      <img src={add} alt={t("add")} style={{ width: "20px" }} />
                    </button>
                    <button
                      className="btn btn-sm"
                      onClick={() => {
                        setEditingId(null);
                        setSelectedIcon(null);
                      }}
                    >
                      <img src={deletee} alt={t("delete")} />
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={
                        row.status === "active" ? "activeIcon" : "inactive"
                      }
                      onClick={() => toggleActive(row.id, row.status)}
                    />
                    <div className="drTableIcon">
                      <img
                        src={edit}
                        alt={t("edit")}
                        onClick={() => {
                          setEditingId(row.id);
                          setNewRowData(row);
                        }}
                      />
                      <img
                        src={deletee}
                        alt={t("delete")}
                        onClick={() => handleDelete(row.id)}
                      />
                    </div>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}

          {/* Render Add Row */}
          {isAdding && (
            <tr>
              <td>{newData.id}</td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleIconChange}
                  accept="image/*"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newData.NameArabic}
                  onChange={(e) => handleAddChange(e, "NameArabic")}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newData.NameEnglish}
                  onChange={(e) => handleAddChange(e, "NameEnglish")}
                />
              </td>

              {/* details_ar */}
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newData.details_ar}
                  onChange={(e) => handleAddChange(e, "details_ar")}
                />
              </td>

              {/* details_en */}
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newData.details_en}
                  onChange={(e) => handleAddChange(e, "details_en")}
                />
              </td>

              <td>
                <select
                  type="text"
                  className="form-control"
                  value={newData.cat_id}
                  onChange={(e) => handleAddChange(e, "cat_id")}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name_ar}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={handleAddSave}>{t("add")}</button>
                <button onClick={() => setIsAdding(false)}>
                  {t("cancel")}
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Subcategories;
