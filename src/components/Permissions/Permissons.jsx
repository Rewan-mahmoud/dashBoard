import React, { useState, useEffect } from "react";
import edit from "../../assests/edit.svg";
import deletee from "../../assests/delete.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import plus from "../../assests/plus.svg";
import { useTranslation } from "react-i18next";
import { useAuth } from '../../AuthContext'; // Assuming you are using an AuthContext for authentication

const Permissions = () => {
  const { t, i18n } = useTranslation();
  const { token } = useAuth(); // Get the token for authentication
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [error, setError] = useState(null); // Error state for handling errors

  // Fetch roles data from the API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("https://naql.nozzm.com/api/roles", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers for authorization
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.status) {
          setData(result.data); // Set the roles data in state
        } else {
          setError(result.message); // Handle error if the request fails
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        setError("Failed to fetch roles.");
      }
    };

    fetchRoles();
  }, [token]);

  const handleEdit = (id) => {
    setEditingId(id);
    const rowToEdit = data.find((row) => row.id === id);
    const newRowDataCopy = { ...rowToEdit };
    setNewRowData(newRowDataCopy);
  };

  const handleDelete = (id) => {
    const newData = data.filter((row) => row.id !== id);
    setData(newData);
  };

  const handleChange = (e, key) => {
    const { value } = e.target;
    setNewRowData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSave = () => {
    const newData = data.map((row) => {
      if (row.id === editingId) {
        return newRowData;
      }
      return row;
    });
    setData(newData);
    setEditingId(null);
    setNewRowData({});
  };

  const toggleActive = (id) => {
    const newData = data.map((row) => {
      if (row.id === id) {
        return { ...row, active: !row.active };
      }
      return row;
    });
    setData(newData);
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between ">
        <h3>{t("permission")}</h3>
        <Link to="/AddPermissions">
          <button>
            <img src={plus} alt="" />
            <span className="pe-3"> اضافة </span>
          </button>
        </Link>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">{t("number")}</th>
            <th scope="col">{t("name_ar")}</th>
            <th scope="col">{t("name_en")}</th>
            <th scope="col">{t("controls")}</th>
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
                    value={newRowData.name_en}
                    onChange={(e) => handleChange(e, "name_en")}
                  />
                ) : (
                  row.name_en
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <React.Fragment>
                    <button className="save-btn" onClick={handleSave}>
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="drTableIcon">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={row.active ? "activeIcon" : "inactive"}
                        onClick={() => toggleActive(row.id)}
                      />
                      <Link>
                        <img src={edit} alt="Edit" onClick={() => handleEdit(row.id)} />
                      </Link>

                      <img
                        src={deletee}
                        alt="Delete"
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

export default Permissions;
