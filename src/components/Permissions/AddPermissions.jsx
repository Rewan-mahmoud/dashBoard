import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import "./permission.css";

const AddPermissions = () => {
  const { t } = useTranslation();
  const { id } = useParams(); // Get ID from URL (for edit mode)
  const navigate = useNavigate(); // For navigation after saving
  const { token } = useAuth();
  const [permissions, setPermissions] = useState({});
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
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
  const permissionTypes = ["Create", "Edit", "Delete"];
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://naql.nozzm.com/api/show_roles/${id}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();

            // Set Arabic and English names
            setNameAr(data.data.name);
            setNameEn(data.data.name_en);

            // Parse permissions into a usable format
            const parsedPermissions = data.data.permissions.reduce(
              (acc, perm) => {
                const type = perm.name.split(" ")[0]; // Extract permission type
                const module = perm.name.split(" ").slice(1).join(" "); // Extract module name
                acc[module] = acc[module] || {};
                acc[module][type] = true; // Set true for this permission type
                return acc;
              },
              {}
            );

            setPermissions(parsedPermissions);
          } else {
            console.error("Failed to fetch role data");
          }
        } catch (error) {
          console.error("Error fetching role data:", error);
        }
      };

      fetchData();
    }
  }, [id, token]);

  console.log("name", nameAr);
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
    // Validation for name inputs
    if (!nameAr || !nameEn) {
      alert("Please fill in both the Arabic and English names.");
      return;
    }

    // Format permissions into the required API payload structure
    const formattedPermissions = Object.keys(permissions).flatMap((module) =>
      Object.keys(permissions[module] || {})
        .filter((type) => permissions[module][type])
        .map((type) => `${type} ${module}`)
    );

    if (formattedPermissions.length === 0) {
      alert("Please select at least one permission.");
      return;
    }

    const payload = {
      name: nameAr,
      name_en: nameEn,
      permissions: formattedPermissions,
    };

    try {

      const url = id
        ? `https://naql.nozzm.com/api/update_roles/${id}` 
        : "https://naql.nozzm.com/api/add_roles"; // Use add endpoint for creating new roles

      // Send the API request
      const response = await fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(id ? "Role successfully updated!" : "Role successfully added!");
        navigate("/Permissions"); // Redirect back to the Permissions list
      } else {
        const errorData = await response.json();
        alert(
          `Error: ${errorData.message || "Operation failed. Please try again."}`
        );
      }
    } catch (error) {
      console.error("Error saving role:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between">
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

        <button className="cancel" onClick={() => navigate("/Permissions")}>
          {t("permissions.cancel")}
        </button>
      </div>
    </div>
  );
};

export default AddPermissions;
