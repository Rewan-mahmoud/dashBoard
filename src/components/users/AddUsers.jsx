import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom"; // Use useLocation to get state
import { useAuth } from '../../AuthContext'; 

export default function AddUsers() {
  const { token } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to access state
  const userId = location.state ? location.state.userId : null; // Get userId from state if available

  const [formData, setFormData] = useState({
    nameArabic: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "", // Default role should be populated after fetching roles
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [roles, setRoles] = useState([]); 
  const [errorMessage, setErrorMessage] = useState(""); 

  // Fetch user data if updating
  useEffect(() => {
    if (userId) {
      setIsUpdating(true);
      fetch(`https://naql.nozzm.com/api/show_user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            setFormData({
              nameArabic: data.data.name || "",
              phone: data.data.phone || "",
              email: data.data.email || "",
              password: "", // Password is not included in response for security reasons
              passwordConfirmation: "",
              role: data.data.role || "",
            });
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userId, token]);

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("https://naql.nozzm.com/api/roles", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.status) {
          setRoles(result.data); 
        } else {
          console.error("Failed to fetch roles:", result.message);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, [token]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.nameArabic || formData.nameEnglish);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("password_confirmation", formData.passwordConfirmation);
    form.append("role", formData.role);
    form.append("phone", formData.phone);

    const url = isUpdating
      ? `https://naql.nozzm.com/api/update_users/${userId}`
      : `https://naql.nozzm.com/api/add_users`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const result = await response.json();
      if (result.status) {
        alert(isUpdating ? "User updated successfully!" : "User added successfully!");
        navigate("/Users");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container DoctorsProfile tables bg-white">
      <div className="tableTitle d-flex justify-content-between">
        <h3>{isUpdating ? "تحديث بيانات المستخدم" : "اضافة مستخدمين"}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="settingForm justify-content-around">
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="nameArabic">الاسم باللغة العربية:</label>
              <input
                type="text"
                className="form-control"
                name="nameArabic"
                value={formData.nameArabic}
                onChange={handleChange}
              />
            </div>
       
            <div className="col-md-4">
              <label htmlFor="phone">رقم الهاتف :</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="email">البريد الالكتروني :</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
         
            <div className="col-md-4">
              <label htmlFor="password">كلمة المرور :</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="passwordConfirmation">تأكيد كلمة المرور :</label>
              <input
                type="password"
                className="form-control"
                name="passwordConfirmation"
                value={formData.passwordConfirmation}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="role">الصلاحيات :</label>
              <div className="custom-select">
                <select
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleChange}
                >
                     <option value="">الصلاحيات</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                     
                      {role.name}
                    </option>
                  ))}
                </select>
                <div className="arrow-icon">
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>
            </div>
          </div>

          <div className="BottomButtons">
            <button type="submit" className="save">
              <span> {isUpdating ? "تحديث" : "حفظ"} </span>
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => navigate("/Users")}
            >
              <span> الغاء </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
