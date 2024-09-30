import React, { useState, useEffect } from "react";
import edit from "../../assests/edit.svg";
import deletee from "../../assests/delete.svg";
import plus from "../../assests/plus.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import add from "../../assests/add.jpeg";
import { useTranslation } from "react-i18next";

const Coupons = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { t, i18n } = useTranslation();
  const [newData, setNewData] = useState({
    id: data.length + 1,
    code: "",
    start_date: "",
    end_date: "",
    discount: "",
    user_num: "",
  });

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://naql.nozzm.com/api/coupons", {
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
        `https://naql.nozzm.com/api/destroy_coupons/${id}`,
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
        `https://naql.nozzm.com/api/update_coupons/${editingId}`,
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
        `https://naql.nozzm.com/api/active_coupons/${id}`,
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
      const response = await fetch("https://naql.nozzm.com/api/add_coupons", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          lang: "ar",
          Accept: "application/json",
        },
        body: JSON.stringify(newData),
      });
      const result = await response.json();
      if (result.status) {
        setData([...data, result.data]);
        setNewData({
          id: data.length + 2,
          code: "",
          start_date: "",
          end_date: "",
          discount: "",
          user_num: "",
        });
        setIsAdding(false);
      } else {
        console.error("Failed to add data:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error adding data:", error);
      setError(error.message);
    }
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between ">
        <h3>{t("coupons.title")}</h3>
        <button onClick={handleAdd}>
          <img src={plus} alt="" />
          <span className="pe-3">{t("coupons.add")}</span>
        </button>
      </div>

      {error && (
        <p className="text-danger">
          {t("error")}: {error}
        </p>
      )}

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">{t("coupons.number")}</th>
            <th scope="col">{t("coupons.code")}</th>
            <th scope="col">{t("coupons.start_date")}</th>
            <th scope="col">{t("coupons.end_date")}</th>
            <th scope="col">{t("coupons.discount")}</th>
            <th scope="col">{t("coupons.user_num")}</th>
            <th scope="col">{t("coupons.status")}</th>
            <th scope="col">{t("coupons.actions")}</th>
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
                    className="form-control"
                    value={newRowData.code}
                    onChange={(e) => handleChange(e, "code")}
                  />
                ) : (
                  row.code
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={newRowData.start_date}
                    onChange={(e) => handleChange(e, "start_date")}
                  />
                ) : (
                  row.start_date
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={newRowData.end_date}
                    onChange={(e) => handleChange(e, "end_date")}
                  />
                ) : (
                  row.end_date
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={newRowData.discount}
                    onChange={(e) => handleChange(e, "discount")}
                  />
                ) : (
                  row.discount
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    className="form-control"
                    type="text"
                    value={newRowData.user_num}
                    onChange={(e) => handleChange(e, "user_num")}
                  />
                ) : (
                  row.user_num
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
                    <button className="btn  btn-sm ml-2" onClick={handleSave}>
                      <img src={add} alt={t("add")} style={{ width: "20px" }} />
                    </button>
                    <button
                      className="btn  btn-sm"
                      onClick={() => {
                        setEditingId(null);
                      }}
                    >
                      <img src={deletee} alt={t("delete")} />
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
          {isAdding && (
            <tr>
              <td>{newData.id}</td>
              <td>
                <input
                  className="form-control"
                  type="text"
                  value={newData.code}
                  onChange={(e) => handleAddChange(e, "code")}
                />
              </td>
              <td>
                <input
                  className="form-control"
                  type="text"
                  value={newData.start_date}
                  onChange={(e) => handleAddChange(e, "start_date")}
                />
              </td>
              <td>
                <input
                  className="form-control"
                  type="text"
                  value={newData.end_date}
                  onChange={(e) => handleAddChange(e, "end_date")}
                />
              </td>
              <td>
                <input
                  className="form-control"
                  type="text"
                  value={newData.discount}
                  onChange={(e) => handleAddChange(e, "discount")}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newData.user_num}
                  onChange={(e) => handleAddChange(e, "user_num")}
                />
              </td>
              <td className="d-flex">
                <button className="btn  btn-success" onClick={handleAddSave}>{t("coupons.add")}</button>
                <button className="btn me-3 btn-danger" onClick={() => setIsAdding(false)}>
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

export default Coupons;
