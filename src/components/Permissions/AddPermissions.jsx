import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "./permission.css";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";
const AddPermissions = () => {
  const { t } = useTranslation();
  const [permissions, setPermissions] = useState({});
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const { token } = useAuth();
  const modules = [
    "Dashboard",
    "Doctor",
    "Patients",
    "Categories",
    "Subcategories",
    "Slider",
    "Services",
    "Reservation",
    "Meetings",
    "Treatment Plans",
    "Discount Coupons",
    "Permissions",
    "Users",
    "Loyalty Program",
    "FAQ",
    "General Settings",
  ];
  
  const permissionTypes = ["Create", "Edit", "Delete"]; // Use only valid permission types
  
  const handleCheckboxChange = (module, type) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [module]: {
        ...prevPermissions[module],
        [type]: !prevPermissions[module]?.[type],
      },
    }));
  };
  
  const handleSubmit = async () => {
    if (!nameAr || !nameEn) {
      alert("Please fill in both the Arabic and English names.");
      return;
    }
  
    const formattedPermissions = Object.keys(permissions).flatMap((module) =>
      Object.keys(permissions[module])
        .map((type) =>
          permissions[module][type] ? { name: `${type} ${module}` } : null
        )
        .filter(Boolean)
    );
  
    const payload = {
      name: nameAr,
      name_en: nameEn,
      permissions: formattedPermissions,
    };
  
    try {
      const response = await fetch("https://naql.nozzm.com/api/add_roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure Content-Type is included
          "Accept": "application/json",
          Authorization: `Bearer ${token || ''}`, // Ensure token is defined
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Permissions successfully added:", data);
      } else {
        const errorData = await response.json();
        console.error("Failed to add permissions:", errorData);
        alert(`Error: ${errorData.message || errorData}`);
      }
    } catch (error) {
      console.error("Error adding permissions:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  
  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between ">
        <h3>{t("permissions.addPermission")}</h3>
      </div>

      <div className="settingForm justify-content-around">
        <div className="row">
          <div className="col-md-3">
            <label>{t("permissions.nameInArabic")}</label>
            <input
              type="text"
              className="form-control"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label>{t("permissions.nameInEnglish")}</label>
            <input
              type="text"
              className="form-control"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
            />
          </div>
        </div>
      </div>

      <table className="table borderless table-borderless">
        <thead>
          <tr>
            <th scope="col">{t("permissions.module")}</th>
            {permissionTypes.map((type) => (
              <th scope="col" key={type}>
                {t(`permissions.${type.toLowerCase()}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {modules.map((module, index) => (
            <tr key={index}>
              <td>
                {t(`module.${module.toLowerCase()}`, { defaultValue: module })}
              </td>
              {permissionTypes.map((type) => (
                <td key={type}>
                  <input
                    type="checkbox"
                    checked={permissions[module]?.[type] || false}
                    onChange={() => handleCheckboxChange(module, type)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="BottomButtons">
        <button className="save" onClick={handleSubmit}>
          <span>{t("permissions.save")}</span>
        </button>
        <button  className="cancel">
          <Link to="/Permissions">{t("permissions.cancel")}</Link>
        </button>
      </div>
    </div>
  );
};

export default AddPermissions;
