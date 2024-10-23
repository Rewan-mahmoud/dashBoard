import React, { useState, useEffect } from "react";
import edit from "../../assests/edit.svg";
import deletee from "../../assests/delete.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom"; // UseNavigate for routing
import plus from "../../assests/plus.svg";
import { useAuth } from "../../AuthContext";
import { useTranslation } from "react-i18next"; // Import translation hook

const Services = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation(); // Use the hook
  const { token } = useAuth();
  const navigate = useNavigate(); // Use navigate instead of useHistory

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://naql.nozzm.com/api/services", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            lang: i18n.language,
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

  const handleEditClick = (id) => {
    // Navigate to UpdateServices with the selected serviceId
    navigate('/UpdateServices', { state: { serviceId: id } });
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
          body: JSON.stringify({ status: active ? 1 : 0 }),
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
    const newStatus = currentStatus === 1 ? 0 : 1;
    const newData = data.map((row) => {
      if (row.id === id) {
        updateStatus(id, newStatus);
        return { ...row, status: newStatus };
      }
      return row;
    });

    setData(newData);
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between">
        <h3>{t("services.title")}</h3> {/* Translation key for the title */}
        <Link to="/AddServices">
          <button>
            <img src={plus} alt={t("services.addServiceIcon")} />
            <span className="pe-3">{t("services.addService")}</span>
          </button>
        </Link>
      </div>

      {error && (
        <p className="text-danger">
          {t("services.errorMessage")}: {error}
        </p>
      )}

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">{t("services.id")}</th>
            <th scope="col">{t("services.mainCategory")}</th>
            <th scope="col">{t("services.subCategory")}</th>
            <th scope="col">{t("services.controls")}</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.MainCategory}</td>
              <td>{row.Subcategory}</td>
              <td>
                <div className="drTableIcon">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={row.status === 1 ? "activeIcon" : "inactive"}
                    onClick={() => toggleActive(row.id, row.status)}
                  />
                  {/* Edit Button */}
                  <img
                    src={edit}
                    alt={t("services.editIcon")}
                    onClick={() => handleEditClick(row.id)} // Trigger navigation with ID
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={deletee}
                    alt={t("services.deleteIcon")}
                    onClick={() => handleDelete(row.id)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Services;
